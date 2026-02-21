const { kSmallestPairs } = require('./373-find-k-pairs-with-smallest-sums');

function expectPairsEqual(actual, expected) {
  expect(actual.length).toBe(expected.length);
  for (let i = 0; i < expected.length; i++) {
    expect(actual[i][0]).toBe(expected[i][0]);
    expect(actual[i][1]).toBe(expected[i][1]);
  }
}

describe('Find K Pairs with Smallest Sums - LeetCode 373', () => {
  test('Example 1: nums1 = [1,7,11], nums2 = [2,4,6], k = 3', () => {
    const out = kSmallestPairs([1, 7, 11], [2, 4, 6], 3);
    expectPairsEqual(out, [[1, 2], [1, 4], [1, 6]]);
  });

  test('Example 2: nums1 = [1,1,2], nums2 = [1,2,3], k = 2', () => {
    const out = kSmallestPairs([1, 1, 2], [1, 2, 3], 2);
    expectPairsEqual(out, [[1, 1], [1, 1]]);
  });

  test('k = 1 — one pair with smallest sum', () => {
    expectPairsEqual(kSmallestPairs([1, 2, 3], [4, 5, 6], 1), [[1, 4]]);
  });

  test('k = 1, minimum sum from middle elements', () => {
    expectPairsEqual(kSmallestPairs([1, 2, 10], [1, 2, 10], 1), [[1, 1]]);
  });

  test('k equals total pairs — return all', () => {
    const nums1 = [1, 2];
    const nums2 = [3, 4];
    const out = kSmallestPairs(nums1, nums2, 4);
    expect(out.length).toBe(4);
    const sums = out.map(([u, v]) => u + v);
    expect(sums).toEqual([4, 5, 5, 6]); // [1,3],[1,4],[2,3],[2,4]
  });

  test('single element in each array, k = 1', () => {
    expectPairsEqual(kSmallestPairs([5], [7], 1), [[5, 7]]);
  });

  test('duplicates in both arrays — correct order by sum', () => {
    const out = kSmallestPairs([1, 1], [1, 1], 4);
    expect(out.length).toBe(4);
    out.forEach((p) => expect(p[0] + p[1]).toBe(2));
    expectPairsEqual(out, [[1, 1], [1, 1], [1, 1], [1, 1]]);
  });

  test('negative numbers', () => {
    const out = kSmallestPairs([-1, 0, 1], [-1, 0, 1], 3);
    // sums: -2, -1, 0 (from -1), -1, 0, 1 (from 0), 0, 1, 2 (from 1). Smallest: -2,-1,-1
    expect(out[0][0] + out[0][1]).toBe(-2);
    expectPairsEqual(out, [[-1, -1], [-1, 0], [0, -1]]);
  });

  test('k larger than one array length', () => {
    const nums1 = [1, 2];
    const nums2 = [3];
    const out = kSmallestPairs(nums1, nums2, 5);
    expect(out.length).toBe(2); // only 2 pairs exist
    expectPairsEqual(out, [[1, 3], [2, 3]]);
  });

  test('strictly increasing — first k from (0,0) expansion', () => {
    const nums1 = [1, 2, 3];
    const nums2 = [1, 2, 3];
    const out = kSmallestPairs(nums1, nums2, 5);
    expect(out.length).toBe(5);
    const sums = out.map(([u, v]) => u + v);
    expect(sums).toEqual([2, 3, 3, 4, 4]); // [1,1],[1,2],[2,1],[1,3],[2,2]
  });

  test('constraint boundary: k = 1, minimal arrays', () => {
    expectPairsEqual(kSmallestPairs([1], [1], 1), [[1, 1]]);
  });

  test('k = 1 with one long array', () => {
    const nums1 = [0];
    const nums2 = [0, 1, 2, 3];
    expectPairsEqual(kSmallestPairs(nums1, nums2, 1), [[0, 0]]);
  });

  test('all pairs same sum — any order accepted for first k', () => {
    const out = kSmallestPairs([1, 1], [1, 1], 2);
    expect(out.length).toBe(2);
    out.forEach((p) => expect(p[0] + p[1]).toBe(2));
  });
});
