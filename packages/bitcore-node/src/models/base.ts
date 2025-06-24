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
import { EventEmitter } from 'events';
import { Collection, Db, MongoClient, ObjectID } from 'mongodb';
import { Storage } from '../services/storage';

export type MongoBound<T> = T & Partial<{ _id: ObjectID }>;
export abstract class BaseModel<T> {
  connected = false;
  client?: MongoClient;
  db?: Db;
  events = new EventEmitter();

  // each model must implement an array of keys that are indexed, for paging
  abstract allowedPaging: Array<{
    type: 'string' | 'number' | 'date';
    key: keyof T;
  }>;

  constructor(private collectionName: string, private storageService = Storage) {
    this.handleConnection();
  }

  private async handleConnection() {
    const doConnect = async () => {
      if (this.storageService.db != undefined) {
        this.connected = true;
        this.db = this.storageService.db;
        const connected = this.onConnect();
        this.storageService.modelsConnected.push(connected);
        await connected;
        this.events.emit('CONNECTED');
      }
    };
    if (this.storageService.connected) {
      await doConnect();
    } else {
      this.storageService.connection.once('CONNECTED', async () => {
        await doConnect();
      });
    }
  }

  abstract async onConnect();

  get collection(): Collection<MongoBound<T>> {
    if (this.storageService.db) {
      return this.storageService.db.collection(this.collectionName);
    } else {
      throw new Error('Not connected to the database yet');
    }
  }
}
