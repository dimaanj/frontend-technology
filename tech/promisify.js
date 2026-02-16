/**
 * Создаёт функцию с Promise API на основе функции с callback API.
 * Первый аргумент колбека — ошибка или null, остальные — результат.
 *
 * @param {Function} fn - функция с сигнатурой (..., (err, ...results) => void)
 * @returns {Function} - функция, возвращающая Promise
 */
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, ...results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length === 1 ? results[0] : results);
        }
      });
    });
  };
}

// Пример из задания:
function cbMultiply(a, b, cb) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    cb(new TypeError('Аргументы должны быть числами'));
  } else {
    cb(null, a * b);
  }
}

const promiseMultiply = promisify(cbMultiply);
promiseMultiply(3, 4).then(console.log); // 12
promiseMultiply(3, 'x').catch(console.log); // TypeError: Аргументы должны быть числами

module.exports = { promisify };
