const {
  numMatchingSubseq,
  numMatchingSubseqBinary,
} = require('./792-number-of-matching-subsequences');

const testCases = [
  ['Example 1: s = "abcde", words = ["a","bb","acd","ace"] → 3', 'abcde', ['a', 'bb', 'acd', 'ace'], 3],
  ['Example 2: s = "dsahjpjauf", words = [...] → 2', 'dsahjpjauf', ['ahjpjau', 'ja', 'ahbwzgqnuk', 'tnmlanowax'], 2],
  ['empty words → 0', 'abc', [], 0],
  ['single word that is subsequence → 1', 'abcde', ['ace'], 1],
  ['single word that is not subsequence → 0', 'abcde', ['aec'], 0],
  ['all words are subsequences', 'abcde', ['a', 'ab', 'ace', 'ae', 'e'], 5],
  ['no word is subsequence', 'abc', ['d', 'dc', 'xyz', 'cb'], 0],
  ['duplicate words count each occurrence', 'abcde', ['a', 'a', 'ace', 'ace'], 4],
  ['word longer than s cannot be subsequence', 'ab', ['abc', 'abcd'], 0],
  ['single char s: matching single-char words', 'a', ['a', 'b', 'a'], 2],
  ['s = "aaa", words with repeated a', 'aaa', ['a', 'aa', 'aaa', 'b'], 3],
  ['order matters: "bb" not subsequence of "abcde"', 'abcde', ['bb'], 0],
];

describe('Number of Matching Subsequences - LeetCode 792 (bucket)', () => {
  testCases.forEach(([name, s, words, expected]) => {
    test(name, () => {
      expect(numMatchingSubseq(s, words)).toBe(expected);
    });
  });
});

describe('Number of Matching Subsequences - LeetCode 792 (binary search)', () => {
  testCases.forEach(([name, s, words, expected]) => {
    test(name, () => {
      expect(numMatchingSubseqBinary(s, words)).toBe(expected);
    });
  });
});
