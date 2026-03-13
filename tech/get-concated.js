/**
 * Конкатенация строк из объектов
 * Сбер, Тинькофф, Mail.ru
 *
 * Напишите функцию getConcated(arr), которая принимает массив объектов arr
 * и возвращает строку по правилам:
 *
 * 1. Элементы упорядочены по полю order по возрастанию.
 * 2. Элементы с expired: true исключены.
 * 3. Поле value каждого объекта перевёрнуто (символы в обратном порядке).
 * 4. В итоговой строке нет повторяющихся символов (уникальные в порядке первого появления).
 *
 * Примеры:
 * Input 1: [{ value: "aabb", order: 1, expired: false }, { value: "bbaa", order: 2, expired: false }]
 * Output 1: "ba"
 *
 * Input 2: [{ value: "hello", order: 1, expired: false }, { value: "world", order: 2, expired: false }]
 * Output 2: "olehdrw"
 */

// 1. Исключить объекты с expired === true
// 2. Отсортировать по полю order по возрастанию
// 3. Для каждого объекта: развернуть value (символы в обратном порядке)
// 4. Склеить все перевёрнутые value в одну строку
// 5. Убрать повторяющиеся символы (оставить только первое вхождение каждого)

/**
 * @param {Array<{ value: string, order: number, expired?: boolean }>} arr
 * @returns {string}
 */
function getConcated(arr) {
  const s = arr
    .filter((el) => !el.expired)
    .sort((a, b) => {
      const { order: oa } = a;
      const { order: ob } = b;

      return oa - ob;
    })
    .map((el) => el.value.split('').reverse().join(""))
    .join('');

  const fm = new Set();
  let result = '';
  for (const ch of s) {
    if (fm.has(ch)) {
      continue;
    }

    fm.add(ch);
    result += ch;
  }

  return result;
}

module.exports = { getConcated };
