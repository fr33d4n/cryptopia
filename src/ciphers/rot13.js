'use strict';

class Rot13 {
  
  constructor() {
    this.encryptionLookup = null;
    this.decryptionLookup = null;
  }    

  async encrypt(input) {
    /* Lazy load the lookup dictionary
     * so only when the encrypt method 
     * is used the lookup is generated.
    */
    if (this.encryptionLookup == null) {
      await this.init();
    }

    return input.split('').map(x => this.encryptionLookup[x]).join('');
  }

  async decrypt(input) {
    if (this.decryptionLookup == null) {
      await this.init();
    }

    return input.split('').map(x => this.decryptionLookup[x]).join('');
  }

  async init() {
    const input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const output = 'NOPQRSTUVWXYZABCDEFGHIJKLM'.split('');
    this.encryptionLookup = input.reduce((m,k,i) => Object.assign(m, {[k]: output[i]}), {});
    this.decryptionLookup = output.reduce((m,k,i) => Object.assign(m, {[k]: input[i]}), {});
  }
}

module.exports = new Rot13();