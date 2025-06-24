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
export class ClientError {
  name: string;
  code: string;
  message: string;
  messageData: object;
  constructor(...args) {
    switch (args.length) {
      case 0:
        this.code = 'BADREQUEST';
        this.message = 'Bad request';
        break;
      case 1:
        this.code = 'BADREQUEST';
        this.message = args[0];
        break;
      default:
      case 2:
        this.code = args[0];
        this.message = args[1];
        break;
      case 3:
        this.code = args[0];
        this.message = args[1];
        this.messageData = args[2];
        break;
    }
    this.name = this.code;
  }

  toString() {
    return '<ClientError:' + this.code + ' ' + this.message + '>';
  }
}
