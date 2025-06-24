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
import { ObjectID } from 'mongodb';
import os from 'os';
import { StorageService } from '../services/storage';
import { BaseModel } from './base';

export interface IState {
  _id?: ObjectID;
  initialSyncComplete: any;
}

export class StateModel extends BaseModel<IState> {
  constructor(storage?: StorageService) {
    super('state', storage);
  }
  allowedPaging = [];

  onConnect() {}

  async getSingletonState() {
    return this.collection.findOneAndUpdate(
      {},
      { $setOnInsert: { created: new Date() } },
      { upsert: true, returnOriginal: false }
    );
  }

  async getSyncingNode(params: { chain: string; network: string }): Promise<string> {
    const { chain, network } = params;
    const state = await this.getSingletonState();
    return state.value![`syncingNode:${chain}:${network}`];
  }

  async selfNominateSyncingNode(params: { chain: string; network: string; lastHeartBeat: any }) {
    const { chain, network, lastHeartBeat } = params;
    const singleState = await this.getSingletonState();
    return this.collection.findOneAndUpdate(
      {
        _id: singleState.value!._id,
        $or: [
          { [`syncingNode:${chain}:${network}`]: { $exists: false } },
          { [`syncingNode:${chain}:${network}`]: lastHeartBeat }
        ]
      },
      { $set: { [`syncingNode:${chain}:${network}`]: `${os.hostname}:${process.pid}:${Date.now()}` } }
    );
  }

  async selfResignSyncingNode(params: { chain: string; network: string; lastHeartBeat: any }) {
    const { chain, network, lastHeartBeat } = params;
    const singleState = await this.getSingletonState();
    return this.collection.findOneAndUpdate(
      { _id: singleState.value!._id, [`syncingNode:${chain}:${network}`]: lastHeartBeat },
      { $unset: { [`syncingNode:${chain}:${network}`]: true } }
    );
  }
}

export let StateStorage = new StateModel();
