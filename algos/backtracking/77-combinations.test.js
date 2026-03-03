const { combine } = require('./77-combinations');

const sortResult = (res) =>
  res
    .map((c) => c.slice().sort((a, b) => a - b))
    .sort((a, b) => (a.length !== b.length ? a.length - b.length : a.join().localeCompare(b.join())));

describe('Combinations - LeetCode 77', () => {
  test('Example 1: n = 4, k = 2', () => {
    const result = combine(4, 2);
    expect(result).toHaveLength(6);
    expect(sortResult(result)).toEqual(
      sortResult([
        [1, 2],
        [1, 3],
        [1, 4],
        [2, 3],
        [2, 4],
        [3, 4],
      ])
    );
  });

  test('Example 2: n = 1, k = 1', () => {
    expect(combine(1, 1)).toEqual([[1]]);
  });

  test('k = 0 (одно пустое сочетание)', () => {
    expect(combine(3, 0)).toEqual([[]]);
  });

  test('k > n (нет сочетаний)', () => {
    expect(combine(2, 3)).toEqual([]);
  });
});

