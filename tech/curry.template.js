/**
 * Каррирование функции `fn`.
 *
 * Вариант условия (уточни, какой именно у тебя в задаче):
 *
 * Вариант A — по количеству аргументов `fn.length`:
 *   const sum = (a, b, c) => a + b + c;
 *   const curried = curry(sum);
 *   curried(1)(2)(3) === 6;
 *
 * Вариант B — по "пустому вызову":
 *   const sum = (...args) => args.reduce((a, b) => a + b, 0);
 *   const curried = curry(sum);
 *   curried(1)(2)(3)() === 6;
 *
 * Ниже только шаблон с направлением, без готовой реализации.
 *
 * @param {Function} fn
 * @returns {Function}
 */
export default function curry(fn) {
  // 1. Валидация входа
  // if (typeof fn !== 'function') {
  //   throw new TypeError('fn must be a function');
  // }

  // 2. Хранилище аргументов (можно использовать массив или замыкание на список аргументов)
  // const collected = [];

  // 3. Внутренняя функция curried:
  //   - принимает новые аргументы
  //   - решает, пора ли вызывать fn, или продолжаем копить
  //
  // Для варианта A (по fn.length):
  //   - как только общее число накопленных аргументов >= fn.length,
  //     вызываем fn(...args) и возвращаем результат.
  //
  // Для варианта B (по пустому вызову):
  //   - если curried вызвали без аргументов, вызываем fn со всеми накопленными
  //     аргументами и возвращаем результат.
  //
  // Во всех остальных случаях curried должна вернуть СЕБЯ ЖЕ (или функцию того же вида),
  // чтобы поддерживать цепочку: curry(fn)(1)(2)(3)...

  // TODO: реализовать curried и вернуть её
  // function curried(...args) {
  //   // ...
  // }
  //
  // return curried;

  let colleected = [];

  function curried(...args) {
    colleected.push(...args);

    if (colleected.length >= fn.length) {
      const res = fn(...colleected);
      colleected = [];
      return res;
    } else {
      return curried;
    }
  }

  return curried;
}
