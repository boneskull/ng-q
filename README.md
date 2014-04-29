# ng-q

[Q](https://github.com/kriskowal/q) extensions to AngularJS' `$q` Implementation

> **Warning:** There is not much here right now, but I plan to expand the API as much as is reasonable.

## Purpose

Pour some sugar on `$q`?  Mostly wanted to see if it was possible.

## Installation

```shell
bower install ng-q
```

### Running Tests

```shell
npm install && npm test
```

## Usage

Include `q.module.js` or `q.module.min.js`.

```js
angular.module('myModule', ['ng.q'])

// trivial example; foo() and bar() are functionally equivalent.

function MyCtrl($scope, $q, $http) {

  $scope.foo = function() {
    return $http.get('/some/url')
      .then(function(res) {
        return res.data;
      });
    });
  };

  $scope.bar = function() {
    return $http.get('/some/url')
      .get('data');
  };
};
```

## API

Promise objects now have the following functions:

- `get()`: See [Q API docs](https://github
.com/kriskowal/q/wiki/API-Reference#promisegetpropertyname).

- `post()`: See [Q API docs](https://github
.com/kriskowal/q/wiki/API-Reference#promisepostmethodname-args).

## Author

Christopher Hiller <<chiller@badwing.com>>

