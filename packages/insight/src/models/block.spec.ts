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
import { Block, InsightBlockObject } from './block';

describe('Block', () => {
  it('initializes', () => {
    const obj: InsightBlockObject = {
      height: 474504,
      size: 998221,
      hash: '000000000000000001763ebcea127d82b5c49b620960e2d881c4ace719d5fe46',
      time: 1499346191,
      txlength: 1904,
      poolInfo: {
        poolName: 'AntMiner',
        url: 'https://bitmaintech.com/'
      }
    };

    const block: Block = new Block(obj);

    expect(block.height).toEqual(obj.height);
    expect(block.size).toEqual(obj.size);
    expect(block.hash).toEqual(obj.hash);
    expect(block.timestamp).toEqual(obj.time);
    expect(block.transactionCount).toEqual(obj.txlength);
    expect(block.poolName).toEqual(obj.poolInfo.poolName);
  });

  it('can handle empty poolInfo', () => {
    const obj: InsightBlockObject = {
      height: 474504,
      size: 998221,
      hash: '000000000000000001763ebcea127d82b5c49b620960e2d881c4ace719d5fe46',
      time: 1499346191,
      txlength: 1904,
      poolInfo: {}
    };

    const block: Block = new Block(obj);

    expect(block.height).toEqual(obj.height);
    expect(block.size).toEqual(obj.size);
    expect(block.hash).toEqual(obj.hash);
    expect(block.timestamp).toEqual(obj.time);
    expect(block.transactionCount).toEqual(obj.txlength);
    expect(block.poolName).toEqual(obj.poolInfo.poolName);
  });
});
