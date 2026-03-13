// Последовательное выполнение промисов (Среднее)
// Вызывайте asyncFn для каждого элемента по очереди;
// следующий вызов — только после завершения предыдущего.
// Возвращает массив результатов в порядке выполнения.
// При ошибке любого вызова — останавливается и бросает ошибку.
// Пустой массив → [].

/**
 * Выполняет асинхронную функцию для каждого элемента массива последовательно.
 *
 * @param {Array<any>} items - массив элементов
 * @param {(item: any) => Promise<any>} asyncFn - асинхронная функция для каждого элемента
 * @returns {Promise<Array<any>>} - массив результатов в порядке выполнения
 *
 * @example
 * const items = ['item1', 'item2', 'item3'];
 * const postData = async (item) => {
 *   await delay(100);
 *   return `posted: ${item}`;
 * };
 * const results = await sequentialPromises(items, postData);
 * // results = ['posted: item1', 'posted: item2', 'posted: item3']
 * // Всего ~300ms (100ms * 3)
 */
async function* sequentialAsync(items, asyncFn) {
  for (const item of items) {
    const result = await asyncFn(item);
    yield result;
  }
}

async function sequentialPromises(items, asyncFn) {
  const res = [];
  const asyncItems = sequentialAsync(items, asyncFn);

  for await (const item of asyncItems) {
    res.push(item);
  }

  return res;
}

async function sequentialPromises(items, asyncFn) {
  const res = [];
  for (const item of items) {
    res.push(await asyncFn(item));
  }

  return res;
}

async function sequentialPromises(items, asyncFn) {
  const res = [];

  await items.reduce((prev, item) => {
    return prev.then(() => asyncFn(item)).then((r) => res.push(r));
  }, Promise.resolve());

  return res;
}

async function sequentialPromises(items, asyncFn) {
  if (!items.length) return [];

  const [first, ...rest] = items;
  const head = await asyncFn(first);
  const tail = await sequentialPromises(rest, asyncFn);

  return [head, ...tail];

  // items = [1, 2, 3, 4]
  // head = r(1)
  // tail =
  //  head = r(2)
  //  tail =
  //    head = r(3)
  //    tail =
  //      head = r(4)
  //      tail = []
  //      [r(4), ...[]] = [r(4)]
  //    [r(3), ...[r(4)]] = [r(3), r(4)]
  //  [r(2), r(3), r(4)]
  // [r(1), r(2), r(3), r(4)]

  // first
  // ...[]
}

module.exports = { sequentialPromises };
