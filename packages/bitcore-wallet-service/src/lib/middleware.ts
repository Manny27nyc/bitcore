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
import express from 'express';
import { formatTimestamp, logger } from './logger';

type TimedRequest = {
  startTime?: Date;
  walletId?: string;
  isSupportStaff?: boolean;
} & express.Request;

function LogObj(logOut: { [key: string]: string }) {
  logger.info(
    `${logOut.support}${logOut.time} | ${logOut.ip} | ${logOut.userAgent || 'na'}  |  ${logOut.walletId || '-'}  | ${
      logOut.phase
    } | ${logOut.took} | ${logOut.method} | ${logOut.status} | ${logOut.url} | ${logOut.openConnections} open`
  );
}

let openConnections = 0;

function LogPhase(req: TimedRequest, res: express.Response, phase: string) {
  const ip = req.header('CF-Connecting-IP') || req.socket.remoteAddress || req.hostname;
  const time = req.startTime ? req.startTime : new Date();
  const ua = req.headers['user-agent'] || '-';
  const ver = req.headers['x-client-version'] || '-';
  const support = req.isSupportStaff ? 'SUPPORT:' : '';
  const logOut = {
    support,
    time: formatTimestamp(time),
    walletId: req.walletId,
    userAgent: ua + ':' + ver,
    ip: ip.padStart(22, ' '),
    phase: phase.padStart(8, ' '),
    method: req.method.padStart(6, ' '),
    status: '...'.padStart(5, ' '),
    url: `${req.baseUrl}${req.url}`,
    took: '...'.padStart(10, ' '),
    openConnections: openConnections.toString().padStart(6, ' ')
  };
  if (req.startTime && ['END', 'CLOSED'].includes(phase)) {
    const endTime = new Date();
    const startTime = req.startTime ? req.startTime : endTime;
    const totalTime = endTime.getTime() - startTime.getTime();
    const totalTimeMsg = `${totalTime} ms`.padStart(10, ' ');
    logOut.took = totalTimeMsg.padStart(10, ' ');
    logOut.status = res.statusCode.toString().padStart(5, ' ');
  }
  LogObj(logOut);
}
export function LogMiddleware() {
  return (req: TimedRequest, res: express.Response, next: express.NextFunction) => {
    req.startTime = new Date();
    openConnections++;
    // LogPhase(req, res, 'START');
    res.on('finish', () => {
      openConnections--;
      LogPhase(req, res, 'END');
    });
    res.on('close', () => {
      openConnections--;
      LogPhase(req, res, 'CLOSED');
    });
    next();
  };
}
