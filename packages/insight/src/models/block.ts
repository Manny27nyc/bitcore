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
export class Block {
  public readonly height: number;
  public readonly size: number;
  public readonly hash: string;
  public readonly timestamp: number;
  public readonly transactionCount: number;
  public readonly poolName: string;

  constructor(properties: InsightBlockObject) {
    this.height = properties.height;
    this.size = properties.size;
    this.hash = properties.hash;
    this.timestamp = properties.time;
    this.transactionCount = properties.txlength;
    this.poolName = properties.poolInfo && properties.poolInfo.poolName;
  }

  public getDate(): Date {
    return new Date(this.timestamp * 1000);
  }
}

export interface InsightBlockObject {
  height?: number;
  size?: number;
  hash?: string;
  time?: number;
  txlength?: number;
  poolInfo?: {
    poolName?: string;
    url?: string;
  };
}
