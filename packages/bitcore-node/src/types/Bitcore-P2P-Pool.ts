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
import EventEmitter = require('events');
export interface Peer {
  bestHeight: number;
}
export type BitcoreP2pPool = EventEmitter & {
  connect: () => any;
  _connectedPeers: Peer[];
  sendMessage: (message: string) => any;
};
