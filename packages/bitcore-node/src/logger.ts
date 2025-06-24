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
import * as winston from 'winston';
import parseArgv from './utils/parseArgv';
let args = parseArgv([], ['DEBUG']);
const logLevel = args.DEBUG ? 'debug' : 'info';
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: logLevel
    })
  ]
});

const timezone = new Date()
  .toLocaleString('en-US', { timeZoneName: 'short' })
  .split(' ')
  .pop();

export const formatTimestamp = (date: Date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
    .getDate()
    .toString()
    .padStart(2, '0')} ${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}:${date
    .getSeconds()
    .toString()
    .padStart(2, '0')}.${date
    .getMilliseconds()
    .toString()
    .padEnd(3, '0')} ${timezone}`;

export const timestamp = () => formatTimestamp(new Date());

export default logger;
