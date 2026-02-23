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
 * LeetCode 2336. Smallest Number in Infinite Set
 * Заглушка для запуска тестов — реализацию пишет кандидат.
 */
class SmallestInfiniteSet1 {
  constructor() {
    this.next = 1;
    this.addedBack = new Set();
  }

  popSmallest() {
    if (this.addedBack.size() > 0) {
      const min = Math.min(...this.addedBack);
      this.addedBack.delete(min);
      return min;
    }
    return this.next++;
  }

  addBack(num) {
    if (num < this.next) {
      this.next = num;
    }
  }
}

class SmallestInfiniteSet {
  constructor() {
    this.next = 1;
    this.heap = new MinHeap();
    this.inHeap = new Set();
  }

  popSmallest() {
    if (this.heap.size() > 0) {
      const num = this.heap.poll();
      this.inHeap.delete(num);
      return num;
    }
    return this.next++;
  }

  addBack(num) {
    if (num < this.next && !this.inHeap.has(num)) {
      this.inHeap.add(num);
      this.heap.add(num);
    }
  }
}

module.exports = { SmallestInfiniteSet };
