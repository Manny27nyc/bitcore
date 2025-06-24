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
const BitcoreLib = require('bitcore-lib');
import { IDeriver } from '..';
export abstract class AbstractBitcoreLibDeriver implements IDeriver {
  public abstract bitcoreLib;

  deriveAddress(network, pubKey, addressIndex, isChange) {
    const xpub = new this.bitcoreLib.HDPublicKey(pubKey, network);
    const changeNum = isChange ? 1 : 0;
    const path = `m/${changeNum}/${addressIndex}`;
    return this.bitcoreLib.Address(xpub.derive(path).publicKey, network).toString();
  }

  derivePrivateKey(network, xPriv, addressIndex, isChange) {
    const xpriv = new this.bitcoreLib.HDPrivateKey(xPriv, network);
    const changeNum = isChange ? 1 : 0;
    const path = `m/${changeNum}/${addressIndex}`;
    const privKey = xpriv.deriveChild(path).privateKey;
    const pubKey = privKey.publicKey;
    const address = this.bitcoreLib.Address(pubKey, network).toString();
    return { address, privKey: privKey.toString(), pubKey: pubKey.toString() };
  }
}
export class BtcDeriver extends AbstractBitcoreLibDeriver {
  bitcoreLib = BitcoreLib;
}
