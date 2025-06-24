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
const program = require('commander');

const _parse = program.parse.bind(program);

program.parse = args => {
  _parse(args);

  const requiredOptions = program.options.filter(opt => opt.required && opt.required !== 0);

  const programProps = Object.getOwnPropertyNames(program);
  for (let option of program.options) {
    const optionName = option.long.replace('--', '');
    const required = option.required && option.required !== 0;
    const missing = !programProps.includes(optionName);
    if (required && missing) {
      throw new Error(`Missing required flag: --${optionName}`);
    }
  }
};

module.exports = program;
