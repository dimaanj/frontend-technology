const {
  lengthOfLongestSubstringKDistinct,
} = require('./340-longest-substring-with-at-most-k-distinct-characters');

describe('Longest Substring with At Most K Distinct Characters - LeetCode 340', () => {
  test('Example 1: s = "eceba", k = 2 → 3 ("ece")', () => {
    expect(lengthOfLongestSubstringKDistinct('eceba', 2)).toBe(3);
  });

  test('Example 2: s = "aa", k = 1 → 2', () => {
    expect(lengthOfLongestSubstringKDistinct('aa', 1)).toBe(2);
  });

  test('empty string → 0', () => {
    expect(lengthOfLongestSubstringKDistinct('', 1)).toBe(0);
  });

  test('k = 0 → 0', () => {
    expect(lengthOfLongestSubstringKDistinct('aabac', 0)).toBe(0);
  });

  test('single character → 1', () => {
    expect(lengthOfLongestSubstringKDistinct('a', 1)).toBe(1);
  });

  test('all same char, k = 1: "aaaa" → 4', () => {
    expect(lengthOfLongestSubstringKDistinct('aaaa', 1)).toBe(4);
  });

  test('k >= distinct: whole string, "abc" k=3 → 3', () => {
    expect(lengthOfLongestSubstringKDistinct('abc', 3)).toBe(3);
  });

  test('longer: "aabbcc", k = 1 → 2', () => {
    expect(lengthOfLongestSubstringKDistinct('aabbcc', 1)).toBe(2);
  });

  test('longer: "aabbcc", k = 2 → 4', () => {
    expect(lengthOfLongestSubstringKDistinct('aabbcc', 2)).toBe(4);
  });
});
