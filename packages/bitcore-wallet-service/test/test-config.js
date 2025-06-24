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
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || '27017';
const dbname = 'bws_test';
var config = {
  mongoDb: {
    uri: `mongodb://${host}:${port}/${dbname}`,
    dbname,
  },
};

module.exports = config;
