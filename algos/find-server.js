/**
 * Находит первый доступный сервер из списка.
 * Вызывает check минимальное число раз — последовательно, останавливается на первом успехе.
 *
 * @param {Array} servers — список серверов (имена или объекты)
 * @param {function(server): Promise} check — функция проверки, возвращает Promise (resolve = доступен, reject = недоступен)
 * @returns {Promise} — резолвится именем первого доступного сервера, реджектится если ни один не доступен
 */
function findServer(servers, check) {
  return new Promise(function (resolve, reject) {
    var index = 0;

    function tryNext() {
      if (index >= servers.length) {
        reject(new Error('No server available'));
        return;
      }
      var server = servers[index];
      index += 1;
      Promise.resolve(check(server)).then(
        function onFulfilled() {
          resolve(server);
        },
        function onRejected() {
          tryNext();
        }
      );
    }

    tryNext();
  });
}

module.exports = { findServer };
