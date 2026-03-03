const { letterCombinations } = require('./17-letter-combinations-of-a-phone-number');

const sortResult = (arr) => [...arr].sort();

describe('Letter Combinations of a Phone Number - LeetCode 17', () => {
  test('Example 1: digits = "23"', () => {
    const result = letterCombinations('23');
    expect(sortResult(result)).toEqual(
      sortResult(['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'])
    );
    expect(result).toHaveLength(9);
  });

  test('Example 2: digits = ""', () => {
    expect(letterCombinations('')).toEqual([]);
  });

  test('Example 3: digits = "2"', () => {
    expect(letterCombinations('2')).toEqual(['a', 'b', 'c']);
  });

  test('single digit 9', () => {
    expect(letterCombinations('9')).toEqual(['w', 'x', 'y', 'z']);
  });
});
