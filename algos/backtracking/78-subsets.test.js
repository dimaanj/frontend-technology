const { subsets } = require('./78-subsets');

const sortResult = (res) =>
  res
    .map((s) => s.slice().sort((a, b) => a - b))
    .sort((a, b) => (a.length !== b.length ? a.length - b.length : a.join().localeCompare(b.join())));

describe('Subsets - LeetCode 78', () => {
  test('Example 1: [1,2,3]', () => {
    const result = subsets([1, 2, 3]);
    expect(result).toHaveLength(8);
    expect(sortResult(result)).toEqual(
      sortResult([[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]])
    );
  });

  test('Example 2: [0]', () => {
    expect(subsets([0])).toEqual(expect.arrayContaining([[], [0]]));
    expect(subsets([0])).toHaveLength(2);
  });

  test('two elements', () => {
    const result = subsets([1, 2]);
    expect(result).toHaveLength(4);
    expect(sortResult(result)).toEqual(sortResult([[], [1], [2], [1, 2]]));
  });
});
