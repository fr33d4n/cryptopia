'use strict';

const basedir = '..';
const fs = require('fs');

const CIPHERS_BASE = __dirname + '/ciphers';

class Cryptopia {
  
  constructor() {
    this.ciphers = {};
    fs.readdirSync(CIPHERS_BASE)
      .map(c => c.slice(0, -3))
      .forEach(f => this.ciphers[f] = require(`${CIPHERS_BASE}/${f}`));
  }

  async encrypt() {
    const args = Array.prototype.slice.call(arguments);
    const method = args.shift();

    if (method == null || this.ciphers[method] == null) throw new Error('Unknown cipher');
    return this.ciphers[method].encrypt(...args);
  }

  async decrypt() {
    const args = Array.prototype.slice.call(arguments);
    const method = args.shift();

    if (method == null || this.ciphers[method] == null) throw new Error('Unknown cipher');
    return this.ciphers[method].decrypt(...args);
  }
}

/* We leverage the nature of `require` here.
 * `require` implements the facade software pattern
 * in a transparent way to the dev. So, subsequent
 * calls to `require` this file will give the same
 * Cryptopia instance.
*/
module.exports = new Cryptopia();
