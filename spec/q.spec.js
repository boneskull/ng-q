'use strict';

var isFunction = angular.isFunction;

describe('q.module', function () {

  var testPromise = function testPromise(promise) {
    var _q = promise._q,
      qFuncs = [];
    expect(_q).to.not.be.undefined;
    expect(_q.length).to.not.equal(0);
    angular.forEach(_q, function (val, key) {
      expect(isFunction(val)).to.be.true;
      qFuncs.push(key);
    });
    angular.forEach(qFuncs, function (key) {
      expect(isFunction(promise[key])).to.be.true;
    });

    },
    $q;

  beforeEach(module('ng.q'));

  beforeEach(inject(function(_$q_) {
    $q = _$q_;
  }));


  it('should decorate Promise object as returned by defer()', function () {
    testPromise($q.defer().promise);
  });

  it('should decorate Promise object as returned by reject()', function () {
    testPromise($q.reject('because reasons'));
  });

  it('should decorate Promise object as returned by when()', function () {
    testPromise($q.when({}));
  });

  it('should decorate Promise object as returned by all()', function () {
    testPromise($q.all([]));
  });

});
