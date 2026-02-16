const { findServer } = require('./find-server');

function delay(ms, value) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(value);
    }, ms);
  });
}

// check возвращает Promise: resolve = сервер доступен, reject = недоступен
function makeCheck(available) {
  return function (name) {
    if (available.has(name)) {
      return delay(10, true);
    }
    return Promise.reject(new Error('unavailable'));
  };
}

// Минимальное число вызовов: проверяем по порядку, как только один успешен — останавливаемся
console.log('Test 1: первый сервер доступен — check вызывается 1 раз');
var calls1 = 0;
findServer(['a', 'b', 'c'], function (s) {
  calls1 += 1;
  return s === 'a' ? delay(5, true) : Promise.reject(new Error('down'));
}).then(
  function (name) {
    console.log('  Result:', name, 'calls:', calls1);
    if (name !== 'a' || calls1 !== 1) throw new Error('expected a, 1 call');
  },
  function (e) {
    console.log('  Failed:', e.message);
  }
);

console.log('Test 2: третий сервер доступен — check вызывается 3 раза');
var calls2 = 0;
setTimeout(function () {
  findServer(['x', 'y', 'z'], function (s) {
    calls2 += 1;
    return s === 'z' ? delay(5, true) : Promise.reject(new Error('down'));
  }).then(
    function (name) {
      console.log('  Result:', name, 'calls:', calls2);
      if (name !== 'z' || calls2 !== 3) throw new Error('expected z, 3 calls');
    },
    function (e) {
      console.log('  Failed:', e.message);
    }
  );
}, 50);

console.log('Test 3: ни один не доступен — reject');
setTimeout(function () {
  findServer(['a', 'b'], makeCheck(new Set())).then(
    function () {
      console.log('  Unexpected resolve');
    },
    function (e) {
      console.log('  Rejected as expected:', e.message);
    }
  );
}, 100);
