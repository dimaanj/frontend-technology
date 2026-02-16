/**
 * Декоратор асинхронной функции с ограничением по времени.
 * @param {Function} fn - асинхронная функция
 * @param {number} ms - лимит времени в миллисекундах
 * @returns {Function} - функция с тем же контрактом, что и fn, но с проверкой времени
 */
function timeLimited(fn, ms) {
  return async function (...args) {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Time Exceeded')), ms);
    });
    const fnPromise = fn.apply(this, args);
    return Promise.race([fnPromise, timeoutPromise]);
  };
}

// Пример:
// const limited = timeLimited(async () => {
//   await new Promise(r => setTimeout(r, 200));
//   return 'ok';
// }, 100);
// limited().catch(e => console.log(e.message)); // "Time Exceeded"
//
// const limited2 = timeLimited(async () => 'done', 500);
// limited2().then(console.log); // "done"

module.exports = { timeLimited };
