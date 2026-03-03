/**
 * 78. Subsets
 * Дан массив целочисленных уникальных значений nums, вернуть все возможные подмножества.
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const res = [];

  function backtrack(acc, start) {
    if (start > nums.length) {
      return;
    }

    res.push([...acc]);

    for (let i = start; i < nums.length; i++) {
      acc.push(nums[i]);

      backtrack(acc, i + 1);

      acc.pop();
    }
  }

  backtrack([], 0);

  return res;
};

module.exports = { subsets };
