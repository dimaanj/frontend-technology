/**
 * Повторяет выполнение промиса при ошибке.
 *
 * @param {() => Promise<any>} fn - функция без аргументов, возвращающая Promise
 * @param {number} retries - число повторных попыток (без первой)
 * @returns {Promise<any>} - результат fn или последняя ошибка
 */
async function retryPromise(fn, retries) {
  let counter = retries + 1;

  function retry(rfn) {
    return rfn().catch((error) => {
      counter--;
      if (counter === 0) {
        throw error;
      }

      return retry(rfn);
    });
  }

  return retry(fn);
}

async function retryPromise1(fn, retries) {
  let counter = retries + 1;

  async function retry(rfn) {
    try {
      return await rfn();
    } catch (error) {
      counter--;
      if (counter === 0) {
        throw error;
      }

      return retry(rfn);
    }
  }

  const res = await retry(fn);

  return res;
}

module.exports = { retryPromise };
