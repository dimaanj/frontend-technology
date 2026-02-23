/**
 * Делает массив "великим": в каждом подмассиве длины 3 есть хотя бы один элемент >= k.
 * Минимизирует количество операций (каждая операция: увеличить элемент на 1).
 *
 * @param {number[]} arr - исходный массив
 * @param {number} k - минимальный порог
 * @returns {number[]} - массив после минимальных изменений
 */
function makeGreat(arr, k) {
  const result = [...arr];
  const n = arr.length;
  if (n < 3) return result;

  const isGood = (j) =>
    result[j] >= k || result[j + 1] >= k || result[j + 2] >= k;

  const getBadSubarraysContaining = (i) => {
    const bad = [];
    const start = Math.max(0, i - 2);
    const end = Math.min(i, n - 3);
    for (let j = start; j <= end; j++) {
      if (!isGood(j)) bad.push(j);
    }
    return bad.length;
  };

  while (true) {
    let bestI = -1;
    let bestRatio = -1;
    let bestCost = Infinity;

    for (let i = 0; i < n; i++) {
      const cost = Math.max(0, k - result[i]);
      if (cost === 0) continue;

      const fixed = getBadSubarraysContaining(i);
      if (fixed === 0) continue;

      const ratio = fixed / cost;
      const isBetter =
        ratio > bestRatio ||
        (ratio === bestRatio && cost < bestCost) ||
        (ratio === bestRatio && cost === bestCost && i > bestI);
      if (isBetter) {
        bestRatio = ratio;
        bestCost = cost;
        bestI = i;
      }
    }

    if (bestI === -1) break;

    result[bestI] = k;
  }

  return result;
}

module.exports = { makeGreat };
