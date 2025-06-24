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
module.exports = (wallet, appName, appVersion) => {
  if (!appVersion || !appName) return;

  const serverMessages = [];
  if (wallet.network == 'livenet' && appVersion.major == 5 && wallet.createdOn < 1443461026) {
    serverMessages.push({
      title: 'Test message',
      body: 'Only for bitpay, old wallets',
      link: 'http://bitpay.com',
      id: 'bitpay1',
      dismissible: true,
      category: 'critical',
      app: 'bitpay',
      priority: 2
    });
  }
  if (wallet.network == 'livenet') {
    serverMessages.push({
      title: 'Test message 2',
      body: 'Only for bitpay livenet wallets',
      link: 'http://bitpay.com',
      id: 'bitpay2',
      dismissible: true,
      category: 'critical',
      app: 'bitpay',
      priority: 1
    });
  }
  return serverMessages;
};
