const { findDuplicate } = require('./287-find-duplicate-number');

describe('Find the Duplicate Number - LeetCode 287', () => {
  test('Example 1: [1,3,4,2,2] → 2', () => {
    expect(findDuplicate([1, 3, 4, 2, 2])).toBe(2);
  });

  test('Example 2: [3,1,3,4,2] → 3', () => {
    expect(findDuplicate([3, 1, 3, 4, 2])).toBe(3);
  });

  test('minimal: [1,1] → 1', () => {
    expect(findDuplicate([1, 1])).toBe(1);
  });

  test('duplicate at start: [2,2,1] → 2', () => {
    expect(findDuplicate([2, 2, 1])).toBe(2);
  });

  test('duplicate at end: [1,2,2] → 2', () => {
    expect(findDuplicate([1, 2, 2])).toBe(2);
  });

  test('all same: [2,2,2,2] → 2', () => {
    expect(findDuplicate([2, 2, 2, 2])).toBe(2);
  });

  test('longer: [4,3,1,4,2] → 4', () => {
    expect(findDuplicate([4, 3, 1, 4, 2])).toBe(4);
  });

  test('cycle through start: [1,2,1] → 1', () => {
    expect(findDuplicate([1, 2, 1])).toBe(1);
  });
});
