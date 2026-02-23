const { maxScore } = require('./2542-maximum-subsequence-score');

describe('Maximum Subsequence Score - LeetCode 2542', () => {
  test('Example 1: nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3', () => {
    expect(maxScore([1, 3, 3, 2], [2, 1, 3, 4], 3)).toBe(12);
    // Indices 0,2,3: (1+3+2)*min(2,3,4) = 6*2 = 12
  });

  test('Example 2: nums1 = [4,2,3,1,1], nums2 = [7,5,10,9,6], k = 1', () => {
    expect(maxScore([4, 2, 3, 1, 1], [7, 5, 10, 9, 6], 1)).toBe(30);
    // Index 2: 3*10 = 30
  });

  test('n = 1, k = 1 — single element', () => {
    expect(maxScore([5], [10], 1)).toBe(50);
  });

  test('k = n — take all elements', () => {
    expect(maxScore([1, 2, 3], [4, 5, 6], 3)).toBe((1 + 2 + 3) * Math.min(4, 5, 6));
    expect(maxScore([1, 2, 3], [4, 5, 6], 3)).toBe(24);
  });

  test('k = 1 — max of nums1[i]*nums2[i]', () => {
    expect(maxScore([1, 2, 3], [10, 5, 8], 1)).toBe(24); // 1*10=10, 2*5=10, 3*8=24 → max 24
    expect(maxScore([1, 2, 3], [10, 5, 10], 1)).toBe(30);
  });

  test('two elements, k = 2', () => {
    expect(maxScore([2, 3], [4, 5], 2)).toBe((2 + 3) * Math.min(4, 5));
    expect(maxScore([2, 3], [4, 5], 2)).toBe(20);
  });

  test('all nums2 equal — score = min * sum of k largest nums1', () => {
    const nums1 = [1, 5, 3, 2, 4];
    const nums2 = [7, 7, 7, 7, 7];
    // Best: take k=3 largest from nums1: 5,4,3 → sum=12, min=7 → 84
    expect(maxScore(nums1, nums2, 3)).toBe(12 * 7);
    expect(maxScore(nums1, nums2, 3)).toBe(84);
  });

  test('nums2 has one dominant min — avoid that index if sum gets too small', () => {
    // If we fix min=1 (index 1), we need k-1 more. Best sum from others might be lower than fixing another min.
    // Example 1 already covers: indices 0,2,3 give min=2 and sum=6 → 12; including index 1 (min=1) gives sum 7 but min 1 → 7.
    expect(maxScore([1, 3, 3, 2], [2, 1, 3, 4], 3)).toBe(12);
  });

  test('minimum at end of array', () => {
    const nums1 = [10, 20, 30];
    const nums2 = [3, 2, 1]; // min is last
    // k=2: best could be indices 0,1: (10+20)*min(3,2)=30*2=60; or 0,2: 40*1=40; or 1,2: 50*1=50. So 60.
    expect(maxScore(nums1, nums2, 2)).toBe(60);
  });

  test('zeros in nums2 — including zero makes score 0', () => {
    expect(maxScore([5, 10], [0, 1], 1)).toBe(10); // 10*1 > 5*0
    expect(maxScore([5, 10], [1, 0], 2)).toBe(0); // must take both, min=0
  });

  test('zeros in nums1', () => {
    expect(maxScore([0, 1, 2], [3, 2, 1], 2)).toBe(3); // indices 1,2: (1+2)*min(2,1)=3*1=3
  });

  test('constraint boundary: n = 1, k = 1', () => {
    expect(maxScore([100000], [100000], 1)).toBe(10000000000);
  });

  test('k = 1 with multiple candidates', () => {
    expect(maxScore([1, 2, 3, 4], [4, 3, 2, 1], 1)).toBe(6); // 1*4=4, 2*3=6, 3*2=6, 4*1=4 → max 6
    expect(maxScore([5, 2], [2, 5], 1)).toBe(10);
  });
});
