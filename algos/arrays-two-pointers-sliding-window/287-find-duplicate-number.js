/**
 * 287. Find the Duplicate Number
 * Массив nums длины n + 1, числа от 1 до n, ровно одно повторяется.
 * O(1) доп. памяти, массив не менять.
 * Граф: из индекса i ребро в nums[i]. Вход в цикл = дубликат.
 *
 * @param {number[]} nums
 * @return {number}
 */
function findDuplicate(nums) {
  let slow = 0;
  let fast = 0;

  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  fast = 0;
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;
}

module.exports = { findDuplicate };
