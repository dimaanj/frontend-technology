const { totalCost } = require('./2462-total-cost-to-hire-k-workers');

describe('Total Cost to Hire K Workers - LeetCode 2462', () => {
  test('Example 1: costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4', () => {
    expect(totalCost([17, 12, 10, 2, 7, 2, 11, 20, 8], 3, 4)).toBe(11);
    // Round 1: min from first 4 [17,12,10,2] or last 4 [2,11,20,8] → 2, smallest index 3 → cost 2
    // Round 2: [17,12,10,7,2,11,20,8] → min 2 at index 4 → cost 4
    // Round 3: [17,12,10,7,11,20,8] → min 7 at index 3 → cost 11
  });

  test('Example 1 tie-break: same cost 2 in both windows — must take from left (smaller index)', () => {
    const costs = [17, 12, 10, 2, 7, 2, 11, 20, 8];
    expect(totalCost(costs, 3, 4)).toBe(11);
    // Both first 4 and last 4 have cost 2. Index 3 (left) < index 5 (right) → take left first. Then right 2, then 7.
  });

  test('Example 2: costs = [1,2,4,1], k = 3, candidates = 3', () => {
    expect(totalCost([1, 2, 4, 1], 3, 3)).toBe(4);
    // Round 1: first/last 3 overlap → min 1, index 0 → cost 1
    // Round 2: [2,4,1] → min 1, index 2 → cost 2
    // Round 3: [2,4] → fewer than 3 candidates → min 2 → cost 4
  });

  test('k = 1 — hire one worker', () => {
    expect(totalCost([5, 3, 1, 2], 1, 2)).toBe(1);
    // First 2: [5,3], last 2: [1,2] → min 1
  });

  test('k = 1, minimum in last window', () => {
    expect(totalCost([2, 7, 7, 1, 2], 1, 2)).toBe(1);
    // First 2: [2,7] min 2; last 2: [1,2] min 1 → choose 1 (index 3)
  });

  test('k = 1, tie-break by smallest index (same cost in both windows)', () => {
    // costs = [3,2,7,7,1,2], candidates = 2. First 2: [3,2] min 2 index 1. Last 2: [1,2] min 1 index 4. Choose 1.
    expect(totalCost([3, 2, 7, 7, 1, 2], 1, 2)).toBe(1);
  });

  test('hire all workers: k = n', () => {
    expect(totalCost([1, 2, 3], 3, 1)).toBe(1 + 2 + 3);
    // Each round: pick min from first 1 and last 1. Round 1: [1] vs [3] → 1. Round 2: [2] vs [3] → 2. Round 3: [2] only → 2? No, after round 2 we have [3] only. So round 3: one candidate, pick 3. Total 6.
  });

  test('candidates = 1 — only first and last element compete', () => {
    expect(totalCost([4, 1, 3, 2], 2, 1)).toBe(5);
    // Round 1: first 1: [4], last 1: [2] → min 2 (index 3). Cost 2.
    // Round 2: [4,1,3] → first 1: [4], last 1: [3] → min 3 (index 2). Total 2+3=5.
  });

  test('single worker: n = 1, k = 1', () => {
    expect(totalCost([10], 1, 1)).toBe(10);
  });

  test('two workers, k = 2, candidates = 2', () => {
    expect(totalCost([5, 3], 2, 2)).toBe(8);
    // First/last 2 both = [5,3]. Min 3, smallest index 1. Then [5]. Total 3+5=8.
  });

  test('all same cost — tie-break by index', () => {
    expect(totalCost([7, 7, 7, 7], 2, 2)).toBe(14);
    // First 2: indices 0,1; last 2: indices 2,3. Min cost 7, smallest index 0. Then from [7,7,7]: first 2 indices 1,2; last 2 indices 2,3. Min 7, index 1. Total 7+7=14.
  });

  test('fewer than candidates remaining — choose among all', () => {
    // Example 2 already has this: after 2 hires we have [2,4], candidates=3, so we choose from all. Min 2.
    expect(totalCost([1, 2, 4, 1], 3, 3)).toBe(4);
  });

  test('first window has minimum', () => {
    expect(totalCost([1, 5, 6, 7, 8, 9], 1, 2)).toBe(1);
    // First 2: [1,5], last 2: [8,9] → min 1
  });

  test('last window has minimum', () => {
    expect(totalCost([9, 8, 7, 6, 5, 1], 1, 2)).toBe(1);
    // First 2: [9,8], last 2: [5,1] → min 1
  });

  test('overlap: candidates so large that first and last overlap', () => {
    // [1,2,4,1], candidates=3 → first 3 = [1,2,4], last 3 = [2,4,1]. Both include index 1,2. Min cost 1, indices 0 and 3 → smallest index 0.
    expect(totalCost([1, 2, 4, 1], 1, 3)).toBe(1);
    expect(totalCost([1, 2, 4, 1], 3, 3)).toBe(4);
  });

  test('constraint boundary: n = 1, k = 1, candidates = 1', () => {
    expect(totalCost([1], 1, 1)).toBe(1);
  });

  test('problem example tie-break: [3,2,7,7,1,2], candidates=2', () => {
    // First round: first 2 [3,2] min 2 index 1; last 2 [1,2] min 1 index 4. Choose 1 (index 4). Cost 1.
    // Second round: [3,2,7,7,2] — first 2 [3,2] min 2 index 1; last 2 [7,2] min 2 index 5. Tie: smallest index 1. Cost 1+2=3.
    expect(totalCost([3, 2, 7, 7, 1, 2], 2, 2)).toBe(3);
  });

  test('large case: n=225, k=222, candidates=2 (overlap of windows during hiring)', () => {
    const costs = [
      211, 169, 4359, 2335, 3956, 658, 1371, 1516, 4637, 2588, 4166, 250, 4866, 3122, 1197, 61, 292, 1616, 4857, 4067, 1428, 4912, 3071, 3108, 2221, 1932, 4183, 4101, 727, 2715, 64, 357, 1186, 2444, 3766, 3978, 1962, 1648, 871, 2961, 1164, 4792, 1528, 2064, 2653, 179, 2780, 3732, 2881, 1165, 623, 362, 2371, 1353, 4219, 4438, 3765, 4567, 1372, 4669, 1496, 3353, 4147, 33, 4378, 4634, 1331, 3014, 3723, 3271, 433, 1065, 2345, 4445, 4077, 2708, 1303, 2666, 3311, 1546, 3078, 4467, 1683, 414, 4282, 3510, 478, 2858, 4805, 1113, 783, 3999, 2685, 1025, 3111, 2394, 2985, 2693, 1068, 1806, 690, 4867, 4178, 1726, 1680, 1860, 155, 96, 1500, 4250, 286, 4145, 771, 1728, 2677, 353, 1163, 4876, 2066, 3910, 2578, 1298, 3321, 3236, 1152, 3140, 2294, 2200, 69, 3027, 3675, 3594, 74, 3575, 2279, 4874, 1071, 3085, 1786, 4596, 1584, 42, 411, 3962, 2704, 4411, 1926, 1300, 4533, 2119, 3924, 1034, 128, 911, 4717, 4767, 1669, 3669, 2936, 2099, 3395, 2487, 2539, 4722, 122, 642, 4680, 4813, 708, 4938, 4156, 1152, 2789, 699, 4724, 4159, 1766, 2662, 492, 2612, 330, 2010, 458, 161, 794, 2062, 4281, 717, 3486, 3331, 474, 4734, 1869, 4817, 2796, 1511, 146, 3857, 3471, 3674, 45, 519, 3035, 3830, 4566, 957, 4705, 3194, 1524, 2668, 903, 2833, 2118, 929, 266, 1177, 3297, 1681, 400, 2635, 1962, 1682, 2116, 603, 1521,
    ];
    expect(totalCost(costs, 222, 2)).toBe(523545);
  });
});
