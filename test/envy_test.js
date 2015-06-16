'use strict';
var assign = require('object-assign');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var co = require('co');
var exec = require('mz/child_process').exec;
var normalize = require('path').normalize;

var envy = normalize(`${__dirname}/../envy`);

chai.use(chaiAsPromised);
var expect = chai.expect;

suite('envy', function() {
  [
    'first time',
    'cached'
  ].forEach(function(time) {
    test(`${time} should respect node in .envyrc`, function() {
      return expect(getNodeVersion({ cwd: `${__dirname}/fixtures/nodejs` }))
        .to
        .eventually
        .include('v0.12.4');
    });

    test(`${time} should respect npm in .envyrc`, function() {
      return expect(getNpmVersion({ cwd: `${__dirname}/fixtures/nodejs` }))
        .to
        .eventually
        .include('1.4.28');
    });

    test(`${time} should work with iojs versions`, function() {
      return expect(getNodeVersion({ cwd: `${__dirname}/fixtures/iojs` }))
        .to
        .eventually
        .include('v1.8.1');
    });

    test(`${time} should respect NODEJS_VERSION env var`, function() {
      var env = assign({}, process.env, { NODEJS_VERSION: 'v0.11.2' });
      return expect(getNodeVersion({ env: env }))
        .to
        .eventually
        .include('v0.11.2');
    });

    test(`${time} should respect NPM_VERSION env var`, function() {
      var env = assign({}, process.env, { NPM_VERSION: '2.10.1' });
      return expect(getNpmVersion({ env: env }))
        .to
        .eventually
        .include('2.10.1');
    });

    test(`${time} should install packages globally into sandbox`, co.wrap(function *() {
      var result = yield exec(`${envy} npm install -g jsenvy`);
      var expected = `${normalize(__dirname + '/../npm/2.11.2/bin/bin/envy')}`;
      expect(result[0]).to.include(expected);
    }));
  });
});

var getNodeVersion = co.wrap(function *(options) {
  var result = yield exec(`${envy} node --version`, options);
  return result[0];
});

var getNpmVersion = co.wrap(function *(options) {
  var result = yield exec(`${envy} npm --version`, options);
  return result[0];
});
