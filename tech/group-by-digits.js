/**
 * Группировка чисел по частоте цифр (нули не учитываются).
 * Числа в одной группе имеют одинаковое количество каждой цифры 1-9.
 *
 * @param {string[]} arr - массив строк с числами
 * @returns {string[][]} - массив групп
 *
 * Пример: '1200300' и '320001000' в одной группе — по одному 1, 2 и 3
 */
const group = (arr) => {
  const map = new Map();

  for (const str of arr) {
    const counts = Array(10).fill(0);
    for (const char of str) {
      const d = parseInt(char, 10);
      if (d !== 0) counts[d]++;
    }
    const key = counts.slice(1).join(',');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }

  return Array.from(map.values());
};

const arr = ['1200300', '123', '11122233', '320001000', '1122', '002002101'];
console.log(group(arr));
// [['1200300', '123', '320001000'], ['1122', '002002101'], ['11122233']]
