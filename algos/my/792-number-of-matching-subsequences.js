/**
 * Number of Matching Subsequences - LeetCode 792
 *
 * Given a string s and an array of strings words, return the number of
 * words[i] that is a subsequence of s.
 *
 * A subsequence: new string from original with some (or no) chars deleted
 * without changing the relative order. E.g. "ace" is a subsequence of "abcde".
 *
 * @param {string} s
 * @param {string[]} words
 * @return {number}
 */
function numMatchingSubseq(s, words) {

  // symbol -> List<[word, index]>
  // a -> [[aabb, 0], [aacc, 0], ...]

  const symMap = new Map();
  for (const word of words) {
    const ch = word[0];

    const current = symMap.get(ch) || [];
    current.push([word, 0]);
    symMap.set(ch, current);
  }

  let counter = 0;

  // O(n*w)

  for (const ch of s) {
    const words = symMap.get(ch);
    symMap.delete(ch);

    if (!words) continue;

    for (const word of words) {
      const [w, index] = word;
      const newIndex = index + 1;
      if (newIndex === w.length) {
        counter++;
      } else {
        const newWords = symMap.get(w[newIndex]) || [];
        newWords.push([w, newIndex]);
        symMap.set(w[newIndex], newWords);
      }
    }
  }

  return counter;
}

/**
 * Решение с бинарным поиском: O(|s| + W * max|word| * log|s|).
 * Для каждой буквы предподсчитываем отсортированный список индексов в s.
 * Для каждого слова для каждой буквы ищем минимальный индекс в s строго больше текущей позиции.
 */
function numMatchingSubseqBinary(s, words) {
  const indices = new Map();
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (!indices.has(c)) indices.set(c, []);
    indices.get(c).push(i);
  }

  function firstGreater(arr, pos) {
    let lo = 0;
    let hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid] <= pos) lo = mid + 1;
      else hi = mid;
    }
    return lo < arr.length ? arr[lo] : -1;
  }

  let count = 0;
  for (const word of words) {
    let pos = -1;
    let ok = true;
    for (const c of word) {
      const arr = indices.get(c);
      if (!arr || arr.length === 0) {
        ok = false;
        break;
      }
      const nextPos = firstGreater(arr, pos);
      if (nextPos === -1) {
        ok = false;
        break;
      }
      pos = nextPos;
    }
    if (ok) count++;
  }
  return count;
}

module.exports = { numMatchingSubseq, numMatchingSubseqBinary };
