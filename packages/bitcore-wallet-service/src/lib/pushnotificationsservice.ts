/*
 * Copyright (c) 2008–2025 Manuel J. Nieves (a.k.a. Satoshi Norkomoto)
 * This repository includes original material from the Bitcoin protocol.
 *
 * Redistribution requires this notice remain intact.
 * Derivative works must state derivative status.
 * Commercial use requires licensing.
 *
 * GPG Signed: B4EC 7343 AB0D BF24
 * Contact: Fordamboy1@gmail.com
 */
/*
 * Copyright (c) 2008–2025 Manuel J. Nieves (a.k.a. Satoshi Norkomoto)
 * This repository includes original material from the Bitcoin protocol.
 *
 * Redistribution requires this notice remain intact.
 * Derivative works must state derivative status.
 * Commercial use requires licensing.
 *
 * GPG Signed: B4EC 7343 AB0D BF24
 * Contact: Fordamboy1@gmail.com
 */
import * as async from 'async';
import * as fs from 'fs';
import _ from 'lodash';
import 'source-map-support/register';

import request from 'request';
import logger from './logger';
import { MessageBroker } from './messagebroker';
import { INotification, IPreferences } from './model';
import { Storage } from './storage';

const Mustache = require('mustache');
const defaultRequest = require('request');
const path = require('path');
const Utils = require('./common/utils');
const Defaults = require('./common/defaults');
const Constants = require('./common/constants');
const sjcl = require('sjcl');

const PUSHNOTIFICATIONS_TYPES = {
  NewCopayer: {
    filename: 'new_copayer'
  },
  WalletComplete: {
    filename: 'wallet_complete'
  },
  NewTxProposal: {
    filename: 'new_tx_proposal'
  },
  NewOutgoingTx: {
    filename: ['new_outgoing_tx', 'new_zero_outgoing_tx']
  },
  NewIncomingTx: {
    filename: ['new_incoming_tx_testnet', 'new_incoming_tx']
  },
  TxProposalFinallyRejected: {
    filename: 'txp_finally_rejected'
  },
  TxConfirmation: {
    filename: ['tx_confirmation_sender', 'tx_confirmation_receiver']
  },
  NewAddress: {
    dataOnly: true
  },
  NewBlock: {
    dataOnly: true,
    broadcastToActiveUsers: true
  },
  TxProposalAcceptedBy: {
    dataOnly: true
  },
  TxProposalFinallyAccepted: {
    dataOnly: true
  },
  TxProposalRejectedBy: {
    dataOnly: true
  },
  TxProposalRemoved: {
    dataOnly: true
  }
};

export interface IPushNotificationService {
  templatePath: string;
  defaultLanguage: string;
  defaultUnit: string;
  subjectPrefix: string;
  pushServerUrl: string;
  availableLanguages: string;
  authorizationKey: string;
  messageBroker: any;
}

export class PushNotificationsService {
  request: request.RequestAPI<any, any, any>;
  templatePath: string;
  defaultLanguage: string;
  defaultUnit: string;
  subjectPrefix: string;
  pushServerUrl: string;
  availableLanguages: string;
  authorizationKey: string;
  storage: Storage;
  messageBroker: any;

  start(opts, cb) {
    opts = opts || {};
    this.request = opts.request || defaultRequest;

    const _readDirectories = (basePath, cb) => {
      fs.readdir(basePath, (err, files) => {
        if (err) return cb(err);
        async.filter(
          files,
          (file, next: (err: boolean) => void) => {
            fs.stat(path.join(basePath, file), (err, stats) => {
              return next(!err && stats.isDirectory());
            });
          },
          dirs => {
            return cb(null, dirs);
          }
        );
      });
    };

    this.templatePath = path.normalize(
      (opts.pushNotificationsOpts.templatePath || __dirname + '../../templates') + '/'
    );
    this.defaultLanguage = opts.pushNotificationsOpts.defaultLanguage || 'en';
    this.defaultUnit = opts.pushNotificationsOpts.defaultUnit || 'btc';
    this.subjectPrefix = opts.pushNotificationsOpts.subjectPrefix || '';
    this.pushServerUrl = opts.pushNotificationsOpts.pushServerUrl;
    this.authorizationKey = opts.pushNotificationsOpts.authorizationKey;

    if (!this.authorizationKey) return cb(new Error('Missing authorizationKey attribute in configuration.'));

    async.parallel(
      [
        done => {
          _readDirectories(this.templatePath, (err, res) => {
            this.availableLanguages = res;
            done(err);
          });
        },
        done => {
          if (opts.storage) {
            this.storage = opts.storage;
            done();
          } else {
            this.storage = new Storage();
            this.storage.connect(opts.storageOpts, done);
          }
        },
        done => {
          this.messageBroker = opts.messageBroker || new MessageBroker(opts.messageBrokerOpts);
          this.messageBroker.onMessage(_.bind(this._sendPushNotifications, this));
          done();
        }
      ],
      err => {
        if (err) {
          logger.error('ERROR:' + err);
        }
        return cb(err);
      }
    );
  }

  _sendPushNotifications(notification, cb) {
    cb = cb || function() {};

    const notifType = _.cloneDeep(PUSHNOTIFICATIONS_TYPES[notification.type]);
    if (!notifType) return cb();

    if (notification.type === 'NewIncomingTx') {
      notifType.filename = notification.data.network === 'testnet' ? notifType.filename[0] : notifType.filename[1];
    } else if (notification.type === 'NewOutgoingTx') {
      // Handle zero amount ETH transactions to contract addresses
      notifType.filename = notification.data.amount !== 0 ? notifType.filename[0] : notifType.filename[1];
    } else if (notification.type === 'TxConfirmation') {
      if (notification.data && !notification.data.amount) {
        // backward compatibility
        notifType.filename = 'tx_confirmation';
      } else {
        notifType.filename = notification.isCreator ? notifType.filename[0] : notifType.filename[1];
      }
    }

    logger.debug('Notification received: ' + notification.type);
    logger.debug(JSON.stringify(notification));

    this._checkShouldSendNotif(notification, (err, should) => {
      if (err) return cb(err);

      logger.debug('Should send notification: ' + should);
      if (!should) return cb();

      this._getRecipientsList(notification, notifType, (err, recipientsList) => {
        if (err) return cb(err);

        async.waterfall(
          [
            next => {
              this._readAndApplyTemplates(notification, notifType, recipientsList, next);
            },
            (contents, next) => {
              this._getSubscriptions(notification, notifType, recipientsList, contents, next);
            },
            (subs, next) => {
              const notifications = _.map(subs, sub => {
                if (notification.type === 'NewTxProposal' && sub.copayerId === notification.creatorId) return;

                const tokenAddress =
                  notification.data && notification.data.tokenAddress ? notification.data.tokenAddress : null;
                const multisigContractAddress =
                  notification.data && notification.data.multisigContractAddress
                    ? notification.data.multisigContractAddress
                    : null;

                const notificationData: any = {
                  to: sub.token,
                  priority: 'high',
                  restricted_package_name: sub.packageName,
                  data: {
                    walletId: sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(notification.walletId || sub.walletId)),
                    tokenAddress,
                    multisigContractAddress,
                    copayerId: sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(sub.copayerId)),
                    notification_type: notification.type,
                    // coin and network are needed for NewBlock notifications
                    coin: notification?.data?.coin,
                    network: notification?.data?.network
                  }
                };

                if (!notifType.dataOnly) {
                  notificationData.data.title = sub?.plain?.subject;
                  notificationData.data.body = sub?.plain?.body;
                  notificationData.notification = {
                    title: sub?.plain?.subject,
                    body: sub?.plain?.body,
                    sound: 'default',
                    click_action: 'FCM_PLUGIN_ACTIVITY',
                    icon: 'fcm_push_icon'
                  };
                }
                return notificationData;
              });

              if (
                notifications &&
                notifications[0] &&
                notifications[0].notification &&
                subs.length > Defaults.PUSH_NOTIFICATION_LIMIT
              ) {
                logger.warn(
                  `The recipient list for this push notification is greater than the established limit (${Defaults.PUSH_NOTIFICATION_LIMIT})`
                );
              }

              return next(err, notifications);
            },
            (notifications, next) => {
              async.each(
                notifications,
                (notification, next) => {
                  this._makeRequest(notification, (err, response) => {
                    if (err) logger.error('ERROR:' + err);
                    if (response) {
                      //                      logger.debug('Request status:  ' + response.statusCode);
                      //                      logger.debug('Request message: ' + response.statusMessage);
                      //                      logger.debug('Request body:  ' + response.request.body);
                    }
                    next();
                  });
                },
                err => {
                  return next(err);
                }
              );
            }
          ],
          err => {
            if (err) {
              logger.error('An error ocurred generating notification:' + err);
            }
            return cb(err);
          }
        );
      });
    });
  }

  _checkShouldSendNotif(notification, cb) {
    if (notification.type != 'NewTxProposal') return cb(null, true);
    this.storage.fetchWallet(notification.walletId, (err, wallet) => {
      return cb(err, wallet && wallet.m > 1);
    });
  }

  _getRecipientsList(notification, notificationType, cb) {
    if (notificationType.broadcastToActiveUsers) return cb(null, []);

    this.storage.fetchWallet(notification.walletId, (err, wallet) => {
      if (err) return cb(err);
      if (!wallet) return cb(null, []);

      let unit;
      if (wallet.coin != Defaults.COIN) {
        unit = wallet.coin;
      }

      this.storage.fetchPreferences(notification.walletId, null, (err, preferences) => {
        if (err) logger.error(err);
        if (_.isEmpty(preferences)) preferences = [];

        const recipientPreferences = _.compact(
          _.map(preferences, p => {
            if (!_.includes(this.availableLanguages, p.language)) {
              if (p.language) logger.warn('Language for notifications "' + p.language + '" not available.');
              p.language = this.defaultLanguage;
            }

            return {
              copayerId: p.copayerId,
              language: p.language || this.defaultLanguage,
              unit: unit || p.unit || this.defaultUnit
            };
          })
        );

        const copayers = _.keyBy(recipientPreferences, 'copayerId');

        const recipientsList = _.compact(
          _.map(wallet.copayers, copayer => {
            const p = copayers[copayer.id] || {
              language: this.defaultLanguage,
              unit: this.defaultUnit
            };
            return {
              walletId: notification.walletId,
              copayerId: copayer.id,
              language: p.language || this.defaultLanguage,
              unit: unit || p.unit || this.defaultUnit
            };
          })
        );
        return cb(null, recipientsList);
      });
    });
  }

  _readAndApplyTemplates(notification, notifType, recipientsList, cb) {
    if (!notifType.filename) return cb(null, []);

    async.map(
      recipientsList,
      (recipient: { language: string }, next) => {
        async.waterfall(
          [
            next => {
              this._getDataForTemplate(notification, recipient, next);
            },
            (data, next) => {
              async.map(
                ['plain', 'html'],
                (type, next) => {
                  this._loadTemplate(notifType, recipient, '.' + type, (err, template) => {
                    if (err && type == 'html') return next();
                    if (err) return next(err);

                    this._applyTemplate(template, data, (err, res) => {
                      return next(err, [type, res]);
                    });
                  });
                },
                (err, res) => {
                  return next(err, _.fromPairs(res.filter(Boolean) as any[]));
                }
              );
            },
            (result, next) => {
              next(null, result);
            }
          ],
          (err, res) => {
            next(err, [recipient.language, res]);
          }
        );
      },
      (err, res) => {
        return cb(err, _.fromPairs(res.filter(Boolean) as any[]));
      }
    );
  }

  _getDataForTemplate(notification: INotification, recipient, cb) {
    const UNIT_LABELS = {
      btc: 'BTC',
      bit: 'bits',
      bch: 'BCH',
      eth: 'ETH',
      xrp: 'XRP',
      doge: 'DOGE',
      ltc: 'LTC',
      usdc: 'USDC',
      pax: 'PAX',
      gusd: 'GUSD',
      busd: 'BUSD',
      wbtc: 'WBTC',
      dai: 'DAI'
    };
    const data = _.cloneDeep(notification.data);
    data.subjectPrefix = _.trim(this.subjectPrefix + ' ');
    if (data.amount) {
      try {
        let unit = recipient.unit.toLowerCase();
        let label = UNIT_LABELS[unit];
        if (data.tokenAddress) {
          const tokenAddress = data.tokenAddress.toLowerCase();
          if (Constants.TOKEN_OPTS[tokenAddress]) {
            unit = Constants.TOKEN_OPTS[tokenAddress].symbol.toLowerCase();
            label = UNIT_LABELS[unit];
          } else {
            label = 'tokens';
            throw new Error('Notifications for unsupported token are not allowed');
          }
        }
        data.amount = Utils.formatAmount(+data.amount, unit) + ' ' + label;
      } catch (ex) {
        return cb(new Error('Could not format amount' + ex));
      }
    }

    this.storage.fetchWallet(notification.walletId, (err, wallet) => {
      if (err || !wallet) return cb(err);

      data.walletId = wallet.id;
      data.walletName = wallet.name;
      data.walletM = wallet.m;
      data.walletN = wallet.n;

      const copayer = wallet.copayers.find(c => c.id === notification.creatorId);
      /*
       *var copayer = _.find(wallet.copayers, {
       *  id: notification.creatorId
       *});
       */

      if (copayer) {
        data.copayerId = copayer.id;
        data.copayerName = copayer.name;
      }

      if (notification.type == 'TxProposalFinallyRejected' && data.rejectedBy) {
        const rejectors = _.map(data.rejectedBy, copayerId => {
          return wallet.copayers.find(c => c.id === copayerId).name;
        });
        data.rejectorsNames = rejectors.join(', ');
      }

      return cb(null, data);
    });
  }

  _applyTemplate(template, data, cb) {
    if (!data) return cb(new Error('Could not apply template to empty data'));

    let error;
    const result = _.mapValues(template, t => {
      try {
        return Mustache.render(t, data);
      } catch (e) {
        logger.error('Could not apply data to template:' + e);
        error = e;
      }
    });

    if (error) return cb(error);
    return cb(null, result);
  }

  _loadTemplate(notifType, recipient, extension, cb) {
    this._readTemplateFile(recipient.language, notifType.filename + extension, (err, template) => {
      if (err) return cb(err);
      return cb(null, this._compileTemplate(template, extension));
    });
  }

  _readTemplateFile(language, filename, cb) {
    const fullFilename = path.join(this.templatePath, language, filename);
    fs.readFile(fullFilename, 'utf8', (err, template) => {
      if (err) {
        return cb(new Error('Could not read template file ' + fullFilename + err));
      }
      return cb(null, template);
    });
  }

  _compileTemplate(template, extension) {
    const lines = template.split('\n');
    if (extension == '.html') {
      lines.unshift('');
    }
    return {
      subject: lines[0],
      body: _.tail(lines).join('\n')
    };
  }

  _getSubscriptions(notification, notifType, recipientsList, contents, cb) {
    if (notifType.broadcastToActiveUsers) {
      this.storage.fetchLatestPushNotificationSubs((err, subs) => {
        if (err) return cb(err);

        const allSubs = _.uniqBy(
          _.reject(subs, sub => !sub.walletId),
          'token'
        );
        logger.info(
          `Sending ${notification.type} [${notification.data.coin}/${notification.data.network}] notifications to: ${allSubs.length} devices`
        );
        return cb(null, allSubs);
      });
    } else {
      async.map(
        recipientsList,
        (recipient: IPreferences, next) => {
          const content = contents ? contents[recipient.language] : null;

          this.storage.fetchPushNotificationSubs(recipient.copayerId, (err, subs) => {
            if (err) return next(err);

            const subscriptions = subs && subs.length ? subs.map(obj => ({ ...obj, plain: content?.plain })) : subs;
            return next(err, subscriptions);
          });
        },
        (err, allSubs) => {
          if (err) return cb(err);
          return cb(null, _.flatten(allSubs));
        }
      );
    }
  }

  _makeRequest(opts, cb) {
    this.request(
      {
        url: this.pushServerUrl + '/send',
        method: 'POST',
        json: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'key=' + this.authorizationKey
        },
        body: opts
      },
      cb
    );
  }
}
