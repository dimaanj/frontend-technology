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
  function binaryCheck(l, r, serverId) {
    if (l > r) {
      if (serverId >= 0) {
        return Promise.resolve(servers[serverId]);
      }
      return Promise.reject(new Error('All servers function well'));
    }

    const midIdx = Math.floor((r + l) / 2);

    return check(servers[midIdx])
      .then((isOk) => {
        if (isOk) {
          const nl = midIdx + 1;
          return binaryCheck(nl, r, serverId);
        } else {
          const nr = midIdx - 1;
          return binaryCheck(l, nr, midIdx);
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  return binaryCheck(0, servers.length - 1, -1);
}

module.exports = { findServer };
