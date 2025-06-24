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
import * as http from 'http';
import config from '../config';
import { LoggifyClass } from '../decorators/Loggify';
import logger from '../logger';
import app from '../routes';
import { Config, ConfigService } from './config';
import { Socket, SocketService } from './socket';
import { Storage, StorageService } from './storage';

@LoggifyClass
export class ApiService {
  port: number;
  timeout: number;
  configService: ConfigService;
  storageService: StorageService;
  socketService: SocketService;
  httpServer: http.Server;
  app: typeof app;
  stopped = true;

  constructor({
    port = 3000,
    timeout = 600000,
    configService = Config,
    storageService = Storage,
    socketService = Socket
  } = {}) {
    this.port = Number(process.env.BITCORE_NODE_HTTP_PORT) || port;
    this.timeout = timeout;
    this.configService = configService;
    this.storageService = storageService;
    this.socketService = socketService;
    this.app = app;
    this.httpServer = new http.Server(app);
  }

  async start() {
    if (this.configService.isDisabled('api')) {
      logger.info('Disabled API Service');
      return;
    }
    if (!this.storageService.connected) {
      await this.storageService.start({});
    }
    if (this.stopped) {
      this.stopped = false;
      this.httpServer = new http.Server(app);
      this.httpServer.timeout = this.timeout;
      this.httpServer.listen(this.port, () => {
        logger.info(`Starting API Service on port ${this.port}`);
        this.socketService.start({ server: this.httpServer });
      });
    }
    return this.httpServer;
  }

  async stop() {
    this.stopped = true;
    await this.socketService.stop();
    return new Promise(resolve => {
      this.httpServer.close(() => {
        logger.info('Stopped API Service');
        resolve();
      });
      this.httpServer.emit('close');
    });
  }
}

// TOOO: choose a place in the config for the API timeout and include it here
export const Api = new ApiService({
  port: config.port
});
