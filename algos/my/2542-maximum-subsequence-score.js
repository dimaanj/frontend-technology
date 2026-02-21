/**
 * LeetCode 2542. Maximum Subsequence Score
 * Score = (sum of selected nums1) * (min of selected nums2).
 *
 * Идея: сортируем пары (nums1[i], nums2[i]) по nums2 по убыванию.
 * Для каждой позиции i фиксируем nums2[i] как минимум среди выбранных —
 * тогда все выбранные индексы должны быть в [0..i], и мы берём текущий + (k-1)
 * лучших по nums1 из [0..i-1]. Сумму (k-1) наибольших храним в min-куче размера k-1.
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @returns {number}
 */
function maxScore(nums1, nums2, k) {
  const minheap = new MinHeap();

  const nums = nums1.map((n, index) => [n, nums2[index]]);
  nums.sort((a, b) => ( b[1] - a[1]));

  let n1sum = 0;
  let res = 0;
  for(let i = 0; i < nums.length; i++) {
    const [n1, n2] = nums[i];

    n1sum = n1sum + n1;
    minheap.push(n1);

    if(minheap.size() > k) {
      const n1pop = minheap.pop();
      n1sum = n1sum - n1pop;
    }

    if(minheap.size() === k) {
      res = Math.max(res, n1sum * n2) // n2 здесь уже минимальное из подмассива длины k
    }
  }

  return res;

}

/** Минимальная куча для хранения не более (k-1) элементов. */
class MinHeap {
  constructor() {
    this._a = [];
  }

  size() {
    return this._a.length;
  }

  push(val) {
    this._a.push(val);
    this._bubbleUp(this._a.length - 1);
  }

  pop() {
    if (this._a.length === 0) return undefined;
    const top = this._a[0];
    const last = this._a.pop();
    if (this._a.length > 0) {
      this._a[0] = last;
      this._bubbleDown(0);
    }
    return top;
  }

  _bubbleUp(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this._a[p] <= this._a[i]) break;
      [this._a[p], this._a[i]] = [this._a[i], this._a[p]];
      i = p;
    }
  }

  _bubbleDown(i) {
    const n = this._a.length;
    while (true) {
      let min = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      if (l < n && this._a[l] < this._a[min]) min = l;
      if (r < n && this._a[r] < this._a[min]) min = r;
      if (min === i) break;
      [this._a[i], this._a[min]] = [this._a[min], this._a[i]];
      i = min;
    }
  }
}

module.exports = { maxScore };
