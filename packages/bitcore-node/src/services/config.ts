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
import config from '../config';
import { ChainNetwork } from '../types/ChainNetwork';
import { ConfigType } from '../types/Config';
import { valueOrDefault } from '../utils/check';

type ServiceName = keyof ConfigType['services'];

export class ConfigService {
  _config: ConfigType;

  constructor({ _config = config } = {}) {
    this._config = _config;
  }

  public get() {
    return this._config;
  }

  public updateConfig(partialConfig: Partial<ConfigType>) {
    const newConfig = Object.assign({}, this.get(), partialConfig);
    this._config = newConfig;
  }

  public chains() {
    return Object.keys(this.get().chains);
  }

  public networksFor(chain: keyof ConfigType['chains']) {
    return Object.keys(this.get().chains[chain]);
  }

  public chainNetworks(): Array<ChainNetwork> {
    const chainNetworks = new Array<ChainNetwork>();
    for (let chain of this.chains()) {
      for (let network of this.networksFor(chain)) {
        chainNetworks.push({ chain, network });
      }
    }
    return chainNetworks;
  }

  public chainConfig({ chain, network }: ChainNetwork) {
    return this.get().chains[chain][network];
  }

  public for<T extends keyof ConfigType['services']>(service: T): ConfigType['services'][T] {
    return this.get().services[service] || {};
  }

  public isDisabled(service: ServiceName) {
    const serviceConfig = this.for(service);
    const isDefined = x => x !== undefined;
    const disabled = isDefined(serviceConfig) ? valueOrDefault(serviceConfig.disabled, false) : false;
    return disabled;
  }
}

export const Config = new ConfigService();
