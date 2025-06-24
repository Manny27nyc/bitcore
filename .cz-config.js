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
module.exports = {
  types: [
    {value: 'feature',  name: 'feat:     A new feature'},
    {value: 'fix',      name: 'fix:      A bug fix'},
    {value: 'docs',     name: 'docs:     Documentation only changes'},
    {value: 'style',    name: 'style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)'},
    {value: 'refactor', name: 'refactor: A code change that neither fixes a bug nor adds a feature'},
    {value: 'perf',     name: 'perf:     A code change that improves performance'},
    {value: 'test',     name: 'test:     Adding missing tests'},
    {value: 'chore',    name: 'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation'},
    {value: 'revert',   name: 'revert:   Revert to a commit'},
    {value: 'WIP',      name: 'WIP:      Work in progress'}
  ],

  scopes: [
    {name: 'all'},
    {name: 'node'},
    {name: 'insight'},
    {name: 'libs'},
    {name: 'bws'},
    {name: 'client'}
  ],
}
