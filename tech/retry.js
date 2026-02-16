/**
 * Повторяет вызов асинхронной функции при неудаче.
 * @param {Function} asyncFunction - асинхронная функция (без аргументов)
 * @param {Object} options - опции
 * @param {number} options.count - количество попыток
 * @param {number} options.delay - задержка между попытками в миллисекундах
 * @returns {Promise<*>} - результат asyncFunction или последняя ошибка
 */
async function retry(asyncFunction, { count, delay }) {
  let lastError;
  for (let i = 0; i < count; i++) {
    try {
      return await asyncFunction();
    } catch (error) {
      lastError = error;
      if (i < count - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

module.exports = { retry };
