/**
 * Находит подмассив с максимальной суммой, содержащий не более 2-х различных элементов.
 * Использует скользящее окно и монотонную очередь для O(n) времени.
 *
 * @param {number[]} arr — массив чисел
 * @returns {number} — максимальная сумма подмассива с ≤2 различными элементами
 */
function maxSumAtMost2Distinct(arr) {
  const n = arr.length;
  if (n === 0) return 0;

  const prefix = [0];
  for (let i = 0; i < n; i++) {
    prefix.push(prefix[i] + arr[i]);
  }

  const count = new Map();
  let left = 0;
  let maxSum = -Infinity;
  const deque = []; // индексы — монотонная очередь для минимума prefix

  for (let right = 0; right < n; right++) {
    count.set(arr[right], (count.get(arr[right]) || 0) + 1);

    // Добавляем prefix[right] в очередь — убираем с конца, если текущий меньше
    while (deque.length > 0 && prefix[right] <= prefix[deque[deque.length - 1]]) {
      deque.pop();
    }
    deque.push(right);

    // Сужаем окно, пока более 2 различных элементов
    while (count.size > 2) {
      count.set(arr[left], count.get(arr[left]) - 1);
      if (count.get(arr[left]) === 0) count.delete(arr[left]);
      left++;
    }

    // Убираем невалидные индексы из очереди
    while (deque.length > 0 && deque[0] < left) {
      deque.shift();
    }

    if (deque.length > 0) {
      const minPrefixIdx = deque[0];
      const currentSum = prefix[right + 1] - prefix[minPrefixIdx];
      maxSum = Math.max(maxSum, currentSum);
    }
  }

  return maxSum;
}

module.exports = { maxSumAtMost2Distinct };
