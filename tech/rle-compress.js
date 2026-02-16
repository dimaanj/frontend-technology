/**
 * Сжатие строки по алгоритму RLE (Run-Length Encoding).
 * Последовательные одинаковые символы заменяются на символ + количество.
 *
 * @param {string} str - исходная строка
 * @returns {string} - сжатое представление
 *
 * @example
 * rle("aaa")        // "a3"
 * rle("aabcccccaaa") // "a2b1c5a3"
 */
function rle(str) {
  if (!str) return str;

  let result = '';
  let count = 1;

  for (let i = 1; i <= str.length; i++) {
    if (str[i] === str[i - 1]) {
      count++;
    } else {
      result += str[i - 1] + count;
      count = 1;
    }
  }

  return result;
}

module.exports = { rle };
