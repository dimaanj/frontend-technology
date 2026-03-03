const { combinationSum3 } = require('./216-combination-sum-iii');

const sortResult = (res) =>
  res
    .map((arr) => arr.slice().sort((a, b) => a - b))
    .sort((a, b) => a.join().localeCompare(b.join()));

describe('Combination Sum III - LeetCode 216', () => {
  test('Example 1: k=3, n=7', () => {
    const result = combinationSum3(3, 7);
    expect(sortResult(result)).toEqual(sortResult([[1, 2, 4]]));
  });

  test('Example 2: k=3, n=9', () => {
    const result = combinationSum3(3, 9);
    expect(sortResult(result)).toEqual(
      sortResult([
        [1, 2, 6],
        [1, 3, 5],
        [2, 3, 4],
      ])
    );
  });

  test('Example 3: k=4, n=1', () => {
    expect(combinationSum3(4, 1)).toEqual([]);
  });

  test('k=2, n=5', () => {
    const result = combinationSum3(2, 5);
    expect(sortResult(result)).toEqual(sortResult([[1, 4], [2, 3]]));
  });
});
