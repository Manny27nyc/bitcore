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
/**
 * parseArgv
 * returns an object from argv
 * @param {String[]} required - array of required arguments
 * @param {String[]} optional=[] - array of optional arguments to capture
 * @returns {object}
 */
export default function parseArgv(required: string[], optional: string[] = []): any {
  let parsed = {};
  for (let arg of required) {
    const argIndex = process.argv.indexOf(`--${arg}`);
    let argValue = argIndex >= 0 ? process.argv[argIndex + 1] : '';
    if (!argValue) throw new Error(arg + ' is a required command argument');
    Object.assign(parsed, { [arg]: argValue });
  }
  for (let arg of optional) {
    const argIndex = process.argv.indexOf(`--${arg}`);
    let argValue = argIndex >= 0 ? process.argv[argIndex + 1] : '';
    Object.assign(parsed, { [arg]: argValue });
  }
  return parsed;
}
