/**
 * LeetCode 373. Find K Pairs with Smallest Sums
 * nums1, nums2 — sorted non-decreasing; return k pairs (u,v) with smallest u+v.
 *
 * Идея с кучей: в куче храним кандидаты (i, j). Минимальная сумма — в (0,0).
 * После извлечения (i, j) следующие кандидаты — (i, j+1) и (i+1, j).
 * Посещённые (i,j) не добавляем повторно.
 * Время O(k log k), память O(k) + посещённые до k*2 в худшем случае.
 */

/** Min-heap по полю sum; при равенстве sum — по i, затем j. */
class MinHeapPairs {
  constructor() {
    this.heap = [];
  }

  _less(a, b) {
    if (a.sum !== b.sum) return a.sum < b.sum;
    if (a.i !== b.i) return a.i < b.i;
    return a.j < b.j;
  }

  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  _parent(i) {
    return (i - 1) >> 1;
  }
  _left(i) {
    return 2 * i + 1;
  }
  _right(i) {
    return 2 * i + 2;
  }

  add(node) {
    this.heap.push(node);
    let i = this.heap.length - 1;
    while (i > 0 && this._less(this.heap[i], this.heap[this._parent(i)])) {
      const p = this._parent(i);
      this._swap(i, p);
      i = p;
    }
  }

  poll() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    let i = 0;
    const n = this.heap.length;
    while (true) {
      let best = i;
      const l = this._left(i);
      const r = this._right(i);
      if (l < n && this._less(this.heap[l], this.heap[best])) best = l;
      if (r < n && this._less(this.heap[r], this.heap[best])) best = r;
      if (best === i) break;
      this._swap(i, best);
      i = best;
    }
    return top;
  }

  get size() {
    return this.heap.length;
  }
}

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @returns {number[][]}
 */
function kSmallestPairs(nums1, nums2, k) {
  const minheap = new MinHeapPairs();

  const visited = new Set();
  const key = (i, j) => `${i},${j}`;

  minheap.add({ sum: nums1[0] + nums2[0], i: 0, j: 0 });
  visited.add(key(0, 0));
  
  const res = [];

  while (minheap.size && res.length < k) {
    const { i, j } = minheap.poll();
    res.push([nums1[i], nums2[j]]);

    if (
      i < nums1.length &&
      j + 1 < nums2.length &&
      !visited.has(key(i, j + 1))
    ) {
      visited.add(key(i, j + 1));
      minheap.add({ sum: nums1[i] + nums2[j + 1], i, j: j + 1 });
    }

    if (
      j < nums2.length &&
      i + 1 < nums1.length &&
      !visited.has(key(i + 1, j))
    ) {
      visited.add(key(i + 1, j));
      minheap.add({ sum: nums1[i + 1] + nums2[j], i: i + 1, j });

    }
  }

  return res;
}

module.exports = { kSmallestPairs };
