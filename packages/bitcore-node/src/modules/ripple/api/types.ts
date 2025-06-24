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
export interface SubmitResponse {
  resultCode: string;
  resultMessage: string;
  engine_result: string;
  engine_result_code: number;
  engine_result_message: string;
  tx_blob: string;
  tx_json: {
    Account: string;
    Amount: {
      currency: string;
      issuer: string;
      value: string;
    };
    Destination: string;
    InvoiceID?: string;
    Fee: string;
    Flags: number;
    Sequence: number;
    SigningPubKey: string;
    TransactionType: string;
    TxnSignature: string;
    hash: string;
  };
}

export interface SingleOutputTx {
  engine_result: string;
  engine_result_code: number;
  engine_result_message: string;
  ledger_current_index: number;
  ledger_index?: number;
  status: string;
  transaction: {
    Account: string;
    Amount: string;
    Destination: string;
    DestinationTag: number;
    Fee: string;
    Flags: number;
    LastLedgerSequence: number;
    Sequence: number;
    SigningPubKey: string;
    TransactionType: string;
    TxnSignature: string;
    hash: string;
    InvoiceID?: string;
  };
  type: 'transaction';
  validated: false;
}
