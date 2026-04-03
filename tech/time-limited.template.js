/**
 * Ограничение времени выполнения асинхронной функции (LeetCode 2637)
 *
 * Дана асинхронная функция fn и время t в миллисекундах.
 * Нужно вернуть новую версию этой функции, выполнение которой ограничено заданным временем.
 * Функция fn принимает аргументы, переданные в эту новую функцию.
 *
 * Правила:
 * - если fn выполнится за заданное время t → resolve с результатом fn
 * - если fn не выполнится за заданное время t → reject со строкой "Time limit exceeded"
 *
 * Подсказки:
 * - Promise.race принимает массив промисов и возвращает промис, который резолвится/реджектится
 *   по результату первого завершённого промиса
 * - setTimeout можно обернуть в промис для создания «таймаутного» промиса
 * - новая функция должна принимать ...args и передавать их в fn(...args)
 *
 * @param {Function} fn — асинхронная функция
 * @param {number} t — лимит времени в миллисекундах
 * @return {Function}
 */
const timeLimited = function (fn, t) {
  // TODO: вернуть функцию, которая:
  // 1. Принимает аргументы (...args)
  // 2. Создаёт промис таймаута (реджект через t мс с "Time limit exceeded")
  // 3. Гоняет fn(...args) и таймаут через Promise.race
  // 4. Возвращает результат гонки

  function execute(...args) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject("Time limit exceeded");
      }, t);

      fn(args)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => clearTimeout(timer));
    });
  }

  return execute();
};

const asyncFn = () =>
  new Promise((resolve) => setTimeout(() => resolve(), 500));

const limitedFn = timeLimited(asyncFn);

limitedFn(args);
