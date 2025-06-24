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
import { Transform } from 'stream';

export class ParseApiStream extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _write(data, _encoding, cb) {
    const stringDatas = data.toString().split('\n');
    for (let stringData of stringDatas) {
      const normalized = stringData.endsWith(',') ? stringData.slice(0, stringData.length - 1) : stringData;
      if (normalized.includes('{') && normalized.includes('}')) {
        this.push(JSON.parse(normalized));
      }
    }
    cb();
  }
}

function signTxStream(wallet: any, keys: object, utxosPassedIn: object, passphrase: string) {
  return new Transform({
    objectMode: true,
    async transform(chunk, encoding, callback) {
      const rawTransaction = chunk.rawTransaction;
      const utxos = utxosPassedIn || chunk.utxos;
      const signedTx = await wallet.signTx({ tx: rawTransaction, utxos, keys, passphrase });
      chunk.signedRawTransaction = signedTx;
      return callback(null, chunk);
    }
  });
}

function objectModeToJsonlBuffer() {
  return new Transform({
    writableObjectMode: true,
    readableObjectMode: false,
    transform(chunk, encoding, callback) {
      if (typeof chunk !== 'object') {
        return callback(new Error(`invalid data not in form of object: ${chunk}`));
      }
      let jsonl;
      try {
        jsonl = JSON.stringify(chunk).concat('\n');
        callback(null, jsonl);
      } catch (e) {
        return callback(e);
      }
    }
  });
}

function jsonlBufferToObjectMode() {
  return new Transform({
    writableObjectMode: false,
    readableObjectMode: true,
    transform(chunk, encoding, callback) {
      let buffer = chunk;
      let lineArray = buffer.toString().split('\n');
      while (lineArray.length > 1) {
        try {
          const data = lineArray.shift();
          if (data === '') {
            continue;
          }
          const obj = JSON.parse(data);
          this.push(obj);
        } catch (e) {
          return callback(e);
        }
      }
      callback();
    }
  });
}

export const StreamUtil = {
  signTxStream,
  objectModeToJsonlBuffer,
  jsonlBufferToObjectMode
};
