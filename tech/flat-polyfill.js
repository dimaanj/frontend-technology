/**
 * Полифилл Array.flat без рекурсии и без встроенного flat.
 * Используем стек + while: стек заменяет стек вызовов рекурсии.
 *
 * @param {unknown[]} arr - массив произвольной вложенности
 * @returns {unknown[]} - плоский массив
 */
function flat(arr) {
  const result = [];
  // Кладём элементы в обратном порядке, чтобы при pop обрабатывать слева направо
  const stack = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    stack.push(arr[i]);
  }

  while (stack.length > 0) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      for (let j = item.length - 1; j >= 0; j--) {
        stack.push(item[j]);
      }
    } else {
      result.push(item);
    }
  }

  return result;
}

// Пример
const nested = [1, [10, 12], [[2, 4], 7], 190];
console.log(flat(nested)); // [1, 10, 12, 2, 4, 7, 190]

module.exports = { flat };
