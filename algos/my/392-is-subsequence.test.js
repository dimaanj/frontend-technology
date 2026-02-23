const { isSubsequence } = require('./392-is-subsequence');

describe('Is Subsequence - LeetCode 392', () => {
  test('Example 1: s = "abc", t = "ahbgdc" → true', () => {
    expect(isSubsequence('abc', 'ahbgdc')).toBe(true);
  });

  test('Example 2: s = "axc", t = "ahbgdc" → false', () => {
    expect(isSubsequence('axc', 'ahbgdc')).toBe(false);
  });

  test('empty s is subsequence of any t', () => {
    expect(isSubsequence('', '')).toBe(true);
    expect(isSubsequence('', 'abc')).toBe(true);
  });

  test('single char s, present in t', () => {
    expect(isSubsequence('a', 'a')).toBe(true);
    expect(isSubsequence('a', 'xyzabc')).toBe(true);
  });

  test('single char s, not in t', () => {
    expect(isSubsequence('a', 'xyz')).toBe(false);
  });

  test('s longer than t → false', () => {
    expect(isSubsequence('ab', 'a')).toBe(false);
  });

  test('s equals t → true', () => {
    expect(isSubsequence('abc', 'abc')).toBe(true);
  });

  test('subsequence must preserve order: s = "ace", t = "abcde" → true', () => {
    expect(isSubsequence('ace', 'abcde')).toBe(true);
  });

  test('wrong order: "aec" not subsequence of "abcde"', () => {
    expect(isSubsequence('aec', 'abcde')).toBe(false);
  });

  test('repeated chars in t: s = "aaa", t = "aaab" → true', () => {
    expect(isSubsequence('aaa', 'aaab')).toBe(true);
  });

  test('repeated chars: s = "abc", t = "abbc" → true', () => {
    expect(isSubsequence('abc', 'abbc')).toBe(true);
  });

  test('all of t needed: s = "abc", t = "ac" → false (missing b)', () => {
    expect(isSubsequence('abc', 'ac')).toBe(false);
  });

  test('empty t, non-empty s → false', () => {
    expect(isSubsequence('a', '')).toBe(false);
  });
});
