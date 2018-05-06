'use strict';

const basedir = '../..';
const sinon = require('sinon');
const expect = require('expect.js');

describe('Caesar cipher tests', () => {

  describe('encrypt', () => {

    let Cryptopia = null;

    beforeEach(() => {
      Cryptopia = require(basedir + '/src/index');
    });

    it('should return the correct encryption for the given input', async() => {
      expect(await Cryptopia.encrypt('caesar', 'CAESAR CIPHER', 13)).to.be('PNRFNE PVCURE');
    });
  });

  describe('decrypt', () => {
    let Cryptopia = null;

    beforeEach(() => {
      Cryptopia = require(basedir + '/src/index');
    });

    it('should return the correct descryption for the given input', async() => {
      expect(await Cryptopia.decrypt('caesar', 'PNRFNE PVCURE', 13)).to.be('CAESAR CIPHER');
    });
  });
});