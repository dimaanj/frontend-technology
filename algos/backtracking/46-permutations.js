/**
 * LeetCode 46. Permutations
 * Все перестановки массива из различных чисел.
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {
  const res = [];

  function deepP(depth) {
    if(depth === nums.length) {
      res.push([...nums]);
      return;
    }

    for(let i = depth; i < nums.length; i++) {
      [nums[depth], nums[i]] = [nums[i], nums[depth]];

      deepP(depth + 1);

      [nums[i], nums[depth]] = [nums[depth], nums[i]];
    }
  }

  deepP(0);

  return res;
}


function permute1(nums) {
  if(nums.length === 1) {
    return [[...nums]];
  }

  const result = [];

  for(let i = 0; i < nums.length; i++) {
    const n = nums[i];
    const rest = [...nums.slice(0, i), ...nums.slice(i + 1)];

    const perms = permute(rest);

    for(const perm of perms) {
      result.push([n, ...perm]);
    }
  }
  
  return result;
}

module.exports = { permute };

// 1,2,3
// 