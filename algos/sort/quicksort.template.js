/**
 * QuickSort (template) — in-place сортировка массива.
 *
 * Идея:
 * - Выбираем pivot
 * - Делаем partition: все < pivot слева, все >= pivot справа, pivot встаёт на итоговую позицию
 * - Рекурсивно сортируем левую и правую части
 *
 * Сложность:
 * - В среднем: O(n log n)
 * - В худшем: O(n^2)
 * - Память: O(log n) на стек (в среднем), доп. массивов нет
 */

// =============================================================================
// НАПРАВЛЕНИЕ ДЛЯ РЕШЕНИЯ (QuickSort)
// =============================================================================
//
// 1) Выбор pivot:
//    - часто mid = (lo + hi) >> 1 (или random, или median-of-three)
//
// 2) Partition:
//    - переставить элементы так: все < pivot слева, все >= pivot справа
//    - pivot окажется на своей итоговой позиции (индекс вернуть)
//
// 3) Рекурсия:
//    - quickSortRange(arr, lo, pivotIndex - 1)
//    - quickSortRange(arr, pivotIndex + 1, hi)
//    - базовый случай: lo >= hi
//
// =============================================================================

/**
 * Разбивает отрезок [lo, hi] относительно pivot. Возвращает итоговый индекс pivot.
 * После вызова: элементы [lo, pivotIndex-1] < pivot, [pivotIndex+1, hi] >= pivot.
 *
 * @param {number[]} arr
 * @param {number} lo
 * @param {number} hi
 * @returns {number}
 */
function partition(arr, lo, hi) {
  // TODO:
  // - выбрать pivotIndex (например, mid)
  // - swap(arr, pivotIndex, hi); pivotValue = arr[hi]
  // - i = lo; for j in [lo..hi-1]:
  //     if arr[j] < pivotValue: swap(arr, i, j); i++
  // - swap(arr, i, hi); return i

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
 * In-place QuickSort для отрезка [lo, hi].
 * @param {number[]} arr
 * @param {number} lo
 * @param {number} hi
 */
function quickSortRange(arr, lo, hi) {
  // TODO: if (lo >= hi) return
  // TODO: pivotIdx = partition(arr, lo, hi)
  // TODO: quickSortRange(arr, lo, pivotIdx - 1)
  // TODO: quickSortRange(arr, pivotIdx + 1, hi)

  if (lo >= hi) return;
  const pivotIndex = partition(arr, lo, hi);
  quickSortRange(arr, lo, pivotIndex - 1);
  quickSortRange(arr, pivotIndex + 1, hi);
}

/**
 * Удобная обёртка: сортирует весь массив и возвращает его.
 * @param {number[]} nums
 * @returns {number[]}
 */
function quickSort(nums) {
  // TODO: quickSortRange(nums, 0, nums.length - 1); return nums
  quickSortRange(nums, 0, nums.length - 1);
  return nums;
}

// -----------------------------------------------------------------------------
// Примеры для ручной проверки
// -----------------------------------------------------------------------------
// console.log(quickSort([5, 2, 3, 1]));       // [1, 2, 3, 5]
// console.log(quickSort([5, 1, 1, 2, 0, 0])); // [0, 0, 1, 1, 2, 5]
// console.log(quickSort([1]));                 // [1]
// console.log(quickSort([]));                  // []

