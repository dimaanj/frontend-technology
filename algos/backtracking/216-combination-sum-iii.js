/**
 * 216. Combination Sum III
 * Find all valid combinations of k numbers that sum up to n such that:
 * - Only numbers 1 through 9 are used.
 * - Each number is used at most once.
 * Return a list of all possible valid combinations. The list must not contain
 * the same combination twice, and the combinations may be returned in any order.
 *
 * @param {number} k - number of numbers in each combination
 * @param {number} n - target sum
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  const res = [];

  function backtrack(start, acc, path_sum) {
    if (acc.length === k) {
      if (path_sum === n) {
        res.push([...acc]);
      }
      return;
    }

    if (path_sum > n) {
      return;
    }

    for (let i = start; i <= 9; i++) {
      acc.push(i);

      backtrack(i + 1, acc, path_sum + i);

      acc.pop();
    }
  }

  backtrack(1, [], 0);

  return res;
};

module.exports = { combinationSum3 };
