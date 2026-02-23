const { backspaceCompare } = require('./844-backspace-string-compare');

describe('Backspace String Compare - LeetCode 844', () => {
  test('Example 1: s = "ab#c", t = "ad#c" → true (both become "ac")', () => {
    expect(backspaceCompare('ab#c', 'ad#c')).toBe(true);
  });

  test('Example 2: s = "ab##", t = "c#d#" → true (both become "")', () => {
    expect(backspaceCompare('ab##', 'c#d#')).toBe(true);
  });

  test('Example 3: s = "a#c", t = "b" → false', () => {
    expect(backspaceCompare('a#c', 'b')).toBe(false);
  });

  test('both empty strings', () => {
    expect(backspaceCompare('', '')).toBe(true);
  });

  test('one empty, other becomes empty after backspaces', () => {
    expect(backspaceCompare('###', '##')).toBe(true);
  });

  test('same string, no backspaces', () => {
    expect(backspaceCompare('abc', 'abc')).toBe(true);
  });

  test('different strings, no backspaces', () => {
    expect(backspaceCompare('abc', 'abd')).toBe(false);
  });

  test('s has extra char at end', () => {
    expect(backspaceCompare('ac', 'a')).toBe(false);
  });

  test('t has extra char at end', () => {
    expect(backspaceCompare('a', 'ac')).toBe(false);
  });

  test('backspace on empty text stays empty', () => {
    expect(backspaceCompare('#', '#')).toBe(true);
    expect(backspaceCompare('#a#', '#')).toBe(true);
  });

  test('many backspaces then same char', () => {
    expect(backspaceCompare('aaa###', 'a#a#a#')).toBe(true); // both → ""
    expect(backspaceCompare('aa#a###c', 'c')).toBe(true);   // s → "c", t → "c"
  });
});
