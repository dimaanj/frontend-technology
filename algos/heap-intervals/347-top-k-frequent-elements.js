/**
 * K наиболее частых элементов (Яндекс, Тинькофф, Авито)
 *
 * Принимает массив целых чисел nums и целое число k.
 * Возвращает массив из k наиболее часто встречающихся элементов.
 * Если k больше количества уникальных элементов — вернуть все уникальные.
 *
 * @param {number[]} nums - массив целых чисел
 * @param {number} k - количество наиболее частых элементов
 * @returns {number[]} - массив из k наиболее частых элементов (порядок не важен)
 */
function topKFrequent(nums, k) {
  const map = new Map();
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  const sortedValues = Array.from(map.entries())
    .sort((a, b) => {
      const [ka, va] = a;
      const [kb, vb] = b;

      return vb - va;
    })
    .slice(0, k)
    .map((a) => a[0]);

  return sortedValues;
}

// Решение
/*



*/

// Примеры:
// Input 1: [1, 1, 1, 2, 2, 3], 2
// Output 1: [1, 2]
//
// Input 2: [1, 2, 3, 4, 5], 2
// Output 2: [1, 2]

module.exports = { topKFrequent };
