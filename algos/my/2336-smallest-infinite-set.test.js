const { SmallestInfiniteSet } = require('./2336-smallest-infinite-set');

describe('SmallestInfiniteSet - LeetCode 2336', () => {
  test('Example 1 from problem statement', () => {
    const set = new SmallestInfiniteSet();
    set.addBack(2); // 2 already in set, no change
    expect(set.popSmallest()).toBe(1);
    expect(set.popSmallest()).toBe(2);
    expect(set.popSmallest()).toBe(3);
    set.addBack(1);
    expect(set.popSmallest()).toBe(1);
    expect(set.popSmallest()).toBe(4);
    expect(set.popSmallest()).toBe(5);
  });

  test('Only popSmallest returns 1, 2, 3, ... in order', () => {
    const set = new SmallestInfiniteSet();
    expect(set.popSmallest()).toBe(1);
    expect(set.popSmallest()).toBe(2);
    expect(set.popSmallest()).toBe(3);
    expect(set.popSmallest()).toBe(4);
    expect(set.popSmallest()).toBe(5);
  });

  test('addBack then popSmallest returns added number when it is smallest', () => {
    const set = new SmallestInfiniteSet();
    set.popSmallest(); // 1
    set.popSmallest(); // 2
    set.addBack(1);
    expect(set.popSmallest()).toBe(1);
    expect(set.popSmallest()).toBe(3);
  });

  test('addBack(num) when num already in set — no duplicate', () => {
    const set = new SmallestInfiniteSet();
    set.addBack(1); // already there
    set.addBack(1);
    expect(set.popSmallest()).toBe(1);
    expect(set.popSmallest()).toBe(2);
    // only one 1 was ever "available"
  });

  test('addBack same number twice after it was popped — only one copy', () => {
    const set = new SmallestInfiniteSet();
    expect(set.popSmallest()).toBe(1);
    set.addBack(1);
    set.addBack(1);
    expect(set.popSmallest()).toBe(1);
    expect(set.popSmallest()).toBe(2);
  });

  test('addBack multiple different numbers — pop returns smallest first', () => {
    const set = new SmallestInfiniteSet();
    set.popSmallest(); // 1
    set.popSmallest(); // 2
    set.popSmallest(); // 3
    set.addBack(2);
    set.addBack(1);
    set.addBack(3);
    expect(set.popSmallest()).toBe(1);
    expect(set.popSmallest()).toBe(2);
    expect(set.popSmallest()).toBe(3);
    expect(set.popSmallest()).toBe(4);
  });

  test('addBack(1) when 1 was never removed — next pop is still 1', () => {
    const set = new SmallestInfiniteSet();
    set.addBack(1); // no-op, 1 still in infinite set
    expect(set.popSmallest()).toBe(1);
    expect(set.popSmallest()).toBe(2);
  });

  test('Single pop then single addBack', () => {
    const set = new SmallestInfiniteSet();
    expect(set.popSmallest()).toBe(1);
    set.addBack(1);
    expect(set.popSmallest()).toBe(1);
    expect(set.popSmallest()).toBe(2);
  });

  test('Pop many then addBack smallest — order preserved', () => {
    const set = new SmallestInfiniteSet();
    for (let i = 1; i <= 10; i++) {
      expect(set.popSmallest()).toBe(i);
    }
    set.addBack(1);
    expect(set.popSmallest()).toBe(1);
    expect(set.popSmallest()).toBe(11);
  });

  test('addBack at boundary 1000 (constraint)', () => {
    const set = new SmallestInfiniteSet();
    for (let i = 0; i < 998; i++) {
      set.popSmallest();
    }
    expect(set.popSmallest()).toBe(999);
    expect(set.popSmallest()).toBe(1000);
    set.addBack(1000);
    expect(set.popSmallest()).toBe(1000);
    expect(set.popSmallest()).toBe(1001);
  });

  test('Many addBack and pop — addBack numbers reappear as smallest', () => {
    const set = new SmallestInfiniteSet();
    set.popSmallest();
    set.popSmallest();
    set.popSmallest();
    set.addBack(1);
    set.addBack(2);
    expect(set.popSmallest()).toBe(1);
    expect(set.popSmallest()).toBe(2);
    expect(set.popSmallest()).toBe(4);
    expect(set.popSmallest()).toBe(5);
    expect(set.popSmallest()).toBe(6);
  });
});
