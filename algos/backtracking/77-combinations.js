/**
 * LeetCode 77. Combinations
 * Даны два целых числа n и k.
 * Вернуть все возможные сочетания из k чисел, выбранных из диапазона [1..n].
 *
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
function combine(n, k) {
  const res = [];

  function backtrack(acc, start) {
    if (acc.length === k) {
      res.push([...acc]);
      return;
    }

    for (let i = start; i < n + 1; i++) {
      acc.push(i);

      backtrack(acc, i + 1);

      acc.pop();
    }
  }

  backtrack([], 1);

  return res;
}

module.exports = { combine };
