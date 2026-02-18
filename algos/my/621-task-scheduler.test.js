const { leastInterval } = require('./621-task-scheduler');

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, got ${actual}`);
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

run('Пример 1: ["A","A","A","B","B","B"], n=2 → 8', () => {
  const tasks = ['A', 'A', 'A', 'B', 'B', 'B'];
  assertEqual(leastInterval(tasks, 2), 8);
});

run('Пример 2: ["A","A","A","B","B","B"], n=0 → 6', () => {
  const tasks = ['A', 'A', 'A', 'B', 'B', 'B'];
  assertEqual(leastInterval(tasks, 0), 6);
});

run('Пример 3: много A и B,C,D,E,F,G, n=2 → 16', () => {
  const tasks = ['A', 'A', 'A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
  assertEqual(leastInterval(tasks, 2), 16);
});

// --- краевые случаи ---

run('Один тип задач, n=2 → (3 задачи = 3 + 2*2 = 7 слотов?)', () => {
  const tasks = ['A', 'A', 'A'];
  // A -> idle -> idle -> A -> idle -> idle -> A = 7
  assertEqual(leastInterval(tasks, 2), 7);
});

run('Одна задача → 1', () => {
  assertEqual(leastInterval(['A'], 0), 1);
  assertEqual(leastInterval(['A'], 5), 1);
});

run('Пустой массив → 0', () => {
  assertEqual(leastInterval([], 2), 0);
});

run('Все задачи разные, n=1 → длина массива', () => {
  const tasks = ['A', 'B', 'C', 'D'];
  assertEqual(leastInterval(tasks, 1), 4);
  assertEqual(leastInterval(tasks, 0), 4);
});

run('Два типа, по две задачи, n=2', () => {
  const tasks = ['A', 'A', 'B', 'B'];
  // A B idle A B = 5
  assertEqual(leastInterval(tasks, 2), 5);
});
