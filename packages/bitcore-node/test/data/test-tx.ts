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
export const TEST_TX = {
  hash: '08e23107e8449f02568d37d37aa76e840e55bbb5f100ed8ad257af303db88c08',
  _hash: '08e23107e8449f02568d37d37aa76e840e55bbb5f100ed8ad257af303db88c08',
  isCoinbase: () => true,
  outputAmount: 0.09765625,
  inputs: [],
  outputs: [],
  nLockTime: 0,
  toBuffer: () => Buffer.from('')
};
export const TEST_TX_1 = {
  hash: 'b8abbdd4428b32cdf79a29728ea7a6d102444c880dca9be489c1ba346dcc5436',
  _hash: 'b8abbdd4428b32cdf79a29728ea7a6d102444c880dca9be489c1ba346dcc5436',
  isCoinbase: () => true,
  outputAmount: 0.0976,
  inputs: [],
  outputs: [],
  nLockTime: 0,
  toBuffer: () => Buffer.from('')
};
export const TEST_TX_2 = {
  hash: '1e28aa7b910f256dd49f020a668b69c427c2646bfc99b4f892deea71bb885062',
  _hash: '1e28aa7b910f256dd49f020a668b69c427c2646bfc99b4f892deea71bb885062',
  isCoinbase: () => true,
  outputAmount: 0.06763325,
  inputs: [],
  outputs: [],
  nLockTime: 0,
  toBuffer: () => Buffer.from('')
};
export const TEST_TX_3 = {
  hash: '947911ecc53cd8313220c94ba2211b90a4062a79ee8f830b100861c377f501ef',
  _hash: '947911ecc53cd8313220c94ba2211b90a4062a79ee8f830b100861c377f501ef',
  isCoinbase: () => true,
  outputAmount: 0.07865625,
  inputs: [],
  outputs: [],
  nLockTime: 0,
  toBuffer: () => Buffer.from('')
};
