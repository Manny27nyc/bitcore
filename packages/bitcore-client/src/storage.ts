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
import 'source-map-support/register';
import { PassThrough } from 'stream';
import { Encryption } from './encryption';
import { Level } from './storage/level';
import { Mongo } from './storage/mongo';
import { TextFile } from './storage/textFile';
import { KeyImport } from './wallet';

const bitcoreLib = require('crypto-wallet-core').BitcoreLib;

export class Storage {
  path: string;
  db: Array<Mongo | Level | TextFile>;
  collection: 'bitcoreWallets';
  url?: string;
  errorIfExists?: boolean;
  createIfMissing: boolean;
  storageType: any;
  constructor(params: { path?: string; createIfMissing: boolean; errorIfExists: boolean; storageType?: string }) {
    const { path, createIfMissing, errorIfExists } = params;
    let { storageType } = params;
    if (storageType && !['Mongo', 'Level', 'TextFile'].includes(storageType)) {
      throw new Error('Storage Type passed in must be Mongo, Level, or TextFile');
    }
    this.path = path;
    this.createIfMissing = createIfMissing;
    this.errorIfExists = errorIfExists;
    const dbMap = {
      Mongo,
      Level,
      TextFile
    };
    this.db = [];
    if (dbMap[storageType]) {
      this.db.push(new dbMap[storageType]({ createIfMissing, errorIfExists, path }));
      this.storageType = this.db[0];
    } else {
      for (let DbType of Object.values(dbMap)) {
        this.db.push(new DbType({ createIfMissing, errorIfExists, path }));
      }
    }
  }

  async loadWallet(params: { name: string }) {
    const { name } = params;
    let wallet;
    for (let db of this.db) {
      try {
        wallet = await db.loadWallet({ name });
        if (wallet) {
          this.storageType = wallet.storageType;
          this.storageType = db;
          break;
        }
      } catch (e) {}
    }
    if (!wallet) {
      return;
    }
    return JSON.parse(wallet);
  }

  async deleteWallet(params: { name: string }) {
    const { name } = params;
    for (let db of this.db) {
      try {
        await db.deleteWallet({ name });
      } catch (e) {
        console.log(e);
      }
    }
  }

  async listWallets() {
    let passThrough = new PassThrough();
    for (let db of this.db) {
      const listWalletStream = await db.listWallets();
      passThrough = listWalletStream.pipe(passThrough, { end: false });
      listWalletStream.once('end', () => this.db.length-- === 0 && passThrough.end());
    }
    return passThrough;
  }

  async listKeys() {
    let passThrough = new PassThrough();
    for (let db of this.db) {
      const listWalletStream = await db.listKeys();
      passThrough = listWalletStream.pipe(passThrough, { end: false });
      listWalletStream.once('end', () => --this.db.length === 0 && passThrough.end());
    }
    return passThrough;
  }

  async saveWallet(params) {
    const { wallet } = params;
    return this.storageType.saveWallet({ wallet });
  }

  async getKey(params: {
    address: string;
    name: string;
    encryptionKey: string;
    keepAlive: boolean;
    open: boolean;
  }): Promise<KeyImport> {
    const { address, name, encryptionKey, keepAlive, open } = params;
    const payload = await this.storageType.getKey({ name, address, keepAlive, open });
    const json = JSON.parse(payload) || payload;
    const { encKey, pubKey } = json;
    if (encryptionKey && pubKey) {
      const decrypted = Encryption.decryptPrivateKey(encKey, pubKey, encryptionKey);
      return JSON.parse(decrypted);
    } else {
      return json;
    }
  }

  async getKeys(params: { addresses: string[]; name: string; encryptionKey: string }): Promise<Array<KeyImport>> {
    const { addresses, name, encryptionKey } = params;
    const keys = new Array<KeyImport>();
    let keepAlive = true;
    let open = true;
    for (const address of addresses) {
      if (address === addresses[addresses.length - 1]) {
        keepAlive = false;
      }
      try {
        const key = await this.getKey({
          name,
          address,
          encryptionKey,
          keepAlive,
          open
        });
        keys.push(key);
      } catch (err) {
        console.error(err);
      }
      open = false;
    }
    return keys;
  }

  async addKeys(params: { name: string; keys: KeyImport[]; encryptionKey: string }) {
    const { name, keys, encryptionKey } = params;
    let open = true;
    for (const key of keys) {
      let { pubKey } = key;
      pubKey = pubKey || new bitcoreLib.PrivateKey(key.privKey).publicKey.toString();
      let payload = {};
      if (pubKey && key.privKey && encryptionKey) {
        const toEncrypt = JSON.stringify(key);
        const encKey = Encryption.encryptPrivateKey(toEncrypt, pubKey, encryptionKey);
        payload = { encKey, pubKey };
      }
      const toStore = JSON.stringify(payload);
      let keepAlive = true;
      if (key === keys[keys.length - 1]) {
        keepAlive = false;
      }
      await this.storageType.addKeys({ name, key, toStore, keepAlive, open });
      open = false;
    }
  }
}
