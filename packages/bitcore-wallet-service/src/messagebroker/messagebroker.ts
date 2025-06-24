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
#!/usr/bin/env node
import io from 'socket.io';
import logger from '../lib/logger';

const DEFAULT_PORT = 3380;

const opts = {
  port: parseInt(process.argv[2]) || DEFAULT_PORT
};

const server = io(opts.port.toString());
server.on('connection', socket => {
  socket.on('msg', data => {
    server.emit('msg', data);
  });
});

logger.info('Message broker server listening on port ' + opts.port);
