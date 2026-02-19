const { insertInterval } = require('./57-insert-interval');

function assertIntervalsEqual(actual, expected, message) {
  if (actual.length !== expected.length) {
    throw new Error(
      message ||
        `Expected ${expected.length} intervals, got ${actual.length}. Expected: ${JSON.stringify(expected)}, got: ${JSON.stringify(actual)}`
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

run('Пример 1: [[1,3],[6,9]], [2,5] → [[1,5],[6,9]]', () => {
  const intervals = [
    [1, 3],
    [6, 9],
  ];
  const newInterval = [2, 5];
  assertIntervalsEqual(insertInterval(intervals, newInterval), [
    [1, 5],
    [6, 9],
  ]);
});

run('Пример 2: [[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8] → [[1,2],[3,10],[12,16]]', () => {
  const intervals = [
    [1, 2],
    [3, 5],
    [6, 7],
    [8, 10],
    [12, 16],
  ];
  const newInterval = [4, 8];
  assertIntervalsEqual(insertInterval(intervals, newInterval), [
    [1, 2],
    [3, 10],
    [12, 16],
  ]);
});

// --- краевые случаи ---

run('Пустой массив intervals, newInterval [1,2] → [[1,2]]', () => {
  assertIntervalsEqual(insertInterval([], [1, 2]), [[1, 2]]);
});

run('Один интервал, новый перекрывается: [[1,5]], [2,3] → [[1,5]]', () => {
  assertIntervalsEqual(insertInterval([[1, 5]], [2, 3]), [[1, 5]]);
});

run('Один интервал, новый до: [[3,5]], [1,2] → [[1,2],[3,5]]', () => {
  assertIntervalsEqual(insertInterval([[3, 5]], [1, 2]), [
    [1, 2],
    [3, 5],
  ]);
});

run('Один интервал, новый после: [[1,2]], [3,5] → [[1,2],[3,5]]', () => {
  assertIntervalsEqual(insertInterval([[1, 2]], [3, 5]), [
    [1, 2],
    [3, 5],
  ]);
});

run('Вставка без пересечения между двумя: [[1,2],[6,9]], [3,5] → [[1,2],[3,5],[6,9]]', () => {
  assertIntervalsEqual(
    insertInterval(
      [
        [1, 2],
        [6, 9],
      ],
      [3, 5]
    ),
    [
      [1, 2],
      [3, 5],
      [6, 9],
    ]
  );
});

run('Новый в начале без пересечения: [[2,5],[6,9]], [0,1] → [[0,1],[2,5],[6,9]]', () => {
  assertIntervalsEqual(
    insertInterval(
      [
        [2, 5],
        [6, 9],
      ],
      [0, 1]
    ),
    [
      [0, 1],
      [2, 5],
      [6, 9],
    ]
  );
});

run('Новый в конце без пересечения: [[1,3],[6,8]], [9,10] → [[1,3],[6,8],[9,10]]', () => {
  assertIntervalsEqual(
    insertInterval(
      [
        [1, 3],
        [6, 8],
      ],
      [9, 10]
    ),
    [
      [1, 3],
      [6, 8],
      [9, 10],
    ]
  );
});

run('Новый перекрывает несколько подряд: [[1,2],[3,5],[6,7],[8,10]], [4,8] → [[1,2],[3,10]]', () => {
  assertIntervalsEqual(
    insertInterval(
      [
        [1, 2],
        [3, 5],
        [6, 7],
        [8, 10],
      ],
      [4, 8]
    ),
    [
      [1, 2],
      [3, 10],
    ]
  );
});

run('Новый покрывает все: [[1,2],[3,4]], [0,5] → [[0,5]]', () => {
  assertIntervalsEqual(
    insertInterval(
      [
        [1, 2],
        [3, 4],
      ],
      [0, 5]
    ),
    [[0, 5]]
  );
});

run('Впритык слева: [[2,5],[6,9]], [1,2] → [[1,5],[6,9]]', () => {
  assertIntervalsEqual(
    insertInterval(
      [
        [2, 5],
        [6, 9],
      ],
      [1, 2]
    ),
    [
      [1, 5],
      [6, 9],
    ]
  );
});

run('Впритык справа: [[1,3],[6,9]], [9,10] → [[1,3],[6,10]]', () => {
  assertIntervalsEqual(
    insertInterval(
      [
        [1, 3],
        [6, 9],
      ],
      [9, 10]
    ),
    [
      [1, 3],
      [6, 10],
    ]
  );
});

run('Точка (start === end): [[1,3],[6,9]], [5,5] → [[1,3],[5,5],[6,9]]', () => {
  assertIntervalsEqual(
    insertInterval(
      [
        [1, 3],
        [6, 9],
      ],
      [5, 5]
    ),
    [
      [1, 3],
      [5, 5],
      [6, 9],
    ]
  );
});

run('Пустой intervals + точка: [], [1,1] → [[1,1]]', () => {
  assertIntervalsEqual(insertInterval([], [1, 1]), [[1, 1]]);
});

run('Один интервал, новый расширяет влево: [[3,5]], [1,3] → [[1,5]]', () => {
  assertIntervalsEqual(insertInterval([[3, 5]], [1, 3]), [[1, 5]]);
});

run('Один интервал, новый расширяет вправо: [[1,3]], [3,5] → [[1,5]]', () => {
  assertIntervalsEqual(insertInterval([[1, 3]], [3, 5]), [[1, 5]]);
});

run('Границы 0 и большие: [[0,1],[10,15]], [2,9] → [[0,1],[2,9],[10,15]]', () => {
  assertIntervalsEqual(
    insertInterval(
      [
        [0, 1],
        [10, 15],
      ],
      [2, 9]
    ),
    [
      [0, 1],
      [2, 9],
      [10, 15],
    ]
  );
});
