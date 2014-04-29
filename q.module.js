'use strict';

angular.module('ng.q', [])
  .config([
    '$provide', function ($provide) {
      var objectKeys = Object.keys,
        decoratePromise = function decoratePromise(promise) {
          promise._q = {
            get: function get(prop) {
              return promise.then(function (o) {
                return o[prop];
              });
            },
            post: function post(methodName, args) {
              return promise.then(function (o) {
                return o[methodName].apply(o, args);
              });
            },
            keys: function keys() {
              return promise.then(function (o) {
                return objectKeys(o);
              });
            }
          };

          angular.extend(promise, promise._q);
        };

      if (!angular.isFunction(objectKeys)) {
        objectKeys = (function () {
          var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({toString: null})
              .propertyIsEnumerable('toString'),
            dontEnums = [
              'toString',
              'toLocaleString',
              'valueOf',
              'hasOwnProperty',
              'isPrototypeOf',
              'propertyIsEnumerable',
              'constructor'
            ],
            dontEnumsLength = dontEnums.length;

          return function (obj) {
            if (typeof obj !== 'object' &&
              (typeof obj !== 'function' || obj === null)) {
              throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

            for (prop in obj) {
              if (hasOwnProperty.call(obj, prop)) {
                result.push(prop);
              }
            }

            if (hasDontEnumBug) {
              for (i = 0; i < dontEnumsLength; i++) {
                if (hasOwnProperty.call(obj, dontEnums[i])) {
                  result.push(dontEnums[i]);
                }
              }
            }
            return result;
          };
        }());
      }

      $provide.decorator('$q', [
        '$delegate', function ($delegate) {
          var defer = $delegate.defer,
            reject = $delegate.reject,
            when = $delegate.when,
            all = $delegate.all;

          $delegate.reject = function qReject() {
            var promise = reject.apply($delegate, arguments);
            decoratePromise(promise);
            return promise;
          };

          $delegate.defer = function qDefer() {
            var dfrd = defer.apply($delegate, arguments);
            decoratePromise(dfrd.promise);
            return dfrd;
          };

          $delegate.when = function qWhen() {
            var promise = when.apply($delegate, arguments);
            decoratePromise(promise);
            return promise;
          };

          $delegate.all = function qAll() {
            var promise = all.apply($delegate, arguments);
            decoratePromise(promise);
            return promise;
          };

          return $delegate;
        }
      ]);
    }
  ]);
