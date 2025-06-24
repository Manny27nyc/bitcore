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
import { BaseP2PWorker } from './p2p';

export interface ErrorType {
  model: string;
  err: boolean;
  type: string;
  payload: any;
}

export interface IVerificationPeer extends BaseP2PWorker<any> {
  connect(): Promise<void>;
  resync(from: number, to: number): Promise<void>;
  getBlockForNumber(blockNum: number): Promise<any>;
  enableDeepScan();
  disableDeepScan();
  validateDataForBlock(
    blockNum: number,
    tipHeight: number,
    log?: boolean
  ): Promise<{ success: boolean; errors: Array<ErrorType> }>;
}

export class VerificationManager {
  workerClasses: { [chain: string]: Class<IVerificationPeer> } = {};

  constructor() {}

  register(chain: string, worker: Class<IVerificationPeer>) {
    this.workerClasses[chain] = worker;
  }

  get(chain: string) {
    return this.workerClasses[chain];
  }
}

export const Verification = new VerificationManager();
