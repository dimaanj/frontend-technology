class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Индексы для навигации по куче
  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }
  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  // Проверка наличия детей/родителей
  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.heap.length;
  }
  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.heap.length;
  }
  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  // Получение значений
  leftChild(index) {
    return this.heap[this.getLeftChildIndex(index)];
  }
  rightChild(index) {
    return this.heap[this.getRightChildIndex(index)];
  }
  parent(index) {
    return this.heap[this.getParentIndex(index)];
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  peek() {
    return this.heap.length === 0 ? null : this.heap[0];
  }

  poll() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const item = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return item;
  }

  add(item) {
    this.heap.push(item);
    this.heapifyUp();
    return this;
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (this.hasParent(index) && this.parent(index) > this.heap[index]) {
      const parentIndex = this.getParentIndex(index);
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (
        this.hasRightChild(index) &&
        this.rightChild(index) < this.leftChild(index)
      ) {
        smallerChildIndex = this.getRightChildIndex(index);
      }

      if (this.heap[index] < this.heap[smallerChildIndex]) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }

  size() {
    return this.heap.length;
  }
}

/**
 * LeetCode 2462. Total Cost to Hire K Workers
 * @param {number[]} costs
 * @param {number} k
 * @param {number} candidates
 * @return {number}
 */
function totalCost(costs, k, candidates) {
  const n = costs.length;
  let l = 0;
  let r = n - 1;

  const minL = new MinHeap();
  const minR = new MinHeap();

  let sum = 0;

  for (let i = 0; i < candidates; i++) {
    if (l <= r) {
      minL.add(costs[l]);
      l++;
    }
  }

  for (let i = 0; i < candidates; i++) {
    if (l <= r) {
      minR.add(costs[r]);
      r--;
    }
  }

  for (let m = 0; m < k; m++) {
    const leftPeek = minL.peek();
    const rightPeek = minR.peek();

    // Берём слева: если правой кучи нет ИЛИ (левая есть и cost слева <= справа, при равенстве — меньший индекс = слева)
    if (!minR.size() || (minL.size() && leftPeek <= rightPeek)) {
      sum += minL.poll();
      if (l <= r) {
        minL.add(costs[l]);
        l++;
      }
    } else {
      sum += minR.poll();
      if (l <= r) {
        minR.add(costs[r]);
        r--;
      }
    }
  }

  return sum;
}

module.exports = { totalCost };
