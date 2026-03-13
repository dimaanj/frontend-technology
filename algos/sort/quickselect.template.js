/**
 * Quickselect (template) — найти k-ый элемент по порядку без полной сортировки.
 *
 * Где применяется (LeetCode):
 * - 215. Kth Largest Element in an Array
 * - 973. K Closest Points to Origin (как подзадача выбора границы)
 * - 347. Top K Frequent Elements (иногда через bucket/heap лучше, но quickselect тоже встречается)
 *
 * Идея:
 * - Используем тот же `partition`, что и в quicksort, но идём ТОЛЬКО в одну сторону —
 *   туда, где лежит целевой индекс.
 *
 * Сложность:
 * - В среднем: O(n)
 * - В худшем: O(n^2) (плохие pivot на каждом шаге)
 * - Память: O(1) доп. (если итеративно) + O(1) если без рекурсии
 */

// =============================================================================
// НАПРАВЛЕНИЕ ДЛЯ РЕШЕНИЯ (Quickselect) — шаги реализации
// =============================================================================
//
// 0) Определи, что такое "k":
//    - k-th smallest: targetIndex = k - 1
//    - k-th largest:  targetIndex = nums.length - k
//    Важно: targetIndex — это индекс в ОТСОРТИРОВАННОМ массиве (0-based).
//
// 1) Заведи границы поиска: lo = 0, hi = nums.length - 1.
//
// 2) Пока lo <= hi:
//    - pivotIndex = partition(nums, lo, hi)
//    - Если pivotIndex === targetIndex: ответ найден → return nums[pivotIndex]
//    - Если pivotIndex < targetIndex: lo = pivotIndex + 1 (искать справа)
//    - Иначе: hi = pivotIndex - 1 (искать слева)
//
// 3) Partition (разбиение):
//    - То же самое, что в quicksort: после partition pivot оказывается на своей итоговой позиции.
//    - Все элементы < pivot слева, все >= pivot справа (или наоборот — главное консистентно).
//
// 4) Edge cases:
//    - k вне диапазона: k <= 0 или k > n
//    - много дубликатов
//    - массив уже отсортирован (плохой pivot может дать худший случай)
//
// 5) Как снизить шанс худшего O(n^2):
//    - random pivot (случайный индекс в [lo, hi])
//    - median-of-three (lo, mid, hi)
//
// =============================================================================

/**
 * Разбивает отрезок [lo, hi] относительно pivot. Возвращает итоговый индекс pivot.
 *
 * Инвариант после вызова (вариант Lomuto):
 * - arr[lo..pivotIndex-1] < pivot
 * - arr[pivotIndex] === pivot
 * - arr[pivotIndex+1..hi] >= pivot
 *
 * @param {number[]} arr
 * @param {number} lo
 * @param {number} hi
 * @returns {number}
 */
function partition(arr, lo, hi) {
  // TODO:
  // - выбрать pivotIndex (например, mid или random)
  // - swap(arr, pivotIndex, hi)
  // - pivotValue = arr[hi]
  // - i = lo
  // - for j in [lo..hi-1]:
  //     if arr[j] < pivotValue: swap(arr, i, j); i++
  // - swap(arr, i, hi)
  // - return i

  const mid = (lo + hi) >> 1;
  [arr[mid], arr[hi]] = [arr[hi], arr[mid]];
  const pivotValue = arr[hi];

  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (arr[j] < pivotValue) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[hi]] = [arr[hi], arr[i]];
  return i;
}

/**
 * Находит элемент, который будет стоять на `targetIndex` после сортировки (k-th smallest).
 * Мутирует исходный массив `nums` in-place.
 *
 * @param {number[]} nums
 * @param {number} targetIndex 0-based индекс в отсортированном массиве
 * @returns {number}
 */
function quickSelectByIndex(nums, targetIndex) {
  // TODO: валидация targetIndex
  // TODO: lo/hi, цикл, partition, сдвиг границ

  if (!Array.isArray(nums)) throw new TypeError('nums must be an array');
  if (targetIndex < 0 || targetIndex >= nums.length) {
    throw new RangeError('targetIndex is out of range');
  }

  let lo = 0;
  let hi = nums.length - 1;

  while (lo <= hi) {
    const pivotIndex = partition(nums, lo, hi);

    if (pivotIndex === targetIndex) return nums[pivotIndex];
    if (pivotIndex < targetIndex) lo = pivotIndex + 1;
    else hi = pivotIndex - 1;
  }

  // Теоретически сюда не должны попасть при валидном targetIndex.
  throw new Error('quickselect failed unexpectedly');
}

/**
 * 215. Kth Largest Element in an Array — темплейт под quickselect.
 * https://leetcode.com/problems/kth-largest-element-in-an-array/
 *
 * @param {number[]} nums
 * @param {number} k 1-based (k=1 → самый большой)
 * @returns {number}
 */
function findKthLargest(nums, k) {
  // TODO:
  // - проверить k
  // - targetIndex = nums.length - k
  // - return quickSelectByIndex(nums, targetIndex)

  if (!Array.isArray(nums)) throw new TypeError('nums must be an array');
  if (k <= 0 || k > nums.length) throw new RangeError('k is out of range');

  const targetIndex = nums.length - k;
  return quickSelectByIndex(nums, targetIndex);
}

// -----------------------------------------------------------------------------
// Примеры для ручной проверки
// -----------------------------------------------------------------------------
// console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
// console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // 4
// console.log(quickSelectByIndex([5, 2, 3, 1], 0)); // 1 (min)
// console.log(quickSelectByIndex([5, 2, 3, 1], 3)); // 5 (max)

