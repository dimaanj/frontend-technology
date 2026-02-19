const { mergeIntervals } = require('./56-merge-intervals');

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, got ${actual}`);
  }
}

function assertIntervalsEqual(actual, expected, message) {
  if (actual.length !== expected.length) {
    throw new Error(
      message || `Expected ${expected.length} intervals, got ${actual.length}. Expected: ${JSON.stringify(expected)}, got: ${JSON.stringify(actual)}`
    );
  }
  for (let i = 0; i < expected.length; i++) {
    if (actual[i][0] !== expected[i][0] || actual[i][1] !== expected[i][1]) {
      throw new Error(
        message ||
          `At index ${i}: expected [${expected[i]}], got [${actual[i]}]. Full expected: ${JSON.stringify(expected)}, got: ${JSON.stringify(actual)}`
      );
    }
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

run('Пример 1: [[1,3],[2,6],[8,10],[15,18]] → [[1,6],[8,10],[15,18]]', () => {
  const intervals = [
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ];
  assertIntervalsEqual(mergeIntervals(intervals), [
    [1, 6],
    [8, 10],
    [15, 18],
  ]);
});

run('Пример 2: [[1,4],[4,5]] → [[1,5]]', () => {
  const intervals = [
    [1, 4],
    [4, 5],
  ];
  assertIntervalsEqual(mergeIntervals(intervals), [[1, 5]]);
});

// --- краевые случаи ---

run('Пустой массив → []', () => {
  assertIntervalsEqual(mergeIntervals([]), []);
});

run('Один интервал → без изменений', () => {
  assertIntervalsEqual(mergeIntervals([[1, 5]]), [[1, 5]]);
});

run('Два впритык [1,4],[4,5] → один [1,5]', () => {
  assertIntervalsEqual(
    mergeIntervals([
      [1, 4],
      [4, 5],
    ]),
    [[1, 5]]
  );
});

run('Два непересекающихся [1,3],[4,6] → оба остаются', () => {
  assertIntervalsEqual(
    mergeIntervals([
      [1, 3],
      [4, 6],
    ]),
    [
      [1, 3],
      [4, 6],
    ]
  );
});

run('Два непересекающихся в обратном порядке [4,6],[1,3] → отсортированы и оба остаются', () => {
  assertIntervalsEqual(
    mergeIntervals([
      [4, 6],
      [1, 3],
    ]),
    [
      [1, 3],
      [4, 6],
    ]
  );
});

run('Три интервала, два сливаются: [1,4],[2,5],[6,8] → [1,5],[6,8]', () => {
  assertIntervalsEqual(
    mergeIntervals([
      [1, 4],
      [2, 5],
      [6, 8],
    ]),
    [
      [1, 5],
      [6, 8],
    ]
  );
});

run('Все сливаются в один: [1,4],[2,6],[5,9] → [1,9]', () => {
  assertIntervalsEqual(
    mergeIntervals([
      [1, 4],
      [2, 6],
      [5, 9],
    ]),
    [[1, 9]]
  );
});

run('Один интервал внутри другого [1,10],[2,5] → [1,10]', () => {
  assertIntervalsEqual(
    mergeIntervals([
      [1, 10],
      [2, 5],
    ]),
    [[1, 10]]
  );
});

run('Неотсортированный ввод: порядок не влияет на результат', () => {
  const intervals = [
    [8, 10],
    [2, 6],
    [15, 18],
    [1, 3],
  ];
  assertIntervalsEqual(mergeIntervals(intervals), [
    [1, 6],
    [8, 10],
    [15, 18],
  ]);
});

run('Интервал нулевой длины [1,1],[1,2] → [1,2]', () => {
  assertIntervalsEqual(
    mergeIntervals([
      [1, 1],
      [1, 2],
    ]),
    [[1, 2]]
  );
});

run('Два интервала нулевой длины в одной точке [1,1],[1,1] → [1,1]', () => {
  assertIntervalsEqual(
    mergeIntervals([
      [1, 1],
      [1, 1],
    ]),
    [[1, 1]]
  );
});

run('Начинаются с нуля [0,2],[1,4] → [0,4]', () => {
  assertIntervalsEqual(
    mergeIntervals([
      [0, 2],
      [1, 4],
    ]),
    [[0, 4]]
  );
});

run('Цепочка впритык [0,1],[1,2],[2,3] → один [0,3]', () => {
  assertIntervalsEqual(
    mergeIntervals([
      [0, 1],
      [1, 2],
      [2, 3],
    ]),
    [[0, 3]]
  );
});

run('Только один интервал из нескольких непересекающихся не трогаем', () => {
  assertIntervalsEqual(
    mergeIntervals([
      [1, 2],
      [3, 4],
      [5, 6],
    ]),
    [
      [1, 2],
      [3, 4],
      [5, 6],
    ]
  );
});
