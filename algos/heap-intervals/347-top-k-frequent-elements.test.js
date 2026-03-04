const { topKFrequent } = require('./347-top-k-frequent-elements');

function assertSameElements(actual, expected, message) {
  const a = [...actual].sort((x, y) => x - y);
  const e = [...expected].sort((x, y) => x - y);
  const ok = a.length === e.length && a.every((v, i) => v === e[i]);
  if (!ok) {
    throw new Error(message || `Expected [${e}], got [${a}]`);
  }
}

function run(name, fn) {
  try {
    fn();
    console.log('OK:', name);
  } catch (e) {
    console.log('FAIL:', name, e.message);
  }
}

// --- примеры из условия ---

run('Пример 1: [1,1,1,2,2,3], k=2 → [1,2]', () => {
  assertSameElements(topKFrequent([1, 1, 1, 2, 2, 3], 2), [1, 2]);
});

run('Пример 2: [1,2,3,4,5], k=2 → [1,2] (любые 2 при равных частотах)', () => {
  const result = topKFrequent([1, 2, 3, 4, 5], 2);
  if (result.length !== 2) throw new Error(`Expected length 2, got ${result.length}`);
});

// --- краевые случаи ---

run('k больше числа уникальных → вернуть все уникальные', () => {
  assertSameElements(topKFrequent([1, 1, 2], 5), [1, 2]);
});

run('k равно числу уникальных → вернуть все', () => {
  assertSameElements(topKFrequent([1, 1, 2, 3], 3), [1, 2, 3]);
});

run('Один элемент, k=1 → [элемент]', () => {
  assertSameElements(topKFrequent([7], 1), [7]);
});

run('Все элементы одинаковые, k=1', () => {
  assertSameElements(topKFrequent([5, 5, 5, 5], 1), [5]);
});

run('Два элемента с одинаковой частотой, k=1 → один из них', () => {
  const result = topKFrequent([1, 2], 1);
  if (result.length !== 1) throw new Error(`Expected length 1, got ${result.length}`);
  if (result[0] !== 1 && result[0] !== 2) throw new Error(`Unexpected value ${result[0]}`);
});
