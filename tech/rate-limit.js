// TODO: реализуйте rate limiter на основе sliding window:
//
// Условие:
//   Сервис регистрации по email должен защищаться от перебора.
//   Один пользователь (userId) не может совершить более `limit` запросов
//   за последние `windowMs` миллисекунд.
//
// Требования:
//   - isAllowed(userId) возвращает true, если запрос разрешён, false — если лимит превышен
//   - окно «скользящее»: учитываются только запросы за последние windowMs мс
//     (не фиксированная минута 12:00–13:00, а именно последние N мс от текущего момента)
//   - каждый пользователь имеет независимый счётчик
//   - разрешённые запросы регистрируются (учитываются в будущих проверках)
//   - запрещённые запросы НЕ регистрируются
//
// Пример использования:
//   const limiter = new RateLimiter(5, 60_000); // 5 запросов в минуту
//
//   limiter.isAllowed('user@example.com'); // true  (1-й запрос)
//   limiter.isAllowed('user@example.com'); // true  (2-й)
//   limiter.isAllowed('user@example.com'); // true  (3-й)
//   limiter.isAllowed('user@example.com'); // true  (4-й)
//   limiter.isAllowed('user@example.com'); // true  (5-й)
//   limiter.isAllowed('user@example.com'); // false (лимит исчерпан)
//
//   limiter.isAllowed('other@example.com'); // true (другой пользователь — независимый лимит)
//
// Подсказки (не читай раньше времени):
//   - Подумай, какую структуру данных использовать для хранения меток времени.
//   - Как «сдвинуть» окно при каждом новом запросе?
//   - Что нужно сделать перед тем, как проверять счётчик?

class RateLimiter {
  constructor(limit, windowMs) {
    this.map = new Map();

    this.limit = limit;
    this.windowMs = windowMs;
  }

  /**
   * Проверяет, разрешён ли запрос для данного пользователя.
   * @param {string} userId - идентификатор пользователя (например, email)
   * @returns {boolean}
   */
  isAllowed(userId) {
    const entry = (this.map.get(userId) || []).filter((cur) => {
      if (cur < Date.now()) return false;
      return true;
    });

    if (entry.length < this.limit) {
      const now = Date.now();
      const newEntry = [...entry, now + this.windowMs]

      this.map.set(userId, newEntry);
      return true;
    }

    return false;
  }
}

module.exports = { RateLimiter };
