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
import { EventEmitter } from 'events';
import 'source-map-support/register';
import logger from './logger';

export class MessageBroker extends EventEmitter {
  remote: boolean;
  mq: SocketIO.Socket;
  constructor(opts) {
    super();

    opts = opts || {};
    if (opts.messageBrokerServer) {
      const url = opts.messageBrokerServer.url;

      this.remote = true;
      this.mq = require('socket.io-client').connect(url);
      this.mq.on('connect', () => {});
      this.mq.on('connect_error', () => {
        logger.warn('Error connecting to message broker server @ ' + url);
      });

      this.mq.on('msg', data => {
        this.emit('msg', data);
      });

      logger.info('Using message broker server at ' + url);
    }
  }

  send(data) {
    if (this.remote) {
      this.mq.emit('msg', data);
    } else {
      this.emit('msg', data);
    }
  }

  onMessage(handler) {
    this.on('msg', handler);
  }
}
