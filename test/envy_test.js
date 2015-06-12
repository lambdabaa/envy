'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var exec = require('mz/child_process').exec;

chai.use(chaiAsPromised);
var expect = chai.expect;

suite('envy', function() {
  test('should respect node in .envyrc', function() {
    return expect(getNodeVersion({ cwd: `${__dirname}/fixtures/nodejs` }))
      .to
      .eventually
      .equal('v0.12.4');
  });

  test('should respect npm in .envyrc', function() {
    return expect(getNpmVersion({ cwd: `${__dirname}/fixtures/nodejs` }))
      .to
      .eventually
      .equal('1.4.28');
  });

  test('should work with iojs versions', function() {
    return expect(getNodeVersion({ cwd: `${__dirname}/fixtures/iojs` }))
      .to
      .eventually
      .equal('v1.8.1');
  });

  test('should respect NODEJS_VERSION env var', function() {
    return expect(getNodeVersion({ env: { NODEJS_VERSION: 'v0.11.2' } }))
      .to
      .eventually
      .equal('v0.11.2');
  });

  test('should respect NPM_VERSION env var', function() {
    return expect(getNodeVersion({ env: { NODEJS_VERSION: 'v0.11.2' } }))
      .to
      .eventually
      .equal('v0.11.2');
  });

  test.skip('should be happy with npm prefix', function() {
    // TODO
  });

  test.skip('should install packages globally into sandbox', function() {
    // TODO
  });
});

function getNodeVersion(options) {
  return exec('/bin/bash envy node --version', options);
}

function getNpmVersion(options) {
  return exec('/bin/bash envy npm --version', options);
}
