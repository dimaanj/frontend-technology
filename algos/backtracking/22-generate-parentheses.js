/**
 * LeetCode 22. Generate Parentheses
 * Генерация скобочных последовательностей.
 * Дано n пар скобок — вернуть все комбинации правильных скобочных последовательностей.
 *
 * @param {number} n — количество пар скобок (1 <= n <= 8)
 * @return {string[]}
 */
function generateParenthesis(n) {

  const res = [];

  function generate(open, close, current) {
    if(open + close === 2*n) {
      res.push(current);
      return;
    } 
    if(open < n) {
      generate(open + 1, close, current + '(');
    }
    if(close < open) {
      generate(open, close + 1, current + ')');
    }
  }

  generate(0, 0, '');

  return res;
}

module.exports = { generateParenthesis };
