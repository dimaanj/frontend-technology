/**
 * Находит первый сбойный сервер (первый "улавший").
 * Массив упорядочен: сначала все рабочие, с какого-то индекса — сбойные.
 * check(server) возвращает Promise<boolean>: true = работает, false = сбой.
 * Бинарный поиск — O(log n) вызовов check. Без async/await и генераторов.
 *
 * @param {Array<string>} servers — список серверов (по порядку: рабочие, затем сбойные)
 * @param {function(server): Promise<boolean>} check — асинхронная проверка
 * @returns {Promise<string>} — имя первого сбойного сервера или reject если все рабочие
 */
function findServer(servers, check) {
  var minNonFunctionalIndex = Infinity;

  function binarySearch(lo, hi, resolve, reject) {
    if (lo > hi) {
      if (minNonFunctionalIndex === Infinity) {
        reject(new Error('All servers function well'));
        return;
      }
      resolve(servers[minNonFunctionalIndex]);
      return;
    }

    var mi = Math.floor((lo + hi) / 2);

    Promise.resolve(check(servers[mi])).then(
      function (isFunctioning) {
        if (isFunctioning) {
          binarySearch(mi + 1, hi, resolve, reject);
        } else {
          minNonFunctionalIndex = Math.min(mi, minNonFunctionalIndex);
          binarySearch(lo, mi - 1, resolve, reject);
        }
      },
      function (err) {
        reject(err);
      }
    );
  }

  return new Promise(function (resolve, reject) {
    if (servers.length === 0) {
      reject(new Error('All servers function well'));
      return;
    }
    binarySearch(0, servers.length - 1, resolve, reject);
  });
}

module.exports = { findServer };
