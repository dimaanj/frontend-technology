/**
 * Ограничивает количество вызовов callback.
 * После limit вызовов дальнейшие вызовы игнорируются до clearLimit().
 * @param {Function} cb - функция-колбэк
 * @param {number} limit - максимальное количество вызовов
 * @returns {Function} - обёртка с методом clearLimit()
 */
function callLimit(cb, limit) {
  let count = 0;

  function limited(...args) {
    if (count < limit) {
      count++;
      return cb.apply(this, args);
    }
  }

  limited.clearLimit = function () {
    count = 0;
  };

  return limited;
}

// Пример:
// const cb = (...args) => console.log('Hello World', ...args);
// const limited = callLimit(cb, 3);
// limited();        // Hello World
// limited();        // Hello World
// limited();        // Hello World
// limited();        // (ничего)
// limited.clearLimit();
// limited();        // Hello World

module.exports = { callLimit };
