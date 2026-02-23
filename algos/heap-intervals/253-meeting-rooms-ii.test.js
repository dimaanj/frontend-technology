const { minMeetingRooms } = require('./253-meeting-rooms-ii');

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

run('Пример из условия: [[0,30],[5,10],[15,20]] → 2', () => {
  const intervals = [
    [0, 30],
    [5, 10],
    [15, 20],
  ];
  assertEqual(minMeetingRooms(intervals), 2);
});

// --- краевые случаи ---

run('Пустой массив → 0', () => {
  assertEqual(minMeetingRooms([]), 0);
});

run('Одно совещание → 1', () => {
  assertEqual(minMeetingRooms([[1, 5]]), 1);
});

run('Два непересекающихся: [0,5],[5,10] → 1', () => {
  assertEqual(
    minMeetingRooms([
      [0, 5],
      [5, 10],
    ]),
    1
  );
});

run('Два непересекающихся в другом порядке: [7,10],[0,5] → 1', () => {
  assertEqual(
    minMeetingRooms([
      [7, 10],
      [0, 5],
    ]),
    1
  );
});

run('Два пересекающихся → 2', () => {
  assertEqual(
    minMeetingRooms([
      [0, 10],
      [5, 15],
    ]),
    2
  );
});

run('Три совещания, пик 2 комнаты', () => {
  // [0,30], [5,10], [15,20] — уже в примере
  assertEqual(
    minMeetingRooms([
      [0, 30],
      [5, 10],
      [15, 20],
    ]),
    2
  );
});

run('Три полностью пересекающихся → 3', () => {
  assertEqual(
    minMeetingRooms([
      [0, 10],
      [2, 8],
      [4, 6],
    ]),
    3
  );
});

run('Цепочка: каждое следующее начинается когда предыдущее кончилось → 1', () => {
  assertEqual(
    minMeetingRooms([
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ]),
    1
  );
});

run('Все в одной точке старта (разные концы) → количество интервалов', () => {
  assertEqual(
    minMeetingRooms([
      [0, 1],
      [0, 2],
      [0, 3],
    ]),
    3
  );
});

run('Неотсортированный ввод: ответ не зависит от порядка', () => {
  const intervals = [
    [15, 20],
    [5, 10],
    [0, 30],
  ];
  assertEqual(minMeetingRooms(intervals), 2);
});

run('Один интервал с нулевой длительностью [1,1] → 1', () => {
  assertEqual(minMeetingRooms([[1, 1]]), 1);
});

run('Два интервала с нулевой длительностью в одну точку [1,1],[1,1] → 2', () => {
  assertEqual(
    minMeetingRooms([
      [1, 1],
      [1, 1],
    ]),
    2
  );
});

run('Пик 3 комнаты: три пересекающихся блока', () => {
  assertEqual(
    minMeetingRooms([
      [0, 10],
      [5, 15],
      [10, 20],
    ]),
    3
  );
});

run('Два интервала ровно впритык [0,5],[5,10] → 1', () => {
  assertEqual(
    minMeetingRooms([
      [0, 5],
      [5, 10],
    ]),
    1
  );
});
