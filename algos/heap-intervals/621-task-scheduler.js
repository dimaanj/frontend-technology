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

function leastIntervalHeap(tasks, n) {
  const map = new Map();
  for (let i = 0; i < tasks.length; i++) {
    map.set(tasks[i], (map.get(tasks[i]) || 0) + 1);
  }

  const maxheap = new MinHeap();
  for (const [, value] of map) {
    maxheap.add(-value);
  }

  const deque = []; // { readyTime, count }
  let time = 0;

  while (maxheap.size() || deque.length) {
    time = time + 1;

    // Сначала вернуть в heap всё, что уже готово к этому такту
    while (deque.length && deque[0].readyTime <= time) {
      maxheap.add(-deque.shift().count);
    }

    if (maxheap.size()) {
      const current = -maxheap.poll();
      const newVal = current - 1;
      if (newVal) {
        deque.push({ count: newVal, readyTime: time + n + 1 });
      }
    }
  }

  return time;
}

module.exports = { leastInterval: leastIntervalHeap };
