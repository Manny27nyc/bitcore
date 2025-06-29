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
import { expect } from 'chai';
import { Transactions } from '../src';

describe('Transaction Creation', () => {
  it('should create a BTC tx', () => {
    const recipients = [{ address: 'mpNpzMoprLnSBu8CWDunNCYeJq3Mzdk59V', amount: 1e8 }];
    const change = 'msnAsQcCdtzDyiSWb4ZnNxFwUy3P9ogQvY';
    const utxos = [
      {
        mintTxid: '643ec66d6c4cad4cbdb8ed2166b8078975e0af9bb7ff7e30d394f43b0d9f18ab',
        mintIndex: 1,
        value: 0.02503422 * 1e8,
        script: '76a91457884dcfe2ab46d3354a42d97333c95e5b80cf0188ac',
        address: 'moVnNJpHHfssYJEnMTS5xXyGV8RhRQNRz5',
        sequenceNumber: 4294967294
      },
      {
        mintTxid: '643ec66d6c4cad4cbdb8ed2166b8078975e0af9bb7ff7e30d394f43b0d9f18ab',
        mintIndex: 0,
        value: 1e8,
        script: '76a9144e744a19a009a9dd43a23a7c12045c83e82ac9d288ac',
        address: 'mnfnJx2xWWptYmBzck3rdE851Dtu9GaZ3F',
        sequenceNumber: 4294967294
      }
    ];
    const fee = 7440;
    const tx = Transactions.create({ chain: 'BTC', recipients, change, utxos, fee, rbf: true });

    const keys = [
      {
        address: 'mnfnJx2xWWptYmBzck3rdE851Dtu9GaZ3F',
        privKey: 'cSFjiifSbZ2hU4jTFwE993LCe2rkZGULCTGWTDWXzHvuXRKxpnc1'
      },
      { address: 'moVnNJpHHfssYJEnMTS5xXyGV8RhRQNRz5', privKey: 'cUWVirwp5vh1D6WWbYci3tuGniyf28ERpgU4uL5VSiFDfvNEhJqy' }
    ];
    const signed = Transactions.sign({ chain: 'BTC', tx, keys, utxos });
    const expected =
      '0200000002ab189f0d3bf494d3307effb79bafe0758907b86621edb8bd4cad4c6c6dc63e64010000006a47304402202eeb967801c0aad4f8241d8f90e2a9e2236f95c189165ba6b2ba4dc6b17bacbe02201b5d4dc0c32f6aa134d93698f85bf4c098d15fcbaada0b6ca2b8076fd8aa2741012102c8f8fa438666cbd287e28fb384b99555e4acce610e8141e887c9c458bba5db5cffffffffab189f0d3bf494d3307effb79bafe0758907b86621edb8bd4cad4c6c6dc63e64000000006a473044022072bdde2c0b413fc42d15d93e768a26f818dc5b225b9359235c09fd0452d6121a022007c00afa396d60d5b7919f2ba31e638817561cab4e2afed7a86dd636ee293c1001210321f2f13aed42db7257b64f77d574071a6e81e460ab3693eefb7482c12d1ff697ffffffff0200e1f505000000001976a914612fb4d5e27a28f5c54018d8948ca3a650741c4188acee152600000000001976a91486823ef7c8e210184cc8675189d37c4c9d8e1e0288ac00000000';
    expect(signed).to.eq(expected);
  });

  it('should sign a BTC opreturn tx', () => {
    const tx =
      '0200000001ab189f0d3bf494d3307effb79bafe0758907b86621edb8bd4cad4c6c6dc63e640100000000ffffffff0200000000000000000b6a096a07696f6e3a61626340420f00000000001976a91457884dcfe2ab46d3354a42d97333c95e5b80cf0188ac00000000';
    const utxos = [
      {
        mintTxid: '643ec66d6c4cad4cbdb8ed2166b8078975e0af9bb7ff7e30d394f43b0d9f18ab',
        mintIndex: 1,
        value: 0.02503422 * 1e8,
        script: '76a91457884dcfe2ab46d3354a42d97333c95e5b80cf0188ac',
        address: 'moVnNJpHHfssYJEnMTS5xXyGV8RhRQNRz5',
        sequenceNumber: 4294967294
      }
    ];
    const keys = [
      {
        address: 'mnfnJx2xWWptYmBzck3rdE851Dtu9GaZ3F',
        privKey: 'cSFjiifSbZ2hU4jTFwE993LCe2rkZGULCTGWTDWXzHvuXRKxpnc1'
      },
      { address: 'moVnNJpHHfssYJEnMTS5xXyGV8RhRQNRz5', privKey: 'cUWVirwp5vh1D6WWbYci3tuGniyf28ERpgU4uL5VSiFDfvNEhJqy' }
    ];
    const signed = Transactions.sign({ chain: 'BTC', tx, keys, utxos });
    const expected =
      '0200000001ab189f0d3bf494d3307effb79bafe0758907b86621edb8bd4cad4c6c6dc63e64010000006b483045022100a3e6e04d311930ec19b11033e77d973ae37181ead6b2db582ec1c21028c469350220602faacf6f6753b271571452e4597205971ab1d790e60080d50c206c8c327f86012102c8f8fa438666cbd287e28fb384b99555e4acce610e8141e887c9c458bba5db5cffffffff0200000000000000000b6a096a07696f6e3a61626340420f00000000001976a91457884dcfe2ab46d3354a42d97333c95e5b80cf0188ac00000000';
    expect(signed).to.eq(expected);
  });

  it.skip('should fail to get signatures on a BTC txs', () => {
    // TODO !!
  });

  it('should be able to create a livenet ETH tx', () => {
    const rawEthTx = {
      network: 'livenet',
      value: 3896000000000000,
      to: '0x37d7B3bBD88EFdE6a93cF74D2F5b0385D3E3B08A',
      data:
        '0xb6b4af05000000000000000000000000000000000000000000000000000dd764300b800000000000000000000000000000000000000000000000000000000004a817c8000000000000000000000000000000000000000000000000000000016ada606a26050bb49a5a8228599e0dd48c1368abd36f4f14d2b74a015b2d168dbcab0773ce399393220df874bb22ca961f351e038acd2ba5cc8c764385c9f23707622cc435000000000000000000000000000000000000000000000000000000000000001c7e247d684a635813267b10a63f7f3ba88b28ca2790c909110b28236cf1b9bba03451e83d5834189f28d4c77802fc76b7c760a42bc8bebf8dd15e6ead146805630000000000000000000000000000000000000000000000000000000000000000',
      gasPrice: 20000000000
    };
    const { value, to } = rawEthTx;
    const recipients = [{ address: to, amount: value }];
    const cryptoTx = Transactions.create({
      ...rawEthTx,
      chain: 'ETH',
      recipients,
      nonce: 0
    });
    const expectedTx =
      '0xf9014f808504a817c800809437d7b3bbd88efde6a93cf74d2f5b0385d3e3b08a870dd764300b8000b90124b6b4af05000000000000000000000000000000000000000000000000000dd764300b800000000000000000000000000000000000000000000000000000000004a817c8000000000000000000000000000000000000000000000000000000016ada606a26050bb49a5a8228599e0dd48c1368abd36f4f14d2b74a015b2d168dbcab0773ce399393220df874bb22ca961f351e038acd2ba5cc8c764385c9f23707622cc435000000000000000000000000000000000000000000000000000000000000001c7e247d684a635813267b10a63f7f3ba88b28ca2790c909110b28236cf1b9bba03451e83d5834189f28d4c77802fc76b7c760a42bc8bebf8dd15e6ead146805630000000000000000000000000000000000000000000000000000000000000000018080';
    expect(cryptoTx).to.equal(expectedTx);
  });

  it('should be able to create a testnet ETH tx', () => {
    const rawEthTx = {
      network: 'testnet',
      value: 3896000000000000,
      to: '0x37d7B3bBD88EFdE6a93cF74D2F5b0385D3E3B08A',
      data:
        '0xb6b4af05000000000000000000000000000000000000000000000000000dd764300b800000000000000000000000000000000000000000000000000000000004a817c8000000000000000000000000000000000000000000000000000000016ada606a26050bb49a5a8228599e0dd48c1368abd36f4f14d2b74a015b2d168dbcab0773ce399393220df874bb22ca961f351e038acd2ba5cc8c764385c9f23707622cc435000000000000000000000000000000000000000000000000000000000000001c7e247d684a635813267b10a63f7f3ba88b28ca2790c909110b28236cf1b9bba03451e83d5834189f28d4c77802fc76b7c760a42bc8bebf8dd15e6ead146805630000000000000000000000000000000000000000000000000000000000000000',
      gasPrice: 20000000000
    };
    const { value, to } = rawEthTx;
    const recipients = [{ address: to, amount: value }];
    const cryptoTx = Transactions.create({
      ...rawEthTx,
      chain: 'ETH',
      recipients,
      nonce: 0
    });
    const expectedTx =
      '0xf9014f808504a817c800809437d7b3bbd88efde6a93cf74d2f5b0385d3e3b08a870dd764300b8000b90124b6b4af05000000000000000000000000000000000000000000000000000dd764300b800000000000000000000000000000000000000000000000000000000004a817c8000000000000000000000000000000000000000000000000000000016ada606a26050bb49a5a8228599e0dd48c1368abd36f4f14d2b74a015b2d168dbcab0773ce399393220df874bb22ca961f351e038acd2ba5cc8c764385c9f23707622cc435000000000000000000000000000000000000000000000000000000000000001c7e247d684a635813267b10a63f7f3ba88b28ca2790c909110b28236cf1b9bba03451e83d5834189f28d4c77802fc76b7c760a42bc8bebf8dd15e6ead1468056300000000000000000000000000000000000000000000000000000000000000002a8080';
    expect(cryptoTx).to.equal(expectedTx);
  });

  it('should be able to create a kovan ETH tx', () => {
    const rawEthTx = {
      network: 'kovan',
      value: 3896000000000000,
      to: '0x37d7B3bBD88EFdE6a93cF74D2F5b0385D3E3B08A',
      data:
        '0xb6b4af05000000000000000000000000000000000000000000000000000dd764300b800000000000000000000000000000000000000000000000000000000004a817c8000000000000000000000000000000000000000000000000000000016ada606a26050bb49a5a8228599e0dd48c1368abd36f4f14d2b74a015b2d168dbcab0773ce399393220df874bb22ca961f351e038acd2ba5cc8c764385c9f23707622cc435000000000000000000000000000000000000000000000000000000000000001c7e247d684a635813267b10a63f7f3ba88b28ca2790c909110b28236cf1b9bba03451e83d5834189f28d4c77802fc76b7c760a42bc8bebf8dd15e6ead146805630000000000000000000000000000000000000000000000000000000000000000',
      gasPrice: 20000000000
    };
    const { value, to } = rawEthTx;
    const recipients = [{ address: to, amount: value }];
    const cryptoTx = Transactions.create({
      ...rawEthTx,
      chain: 'ETH',
      recipients,
      nonce: 0
    });
    const expectedTx =
      '0xf9014f808504a817c800809437d7b3bbd88efde6a93cf74d2f5b0385d3e3b08a870dd764300b8000b90124b6b4af05000000000000000000000000000000000000000000000000000dd764300b800000000000000000000000000000000000000000000000000000000004a817c8000000000000000000000000000000000000000000000000000000016ada606a26050bb49a5a8228599e0dd48c1368abd36f4f14d2b74a015b2d168dbcab0773ce399393220df874bb22ca961f351e038acd2ba5cc8c764385c9f23707622cc435000000000000000000000000000000000000000000000000000000000000001c7e247d684a635813267b10a63f7f3ba88b28ca2790c909110b28236cf1b9bba03451e83d5834189f28d4c77802fc76b7c760a42bc8bebf8dd15e6ead1468056300000000000000000000000000000000000000000000000000000000000000002a8080';
    expect(cryptoTx).to.equal(expectedTx);
  });

  it('should be able to create a livenet ERC20 tx', () => {
    const rawEthTx = {
      network: 'livenet',
      value: 3896000000000000,
      to: '0x37d7B3bBD88EFdE6a93cF74D2F5b0385D3E3B08A',
      gasPrice: 20000000000,
      tokenAddress: '0x692a70d2e424a56d2c6c27aa97d1a86395877b3a'
    };
    const { value, to } = rawEthTx;
    const recipients = [{ address: to, amount: value }];
    const cryptoTx = Transactions.create({
      ...rawEthTx,
      chain: 'ERC20',
      recipients,
      nonce: 0
    });
    const expectedTx =
      '0xf867808504a817c8008094692a70d2e424a56d2c6c27aa97d1a86395877b3a80b844a9059cbb00000000000000000000000037d7b3bbd88efde6a93cf74d2f5b0385d3e3b08a000000000000000000000000000000000000000000000000000dd764300b8000018080';

    expect(cryptoTx).to.equal(expectedTx);
  });

  it('should be able to create a testnet ERC20 tx', () => {
    const rawEthTx = {
      network: 'testnet',
      value: 3896000000000000,
      to: '0x37d7B3bBD88EFdE6a93cF74D2F5b0385D3E3B08A',
      gasPrice: 20000000000,
      tokenAddress: '0x692a70d2e424a56d2c6c27aa97d1a86395877b3a'
    };
    const { value, to } = rawEthTx;
    const recipients = [{ address: to, amount: value }];
    const cryptoTx = Transactions.create({
      ...rawEthTx,
      chain: 'ERC20',
      recipients,
      nonce: 0
    });
    const expectedTx =
      '0xf867808504a817c8008094692a70d2e424a56d2c6c27aa97d1a86395877b3a80b844a9059cbb00000000000000000000000037d7b3bbd88efde6a93cf74d2f5b0385d3e3b08a000000000000000000000000000000000000000000000000000dd764300b80002a8080';

    expect(cryptoTx).to.equal(expectedTx);
  });

  it('should be able to create a kovan ERC20 tx', () => {
    const rawEthTx = {
      network: 'testnet',
      value: 3896000000000000,
      to: '0x37d7B3bBD88EFdE6a93cF74D2F5b0385D3E3B08A',
      gasPrice: 20000000000,
      tokenAddress: '0x692a70d2e424a56d2c6c27aa97d1a86395877b3a'
    };
    const { value, to } = rawEthTx;
    const recipients = [{ address: to, amount: value }];
    const cryptoTx = Transactions.create({
      ...rawEthTx,
      chain: 'ERC20',
      recipients,
      nonce: 0
    });
    const expectedTx =
      '0xf867808504a817c8008094692a70d2e424a56d2c6c27aa97d1a86395877b3a80b844a9059cbb00000000000000000000000037d7b3bbd88efde6a93cf74d2f5b0385d3e3b08a000000000000000000000000000000000000000000000000000dd764300b80002a8080';

    expect(cryptoTx).to.equal(expectedTx);
  });

  it('should be able to encode Data in ERC20 tx', () => {
    const recipients = [{ address: '0x37d7B3bBD88EFdE6a93cF74D2F5b0385D3E3B08A', amount: 3896000000000000 }];
    const tokenAddress = '0x692a70d2e424a56d2c6c27aa97d1a86395877b3a';
    const data = Transactions.get({ chain: 'ERC20' }).encodeData({ recipients, tokenAddress });
    const expectedData =
      '0xa9059cbb00000000000000000000000037d7b3bbd88efde6a93cf74d2f5b0385d3e3b08a000000000000000000000000000000000000000000000000000dd764300b8000';

    expect(data).to.equal(expectedData);
  });

  it('should be only create a mainnet ETH tx with one recipient', () => {
    const rawEthTx = {
      network: 'mainnet',
      value: 3896000000000000,
      to: '0x37d7B3bBD88EFdE6a93cF74D2F5b0385D3E3B08A',
      data:
        '0xb6b4af05000000000000000000000000000000000000000000000000000dd764300b800000000000000000000000000000000000000000000000000000000004a817c8000000000000000000000000000000000000000000000000000000016ada606a26050bb49a5a8228599e0dd48c1368abd36f4f14d2b74a015b2d168dbcab0773ce399393220df874bb22ca961f351e038acd2ba5cc8c764385c9f23707622cc435000000000000000000000000000000000000000000000000000000000000001c7e247d684a635813267b10a63f7f3ba88b28ca2790c909110b28236cf1b9bba03451e83d5834189f28d4c77802fc76b7c760a42bc8bebf8dd15e6ead146805630000000000000000000000000000000000000000000000000000000000000000',
      gasPrice: 20000000000
    };
    const { value, to } = rawEthTx;
    const recipients = [
      { address: to, amount: value },
      { address: to, amount: value }
    ];
    const cryptoTx = Transactions.create({
      ...rawEthTx,
      chain: 'ETH',
      recipients,
      nonce: 0
    });
    const expectedTx =
      '0xf9014f808504a817c800809437d7b3bbd88efde6a93cf74d2f5b0385d3e3b08a870dd764300b8000b90124b6b4af05000000000000000000000000000000000000000000000000000dd764300b800000000000000000000000000000000000000000000000000000000004a817c8000000000000000000000000000000000000000000000000000000016ada606a26050bb49a5a8228599e0dd48c1368abd36f4f14d2b74a015b2d168dbcab0773ce399393220df874bb22ca961f351e038acd2ba5cc8c764385c9f23707622cc435000000000000000000000000000000000000000000000000000000000000001c7e247d684a635813267b10a63f7f3ba88b28ca2790c909110b28236cf1b9bba03451e83d5834189f28d4c77802fc76b7c760a42bc8bebf8dd15e6ead146805630000000000000000000000000000000000000000000000000000000000000000018080';
    expect(cryptoTx).to.equal(expectedTx);
  });

  it('should be able to create a XRP tx', () => {
    const recipients = [{ address: 'rEqj9WKSH7wEkPvWf6b4gCi26Y3F7HbKUF', amount: '123456' }];
    const xrpParams = {
      chain: 'XRP',
      recipients,
      from: 'rEqj9WKSH7wEkPvWf6b4gCi26Y3F7HbKUF',
      tag: 123456,
      fee: 12,
      nonce: 1,
      invoiceID: '1012345678901234567890123456710123456789012345678901567890123456'
    };
    const cryptoTx = Transactions.create(xrpParams);
    const expectedTx =
      '120000228000000024000000012E0001E2405011101234567890123456789012345671012345678901234567890156789012345661400000000001E24068400000000000000C8114A2C8E8CD9A9133CAD90F2668159AAF572612A5028314A2C8E8CD9A9133CAD90F2668159AAF572612A502';
    expect(xrpParams.invoiceID.length).to.equal(64);
    expect(cryptoTx).to.equal(expectedTx);
  });

  it('should fail to create a XRP tx with invalid invoiceID', () => {
    try {
      const recipients = [{ address: 'rEqj9WKSH7wEkPvWf6b4gCi26Y3F7HbKUF', amount: '123456' }];
      const xrpParams = {
        chain: 'XRP',
        recipients,
        from: 'rEqj9WKSH7wEkPvWf6b4gCi26Y3F7HbKUF',
        tag: 123456,
        fee: 12,
        nonce: 1,
        invoiceID: '78901234567890123456710123456789012345678901567890123456'
      };
      Transactions.create(xrpParams);
    } catch (err) {
      expect(err).to.exist;
      expect(err.message).to.equal('instance.payment.invoiceID does not match pattern "^[A-F0-9]{64}$"');
    }
  });

  it('should fail to create a XRP tx with invalid address', () => {
    try {
      const recipients = [{ address: 'rEqj9WKSH7wEkPvWf6b4gCi26Y3F7HbKUF', amount: '123456' }];
      const xrpParams = {
        chain: 'XRP',
        recipients,
        from: 'rEqj9WKSH7wEkPvWf6b4gCF',
        tag: 123456,
        fee: 12,
        nonce: 1,
        invoiceID: '1012345678901234567890123456710123456789012345678901567890123456'
      };
      Transactions.create(xrpParams);
    } catch (err) {
      expect(err).to.exist;
      expect(err.message).to.equal(
        'instance.address is not exactly one from <xAddress>,<classicAddress>,instance.payment.source is not exactly one from <sourceExactAdjustment>,<maxAdjustment>'
      );
    }
  });

  it('should create a DOGE tx', () => {
    const recipients = [{ address: 'mpNpzMoprLnSBu8CWDunNCYeJq3Mzdk59V', amount: 1e8 }];
    const change = 'msnAsQcCdtzDyiSWb4ZnNxFwUy3P9ogQvY';
    const utxos = [
      {
        mintTxid: '643ec66d6c4cad4cbdb8ed2166b8078975e0af9bb7ff7e30d394f43b0d9f18ab',
        mintIndex: 1,
        value: 0.02503422 * 1e8,
        script: '76a91457884dcfe2ab46d3354a42d97333c95e5b80cf0188ac',
        address: 'moVnNJpHHfssYJEnMTS5xXyGV8RhRQNRz5',
        sequenceNumber: 4294967294
      },
      {
        mintTxid: '643ec66d6c4cad4cbdb8ed2166b8078975e0af9bb7ff7e30d394f43b0d9f18ab',
        mintIndex: 0,
        value: 1e8,
        script: '76a9144e744a19a009a9dd43a23a7c12045c83e82ac9d288ac',
        address: 'mnfnJx2xWWptYmBzck3rdE851Dtu9GaZ3F',
        sequenceNumber: 4294967294
      }
    ];
    const fee = 7440;
    const tx = Transactions.create({ chain: 'DOGE', recipients, change, utxos, fee, rbf: true });

    const keys = [
      {
        address: 'mnfnJx2xWWptYmBzck3rdE851Dtu9GaZ3F',
        privKey: 'cSFjiifSbZ2hU4jTFwE993LCe2rkZGULCTGWTDWXzHvuXRKxpnc1'
      },
      { address: 'moVnNJpHHfssYJEnMTS5xXyGV8RhRQNRz5', privKey: 'cUWVirwp5vh1D6WWbYci3tuGniyf28ERpgU4uL5VSiFDfvNEhJqy' }
    ];
    const signed = Transactions.sign({ chain: 'DOGE', tx, keys, utxos });
    const expected =
      '0100000002ab189f0d3bf494d3307effb79bafe0758907b86621edb8bd4cad4c6c6dc63e64010000006b483045022100b4fb37f92fb4ec7007166c415d59d888c9526b4550e3ed111e615cfe0e63ba9a022003381d0c43cf3e0762926f4fdff05a2d16fc0e62d59d79a9ca69646d1595b887012102c8f8fa438666cbd287e28fb384b99555e4acce610e8141e887c9c458bba5db5cffffffffab189f0d3bf494d3307effb79bafe0758907b86621edb8bd4cad4c6c6dc63e64000000006a47304402207b4a0deed6371e8ad46bcae7a9a098d99f2210d44600bab72bccba747ef7554c02207678fb99e91275c4fc7d5665371fb935cb789b4e0ad5a880780513368cca8b4b01210321f2f13aed42db7257b64f77d574071a6e81e460ab3693eefb7482c12d1ff697ffffffff0200e1f505000000001976a914612fb4d5e27a28f5c54018d8948ca3a650741c4188acee152600000000001976a91486823ef7c8e210184cc8675189d37c4c9d8e1e0288ac00000000';
    expect(signed).to.eq(expected);
  });

  it('should create a LTC tx', () => {
    const recipients = [{ address: 'mpNpzMoprLnSBu8CWDunNCYeJq3Mzdk59V', amount: 1e8 }];
    const change = 'msnAsQcCdtzDyiSWb4ZnNxFwUy3P9ogQvY';
    const utxos = [
      {
        mintTxid: '643ec66d6c4cad4cbdb8ed2166b8078975e0af9bb7ff7e30d394f43b0d9f18ab',
        mintIndex: 1,
        value: 0.02503422 * 1e8,
        script: '76a91457884dcfe2ab46d3354a42d97333c95e5b80cf0188ac',
        address: 'moVnNJpHHfssYJEnMTS5xXyGV8RhRQNRz5',
        sequenceNumber: 4294967294
      },
      {
        mintTxid: '643ec66d6c4cad4cbdb8ed2166b8078975e0af9bb7ff7e30d394f43b0d9f18ab',
        mintIndex: 0,
        value: 1e8,
        script: '76a9144e744a19a009a9dd43a23a7c12045c83e82ac9d288ac',
        address: 'mnfnJx2xWWptYmBzck3rdE851Dtu9GaZ3F',
        sequenceNumber: 4294967294
      }
    ];
    const fee = 7440;
    const tx = Transactions.create({ chain: 'LTC', recipients, change, utxos, fee, rbf: true });

    const keys = [
      {
        address: 'mnfnJx2xWWptYmBzck3rdE851Dtu9GaZ3F',
        privKey: 'cSFjiifSbZ2hU4jTFwE993LCe2rkZGULCTGWTDWXzHvuXRKxpnc1'
      },
      { address: 'moVnNJpHHfssYJEnMTS5xXyGV8RhRQNRz5', privKey: 'cUWVirwp5vh1D6WWbYci3tuGniyf28ERpgU4uL5VSiFDfvNEhJqy' }
    ];
    const signed = Transactions.sign({ chain: 'LTC', tx, keys, utxos });
    const expected =
      '0200000002ab189f0d3bf494d3307effb79bafe0758907b86621edb8bd4cad4c6c6dc63e64010000006a47304402202eeb967801c0aad4f8241d8f90e2a9e2236f95c189165ba6b2ba4dc6b17bacbe02201b5d4dc0c32f6aa134d93698f85bf4c098d15fcbaada0b6ca2b8076fd8aa2741012102c8f8fa438666cbd287e28fb384b99555e4acce610e8141e887c9c458bba5db5cffffffffab189f0d3bf494d3307effb79bafe0758907b86621edb8bd4cad4c6c6dc63e64000000006a473044022072bdde2c0b413fc42d15d93e768a26f818dc5b225b9359235c09fd0452d6121a022007c00afa396d60d5b7919f2ba31e638817561cab4e2afed7a86dd636ee293c1001210321f2f13aed42db7257b64f77d574071a6e81e460ab3693eefb7482c12d1ff697ffffffff0200e1f505000000001976a914612fb4d5e27a28f5c54018d8948ca3a650741c4188acee152600000000001976a91486823ef7c8e210184cc8675189d37c4c9d8e1e0288ac00000000';
    expect(signed).to.eq(expected);
  });
});

describe('Transaction Sign', () => {
  it('should be able to getSignature an ETH tx', () => {
    const signature = Transactions.getSignature({
      chain: 'ETH',
      tx:
        '0xf9014c808504a817c800809437d7b3bbd88efde6a93cf74d2f5b0385d3e3b08a870dd764300b8000b90124b6b4af05000000000000000000000000000000000000000000000000000dd764300b800000000000000000000000000000000000000000000000000000000004a817c8000000000000000000000000000000000000000000000000000000016ada606a26050bb49a5a8228599e0dd48c1368abd36f4f14d2b74a015b2d168dbcab0773ce399393220df874bb22ca961f351e038acd2ba5cc8c764385c9f23707622cc435000000000000000000000000000000000000000000000000000000000000001c7e247d684a635813267b10a63f7f3ba88b28ca2790c909110b28236cf1b9bba03451e83d5834189f28d4c77802fc76b7c760a42bc8bebf8dd15e6ead146805630000000000000000000000000000000000000000000000000000000000000000',
      key: {
        privKey: '0x29a1271a8214ccf499b99070115adc43539d4e086b5babab57c4c7a88f959cc2'
      }
    });
    const expectedSignature =
      '0xdb427c4dddcfc816581d657d9f30f8287bdebd9b9cbabc7a535fc67cde9f2b3d2eafc2d79ef47fe045c47f08af54736caf797c27f2e25266d6320243104834f71b';
    expect(signature).to.equal(expectedSignature);
  });

  it('should apply signatures to an ETH tx', () => {
    const signedTx = Transactions.applySignature({
      chain: 'ETH',
      tx:
        '0xf9014c808504a817c800809437d7b3bbd88efde6a93cf74d2f5b0385d3e3b08a870dd764300b8000b90124b6b4af05000000000000000000000000000000000000000000000000000dd764300b800000000000000000000000000000000000000000000000000000000004a817c8000000000000000000000000000000000000000000000000000000016ada606a26050bb49a5a8228599e0dd48c1368abd36f4f14d2b74a015b2d168dbcab0773ce399393220df874bb22ca961f351e038acd2ba5cc8c764385c9f23707622cc435000000000000000000000000000000000000000000000000000000000000001c7e247d684a635813267b10a63f7f3ba88b28ca2790c909110b28236cf1b9bba03451e83d5834189f28d4c77802fc76b7c760a42bc8bebf8dd15e6ead146805630000000000000000000000000000000000000000000000000000000000000000',
      signature:
        '0xdb427c4dddcfc816581d657d9f30f8287bdebd9b9cbabc7a535fc67cde9f2b3d2eafc2d79ef47fe045c47f08af54736caf797c27f2e25266d6320243104834f71b'
    });

    const expectedSignedTx =
      '0xf9018f808504a817c800809437d7b3bbd88efde6a93cf74d2f5b0385d3e3b08a870dd764300b8000b90124b6b4af05000000000000000000000000000000000000000000000000000dd764300b800000000000000000000000000000000000000000000000000000000004a817c8000000000000000000000000000000000000000000000000000000016ada606a26050bb49a5a8228599e0dd48c1368abd36f4f14d2b74a015b2d168dbcab0773ce399393220df874bb22ca961f351e038acd2ba5cc8c764385c9f23707622cc435000000000000000000000000000000000000000000000000000000000000001c7e247d684a635813267b10a63f7f3ba88b28ca2790c909110b28236cf1b9bba03451e83d5834189f28d4c77802fc76b7c760a42bc8bebf8dd15e6ead1468056300000000000000000000000000000000000000000000000000000000000000001ba0db427c4dddcfc816581d657d9f30f8287bdebd9b9cbabc7a535fc67cde9f2b3da02eafc2d79ef47fe045c47f08af54736caf797c27f2e25266d6320243104834f7';
    expect(signedTx).to.equal(expectedSignedTx);
  });

  it('should fail to apply signatures to an ETH tx if signature is invalid', () => {
    expect(() => {
      Transactions.applySignature({
        chain: 'ETH',
        tx:
          '0xf9014c808504a817c800809437d7b3bbd88efde6a93cf74d2f5b0385d3e3b08a870dd764300b8000b90124b6b4af05000000000000000000000000000000000000000000000000000dd764300b800000000000000000000000000000000000000000000000000000000004a817c8000000000000000000000000000000000000000000000000000000016ada606a26050bb49a5a8228599e0dd48c1368abd36f4f14d2b74a015b2d168dbcab0773ce399393220df874bb22ca961f351e038acd2ba5cc8c764385c9f23707622cc435000000000000000000000000000000000000000000000000000000000000001c7e247d684a635813267b10a63f7f3ba88b28ca2790c909110b28236cf1b9bba03451e83d5834189f28d4c77802fc76b7c760a42bc8bebf8dd15e6ead146805630000000000000000000000000000000000000000000000000000000000000000',
        signature: '0xdb'
      });
    }).to.throw('invalid signature');
  });

  it('should sign an ETH tx', () => {
    const signedTx = Transactions.sign({
      chain: 'ETH',
      tx:
        '0xf9014c808504a817c800809437d7b3bbd88efde6a93cf74d2f5b0385d3e3b08a870dd764300b8000b90124b6b4af05000000000000000000000000000000000000000000000000000dd764300b800000000000000000000000000000000000000000000000000000000004a817c8000000000000000000000000000000000000000000000000000000016ada606a26050bb49a5a8228599e0dd48c1368abd36f4f14d2b74a015b2d168dbcab0773ce399393220df874bb22ca961f351e038acd2ba5cc8c764385c9f23707622cc435000000000000000000000000000000000000000000000000000000000000001c7e247d684a635813267b10a63f7f3ba88b28ca2790c909110b28236cf1b9bba03451e83d5834189f28d4c77802fc76b7c760a42bc8bebf8dd15e6ead146805630000000000000000000000000000000000000000000000000000000000000000',
      key: {
        privKey: '0x29a1271a8214ccf499b99070115adc43539d4e086b5babab57c4c7a88f959cc2'
      }
    });
    const expectedSignedTx =
      '0xf9018f808504a817c800809437d7b3bbd88efde6a93cf74d2f5b0385d3e3b08a870dd764300b8000b90124b6b4af05000000000000000000000000000000000000000000000000000dd764300b800000000000000000000000000000000000000000000000000000000004a817c8000000000000000000000000000000000000000000000000000000016ada606a26050bb49a5a8228599e0dd48c1368abd36f4f14d2b74a015b2d168dbcab0773ce399393220df874bb22ca961f351e038acd2ba5cc8c764385c9f23707622cc435000000000000000000000000000000000000000000000000000000000000001c7e247d684a635813267b10a63f7f3ba88b28ca2790c909110b28236cf1b9bba03451e83d5834189f28d4c77802fc76b7c760a42bc8bebf8dd15e6ead1468056300000000000000000000000000000000000000000000000000000000000000001ba0db427c4dddcfc816581d657d9f30f8287bdebd9b9cbabc7a535fc67cde9f2b3da02eafc2d79ef47fe045c47f08af54736caf797c27f2e25266d6320243104834f7';
    expect(signedTx).to.equal(expectedSignedTx);
  });

  it('should sign a XRP tx', () => {
    const signedTx = Transactions.sign({
      chain: 'XRP',
      tx:
        '120000228000000024000000012E0001E2405011101234567890123456789012345671012345678901234567890156789012345661400000000001E24068400000000000000C8114A2C8E8CD9A9133CAD90F2668159AAF572612A5028314A2C8E8CD9A9133CAD90F2668159AAF572612A502',
      key: {
        privKey: 'D02C6801D8F328FF2EAD51D01F9580AF36C8D74E2BD463963AC4ADBE51AE5F2C',
        pubKey: '03DBEEC5E9E76DA09C5B502A67136BC2D73423E8902A7C35A8CBC0C5A6AC0469E8'
      }
    });
    const expectedSignedTx =
      '120000228000000024000000012E0001E2405011101234567890123456789012345671012345678901234567890156789012345661400000000001E24068400000000000000C732103DBEEC5E9E76DA09C5B502A67136BC2D73423E8902A7C35A8CBC0C5A6AC0469E874473045022100D5C19360E77D691A11CA693F6E8D8472DA6749D16A06E072ED1110EB3FD9E2C80220169F95E55943C3575CEAA46413FE660E4F8F2E7158FAC235DC3CB9C9F26918098114A2C8E8CD9A9133CAD90F2668159AAF572612A5028314A2C8E8CD9A9133CAD90F2668159AAF572612A502';
    expect(signedTx).to.equal(expectedSignedTx);
  });

  it('should get ETH tx hash', () => {
    // from https://ethereum.stackexchange.com/questions/31285/how-to-get-raw-ethereum-transaction-hash
    const hash = Transactions.getHash({
      chain: 'ETH',
      tx:
        '0xf86c258502540be40083035b609482e041e84074fc5f5947d4d27e3c44f824b7a1a187b1a2bc2ec500008078a04a7db627266fa9a4116e3f6b33f5d245db40983234eb356261f36808909d2848a0166fa098a2ce3bda87af6000ed0083e3bf7cc31c6686b670bd85cbc6da2d6e85'
    });
    const expectedHash = '0x58e5a0fc7fbc849eddc100d44e86276168a8c7baaa5604e44ba6f5eb8ba1b7eb';
    expect(hash).to.equal(expectedHash);
  });

  it('should get XRP signed tx hash', () => {
    const hash = Transactions.getHash({
      chain: 'XRP',
      tx:
        '120000228000000024000000012E0001E2405011101234567890123456789012345671012345678901234567890156789012345661400000000001E24068400000000000000C732103DBEEC5E9E76DA09C5B502A67136BC2D73423E8902A7C35A8CBC0C5A6AC0469E874473045022100D5C19360E77D691A11CA693F6E8D8472DA6749D16A06E072ED1110EB3FD9E2C80220169F95E55943C3575CEAA46413FE660E4F8F2E7158FAC235DC3CB9C9F26918098114A2C8E8CD9A9133CAD90F2668159AAF572612A5028314A2C8E8CD9A9133CAD90F2668159AAF572612A502'
    });
    const expectedHash = '61EA6DF3BD1E435283BA0B06311C7BA683A32A80E465196D9F16A23A439EF6F4';
    expect(hash.length).to.equal(64);
    expect(hash).to.equal(expectedHash);
  });

  it('should get XRP testnet signed tx hash', () => {
    const hash = Transactions.getHash({
      chain: 'XRP',
      network: 'testnet',
      tx:
        '120000228000000024000000012E0001E2405011101234567890123456789012345671012345678901234567890156789012345661400000000001E24068400000000000000C732103DBEEC5E9E76DA09C5B502A67136BC2D73423E8902A7C35A8CBC0C5A6AC0469E874473045022100D5C19360E77D691A11CA693F6E8D8472DA6749D16A06E072ED1110EB3FD9E2C80220169F95E55943C3575CEAA46413FE660E4F8F2E7158FAC235DC3CB9C9F26918098114A2C8E8CD9A9133CAD90F2668159AAF572612A5028314A2C8E8CD9A9133CAD90F2668159AAF572612A502'
    });
    const expectedHash = 'E3DA85BC1EEE51F7A6CF93AE170CC17A9FB8751EEB3EE37C938C9E5AD261E55E';
    expect(hash.length).to.equal(64);
    expect(hash).to.equal(expectedHash);
  });

  it('should get XRP livenet signed tx hash', () => {
    const hash = Transactions.getHash({
      chain: 'XRP',
      network: 'livenet',
      tx:
        '120000228000000024000000012E0001E2405011101234567890123456789012345671012345678901234567890156789012345661400000000001E24068400000000000000C732103DBEEC5E9E76DA09C5B502A67136BC2D73423E8902A7C35A8CBC0C5A6AC0469E874473045022100D5C19360E77D691A11CA693F6E8D8472DA6749D16A06E072ED1110EB3FD9E2C80220169F95E55943C3575CEAA46413FE660E4F8F2E7158FAC235DC3CB9C9F26918098114A2C8E8CD9A9133CAD90F2668159AAF572612A5028314A2C8E8CD9A9133CAD90F2668159AAF572612A502'
    });
    const expectedHash = '61EA6DF3BD1E435283BA0B06311C7BA683A32A80E465196D9F16A23A439EF6F4';
    expect(hash.length).to.equal(64);
    expect(hash).to.equal(expectedHash);
  });

  it('should not fail to sign a XRP tx with lowercase key', () => {
    const signedTx = Transactions.sign({
      chain: 'XRP',
      tx:
        '120000228000000024000000012E0001E2405011101234567890123456789012345671012345678901234567890156789012345661400000000001E24068400000000000000C8114A2C8E8CD9A9133CAD90F2668159AAF572612A5028314A2C8E8CD9A9133CAD90F2668159AAF572612A502',
      key: {
        privKey: 'd02c6801d8f328ff2ead51d01f9580af36c8d74e2bd463963ac4adbe51ae5f2c',
        pubKey: '03dbeec5e9e76da09c5b502a67136bc2d73423e8902a7c35a8cbc0c5a6ac0469e8'
      }
    });
    const expectedSignedTx =
      '120000228000000024000000012E0001E2405011101234567890123456789012345671012345678901234567890156789012345661400000000001E24068400000000000000C732103DBEEC5E9E76DA09C5B502A67136BC2D73423E8902A7C35A8CBC0C5A6AC0469E874473045022100D5C19360E77D691A11CA693F6E8D8472DA6749D16A06E072ED1110EB3FD9E2C80220169F95E55943C3575CEAA46413FE660E4F8F2E7158FAC235DC3CB9C9F26918098114A2C8E8CD9A9133CAD90F2668159AAF572612A5028314A2C8E8CD9A9133CAD90F2668159AAF572612A502';
    expect(signedTx).to.equal(expectedSignedTx);
  });

  it('should be throw using wrong privKey to sign an ETH tx', () => {
    let error;
    try {
      Transactions.sign({
        chain: 'ETH',
        tx:
          '0xf9014c808504a817c800809437d7b3bbd88efde6a93cf74d2f5b0385d3e3b08a870dd764300b8000b90124b6b4af05000000000000000000000000000000000000000000000000000dd764300b800000000000000000000000000000000000000000000000000000000004a817c8000000000000000000000000000000000000000000000000000000016ada606a26050bb49a5a8228599e0dd48c1368abd36f4f14d2b74a015b2d168dbcab0773ce399393220df874bb22ca961f351e038acd2ba5cc8c764385c9f23707622cc435000000000000000000000000000000000000000000000000000000000000001c7e247d684a635813267b10a63f7f3ba88b28ca2790c909110b28236cf1b9bba03451e83d5834189f28d4c77802fc76b7c760a42bc8bebf8dd15e6ead146805630000000000000000000000000000000000000000000000000000000000000000',
        key: {
          privKey: 'wrongPrivateKey'
        }
      });
    } catch (err) {
      error = err;
    }
    expect(error.message).to.include('invalid hexlify value');
    expect(error).to.not.equal(undefined);
  });
});

describe('ETH Transaction getChainId', () => {
  it('should get the correct chainId per network', () => {
    const mainnetId = Transactions.get({ chain: 'ETH' }).getChainId('mainnet');
    expect(mainnetId).to.equal(1);

    const livenetId = Transactions.get({ chain: 'ETH' }).getChainId('livenet');
    expect(livenetId).to.equal(1);

    const testId = Transactions.get({ chain: 'ETH' }).getChainId('testnet');
    expect(testId).to.equal(42);

    const kovanId = Transactions.get({ chain: 'ETH' }).getChainId('kovan');
    expect(kovanId).to.equal(42);

    const rinkebyId = Transactions.get({ chain: 'ETH' }).getChainId('rinkeby');
    expect(rinkebyId).to.equal(4);

    const ropstenId = Transactions.get({ chain: 'ETH' }).getChainId('ropsten');
    expect(ropstenId).to.equal(3);

    const regtestId = Transactions.get({ chain: 'ETH' }).getChainId('regtest');
    expect(regtestId).to.equal(17);
  });
});
