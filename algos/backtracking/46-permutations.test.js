const { permute } = require('./46-permutations');

describe('Permutations - LeetCode 46', () => {
  test('Example 1: [1,2,3]', () => {
    const result = permute([1, 2, 3]);
    expect(result).toHaveLength(6);
    expect(result).toEqual(
      expect.arrayContaining([
        [1, 2, 3],
        [1, 3, 2],
        [2, 1, 3],
        [2, 3, 1],
        [3, 1, 2],
        [3, 2, 1],
      ])
    );
  });

  test('Example 2: [0,1]', () => {
    const result = permute([0, 1]);
    expect(result).toHaveLength(2);
    expect(result).toEqual(expect.arrayContaining([[0, 1], [1, 0]]));
  });

  test('single element', () => {
    expect(permute([1])).toEqual([[1]]);
  });

  test('two elements', () => {
    const result = permute([1, 2]);
    expect(result).toHaveLength(2);
    expect(result).toEqual(expect.arrayContaining([[1, 2], [2, 1]]));
  });
});
