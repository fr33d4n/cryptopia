'use strict';

const CipherJS = require('cipherjs');

class Caesar {
  
  constructor() {}    

  async encrypt(input, key) {
    return CipherJS.Caesar.encrypt(input, key);
  }

  async decrypt(input, key) {
    return CipherJS.Caesar.decrypt(input, key);
  }
}

module.exports = new Caesar();