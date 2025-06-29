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
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { ETHTxProvider } from '../eth';
import { ERC20Abi } from './abi';

export class ERC20TxProvider extends ETHTxProvider {
  getERC20Contract(tokenContractAddress: string) {
    const web3 = new Web3();
    const contract = new web3.eth.Contract(ERC20Abi as AbiItem[], tokenContractAddress);
    return contract;
  }

  create(params: {
    recipients: Array<{ address: string; amount: string }>;
    nonce: number;
    gasPrice: number;
    data: string;
    gasLimit: number;
    tokenAddress: string;
    network: string;
    chainId?: number;
  }) {
    const { tokenAddress } = params;
    const data = this.encodeData(params);
    const recipients = [{ address: tokenAddress, amount: '0' }];
    const newParams = { ...params, recipients, data };
    return super.create(newParams);
  }

  encodeData(params: { recipients: Array<{ address: string; amount: string }>; tokenAddress: string }) {
    const { tokenAddress } = params;
    const [{ address, amount }] = params.recipients;
    const amountStr = Number(amount).toLocaleString('en', { useGrouping: false });
    const data = this.getERC20Contract(tokenAddress)
      .methods.transfer(address, amountStr)
      .encodeABI();
    return data;
  }
}
