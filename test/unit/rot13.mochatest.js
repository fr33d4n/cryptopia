'use strict';

const basedir = '../..';
const sinon = require('sinon');
const expect = require('expect.js');

describe('Rot13 cipher tests', () => {

  describe('encrypt', () => {

    let Cryptopia = null;

    beforeEach(() => {
      Cryptopia = require(basedir + '/src/index');
    });

    it('should return the correct encryption for the given input', async() => {
      expect(await Cryptopia.encrypt('rot13', 'ROTTHIRTEENCIPHER')).to.be('EBGGUVEGRRAPVCURE');
    });
  });

  describe('decrypt', () => {
    let Cryptopia = null;

    beforeEach(() => {
      Cryptopia = require(basedir + '/src/index');
    });

    it('should return the correct descryption for the given input', async() => {
      expect(await Cryptopia.decrypt('rot13', 'EBGGUVEGRRAPVCURE')).to.be('ROTTHIRTEENCIPHER');
    });
  });
});