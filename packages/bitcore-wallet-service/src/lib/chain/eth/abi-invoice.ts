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
export const InvoiceAbi = [
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'quoteSigner',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'bytes32'
      }
    ],
    name: 'isPaid',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'valueSigner',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'hash',
        type: 'bytes32'
      },
      {
        indexed: true,
        name: 'tokenContract',
        type: 'address'
      },
      {
        indexed: false,
        name: 'time',
        type: 'uint256'
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'PaymentAccepted',
    type: 'event'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'value',
        type: 'uint256'
      },
      {
        name: 'gasPrice',
        type: 'uint256'
      },
      {
        name: 'expiration',
        type: 'uint256'
      },
      {
        name: 'payload',
        type: 'bytes32'
      },
      {
        name: 'hash',
        type: 'bytes32'
      },
      {
        name: 'v',
        type: 'uint8'
      },
      {
        name: 'r',
        type: 'bytes32'
      },
      {
        name: 's',
        type: 'bytes32'
      },
      {
        name: 'tokenContract',
        type: 'address'
      }
    ],
    name: 'isValidPayment',
    outputs: [
      {
        name: 'valid',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'value',
        type: 'uint256'
      },
      {
        name: 'gasPrice',
        type: 'uint256'
      },
      {
        name: 'expiration',
        type: 'uint256'
      },
      {
        name: 'payload',
        type: 'bytes32'
      },
      {
        name: 'hash',
        type: 'bytes32'
      },
      {
        name: 'v',
        type: 'uint8'
      },
      {
        name: 'r',
        type: 'bytes32'
      },
      {
        name: 's',
        type: 'bytes32'
      },
      {
        name: 'tokenContract',
        type: 'address'
      }
    ],
    name: 'validatePayment',
    outputs: [
      {
        name: 'valid',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'value',
        type: 'uint256'
      },
      {
        name: 'gasPrice',
        type: 'uint256'
      },
      {
        name: 'expiration',
        type: 'uint256'
      },
      {
        name: 'payload',
        type: 'bytes32'
      },
      {
        name: 'hash',
        type: 'bytes32'
      },
      {
        name: 'v',
        type: 'uint8'
      },
      {
        name: 'r',
        type: 'bytes32'
      },
      {
        name: 's',
        type: 'bytes32'
      },
      {
        name: 'tokenContract',
        type: 'address'
      }
    ],
    name: 'pay',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'tokenContract',
        type: 'address'
      }
    ],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newQuoteSigner',
        type: 'address'
      }
    ],
    name: 'setSigner',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newAdmin',
        type: 'address'
      }
    ],
    name: 'setAdmin',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
