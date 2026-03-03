/**
 * 17. Letter Combinations of a Phone Number
 * Дана строка digits, содержащая цифры от 2 до 9 включительно, верните все возможные
 * буквенные комбинации, которые может образовать данная строка. Верните ответ в любом порядке.
 * Соответствие цифр буквам (как на кнопках телефона). 1 не соответствует ни одной букве.
 *
 * 2 -> abc, 3 -> def, 4 -> ghi, 5 -> jkl, 6 -> mno, 7 -> pqrs, 8 -> tuv, 9 -> wxyz
 *
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  const keys = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
  }

  const res = [];
  if(!digits.length) {
    return res;
  }

  // ditits 234232
  //         p

  // k = digits[p]
  // a   b   c
  // k
  // 


  function backtrack(pos, word) {
    if (word.length === digits.length) {
      res.push(word);
      return;
    }

    const key = digits[pos];
    const characters = keys[key];
    for(let i = 0; i < characters.length; i++) {
      const ch = characters[i];
      backtrack(pos + 1, word + ch);
    }
  }

  backtrack(0, "");

  return res;
};

module.exports = { letterCombinations };
