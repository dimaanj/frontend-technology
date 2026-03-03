/**
 * 340. Longest Substring with At Most K Distinct Characters
 * Дана строка s и целое k. Найти длину самой длинной подстроки,
 * в которой не более k различных символов.
 * Подстрока — непрерывная последовательность символов.
 *
 * Подход: sliding window + hash table для подсчёта символов в окне.
 * Расширяем окно справа, сжимаем слева, когда число различных > k.
 *
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
function lengthOfLongestSubstringKDistinct(s, k) {
  // eceba
  // k = 2
  // res = 3
  // map, sym -> freeq

  const map = new Map();
  let l = 0;
  let r = 0;
  let res = 0;

  while (r < s.length) {
    const ch = s[r];

    map.set(ch, (map.get(ch) || 0) + 1);
    while (map.size > k) {
      const freeq = map.get(s[l]);
      if (freeq === 1) {
        map.delete(s[l]);
      } else {
        map.set(s[l], freeq - 1);
      }
      l++;
    }

    res = Math.max(res, r - l + 1);

    r++;
  }

  return res;
}

module.exports = { lengthOfLongestSubstringKDistinct };
