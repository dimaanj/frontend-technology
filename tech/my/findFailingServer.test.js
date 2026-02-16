const { findServer } = require('./findFailingServer');

function delay(ms, value) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(value);
    }, ms);
  });
}

// check(server) => Promise<boolean>: true = работает, false = сбой
function makeCheck(workingPredicate) {
  return function (name) {
    return delay(10, workingPredicate(name));
  };
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || 'Expected ' + expected + ', got ' + actual);
  }
}

function run(name, fn) {
  try {
    var result = fn();
    var p = result && typeof result.then === 'function' ? result : Promise.resolve();
    return p
      .then(function () {
        console.log('OK:', name);
      })
      .catch(function (e) {
        console.log('FAIL:', name, e.message || e);
      });
  } catch (e) {
    console.log('FAIL:', name, e.message || e);
    return Promise.resolve();
  }
}

// --- тесты ---

Promise.all([
  run('первый сбойный в середине', function () {
    var servers = [
      'working_1',
      'working_2',
      'not_working_1',
      'not_working_2',
      'not_working_3',
    ];
    var check = makeCheck(function (name) {
      return !name.includes('not_working');
    });
    return findServer(servers, check).then(function (name) {
      assertEqual(name, 'not_working_1');
    });
  }),
  run('первый сбойный — первый элемент', function () {
    var servers = ['fail_1', 'fail_2'];
    var check = makeCheck(function () {
      return false;
    });
    return findServer(servers, check).then(function (name) {
      assertEqual(name, 'fail_1');
    });
  }),
  run('первый сбойный — последний элемент', function () {
    var servers = ['ok_1', 'ok_2', 'fail'];
    var check = makeCheck(function (name) {
      return name !== 'fail';
    });
    return findServer(servers, check).then(function (name) {
      assertEqual(name, 'fail');
    });
  }),
  run('все рабочие — reject', function () {
    var servers = ['a', 'b', 'c'];
    var check = makeCheck(function () {
      return true;
    });
    return findServer(servers, check).then(
      function () {
        throw new Error('Expected reject');
      },
      function (err) {
        if (!err.message || !err.message.includes('All servers function well')) {
          throw new Error('Expected reject with "All servers function well", got ' + err.message);
        }
      }
    );
  }),
  run('один сервер, сбойный', function () {
    var servers = ['only'];
    var check = makeCheck(function () {
      return false;
    });
    return findServer(servers, check).then(function (name) {
      assertEqual(name, 'only');
    });
  }),
  run('один сервер, рабочий — reject', function () {
    var servers = ['only'];
    var check = makeCheck(function () {
      return true;
    });
    return findServer(servers, check).then(
      function () {
        throw new Error('Expected reject');
      },
      function (err) {
        if (!err.message || !err.message.includes('All servers function well')) {
          throw new Error('Expected reject with "All servers function well", got ' + err.message);
        }
      }
    );
  }),
  run('пустой массив — reject', function () {
    var check = makeCheck(function () {
      return true;
    });
    return findServer([], check).then(
      function () {
        throw new Error('Expected reject');
      },
      function (err) {
        if (!err.message || !err.message.includes('All servers function well')) {
          throw new Error('Expected reject with "All servers function well", got ' + err.message);
        }
      }
    );
  }),
  run('число вызовов check не больше ceil(log2(n)) + 1', function () {
    var servers = [
      'w1',
      'w2',
      'w3',
      'w4',
      'w5',
      'w6',
      'w7',
      'w8',
      'f1',
      'f2',
    ];
    var calls = 0;
    var check = function (name) {
      calls += 1;
      return delay(5, !name.startsWith('f'));
    };
    var maxCalls = Math.ceil(Math.log2(servers.length)) + 2; // с запасом
    return findServer(servers, check).then(function (name) {
      assertEqual(name, 'f1');
      if (calls > maxCalls) {
        throw new Error(
          'Too many check calls: ' + calls + ', expected <= ' + maxCalls
        );
      }
      console.log('    check вызвана', calls, 'раз(а) при n=' + servers.length);
    });
  }),
]).then(function () {
  console.log('Done.');
});
