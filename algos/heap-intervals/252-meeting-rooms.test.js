const { canAttendMeetings } = require('./252-meeting-rooms');

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

run('Пример из условия: [0,30] и [5,10] пересекаются → false', () => {
  const intervals = [
    [0, 30],
    [5, 10],
  ];
  assertEqual(canAttendMeetings(intervals), false);
});

run('Пример из условия: [0,30] и [35,50] не пересекаются → true', () => {
  const intervals = [
    [0, 30],
    [35, 50],
  ];
  assertEqual(canAttendMeetings(intervals), true);
});

// --- краевые случаи ---

run('Пустой массив → true', () => {
  assertEqual(canAttendMeetings([]), true);
});

run('Одно совещание → true', () => {
  assertEqual(canAttendMeetings([[1, 5]]), true);
});

run('Два впритык [0,10],[10,20] — не пересекаются → true', () => {
  assertEqual(
    canAttendMeetings([
      [0, 10],
      [10, 20],
    ]),
    true
  );
});

run('Два пересекающихся [0,10],[5,15] → false', () => {
  assertEqual(
    canAttendMeetings([
      [0, 10],
      [5, 15],
    ]),
    false
  );
});

run('Один интервал внутри другого [0,30],[5,10] → false', () => {
  assertEqual(
    canAttendMeetings([
      [0, 30],
      [5, 10],
    ]),
    false
  );
});

run('Три совещания без пересечений → true', () => {
  assertEqual(
    canAttendMeetings([
      [0, 5],
      [5, 10],
      [10, 15],
    ]),
    true
  );
});

run('Три совещания с пересечением → false', () => {
  assertEqual(
    canAttendMeetings([
      [0, 30],
      [5, 10],
      [15, 20],
    ]),
    false
  );
});

run('Неотсортированный ввод: порядок не должен влиять на результат', () => {
  const intervals = [
    [35, 50],
    [0, 30],
  ];
  assertEqual(canAttendMeetings(intervals), true);
});

run('Неотсортированный с пересечением → false', () => {
  const intervals = [
    [5, 10],
    [0, 30],
  ];
  assertEqual(canAttendMeetings(intervals), false);
});

run('Интервал нулевой длины [1,1] → true', () => {
  assertEqual(canAttendMeetings([[1, 1]]), true);
});

run('Два интервала нулевой длины в одной точке [1,1],[1,1] — не пересекаются (конец 1, старт 1) → true', () => {
  assertEqual(
    canAttendMeetings([
      [1, 1],
      [1, 1],
    ]),
    true
  );
});

run('Два интервала нулевой длины в разных точках [0,0],[1,1] → true', () => {
  assertEqual(
    canAttendMeetings([
      [0, 0],
      [1, 1],
    ]),
    true
  );
});

run('Много непересекающихся интервалов в разном порядке → true', () => {
  const intervals = [
    [20, 25],
    [0, 5],
    [10, 15],
    [5, 10],
    [15, 20],
  ];
  assertEqual(canAttendMeetings(intervals), true);
});

run('Первое и последнее пересекаются при нескольких интервалах → false', () => {
  const intervals = [
    [0, 10],
    [5, 8],
    [15, 20],
  ];
  assertEqual(canAttendMeetings(intervals), false);
});
