/**
 * LeetCode 150. Evaluate Reverse Polish Notation
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const stack = [];

  for (const token of tokens) {
    let op1, op2, curr;
    switch (token) {
      case "+":
        op2 = stack.pop();
        op1 = stack.pop();
        curr = op1 + op2;
        stack.push(curr);
        break;
      case "-":
        op2 = stack.pop();
        op1 = stack.pop();
        curr = op1 - op2;
        stack.push(curr);
        break;
      case "*":
        op2 = stack.pop();
        op1 = stack.pop();
        curr = op1 * op2;
        stack.push(curr);
        break;
      case "/":
        op2 = stack.pop();
        op1 = stack.pop();
        curr = Math.trunc(op1 / op2);
        stack.push(curr);
        break;
      default:
        stack.push(Number(token));
    }
  }

  return stack.pop();
};

/**
 * Рекурсивный вариант: разбор с конца. Последний токен — корень выражения
 * (оператор или единственное число). Если оператор — сначала рекурсивно
 * читаем правый операнд, затем левый, затем применяем оператор.
 * @param {string[]} tokens
 * @return {number}
 */
function evalRPNRecursive(tokens) {
  let i = tokens.length - 1;

  function read() {
    const token = tokens[i];

    if (isNaN(Number(token))) {
      i--;
      const op2 = read();

      i--;
      const op1 = read();

      switch (token) {
        case "+":
          return op1 + op2;
        case "-":
          return op1 - op2;
        case "*":
          return op1 * op2;
        case "/":
          return Math.trunc(op1 / op2);
      }
    }
    return Number(token); // число
  }

  return read();
}

module.exports = { evalRPN, evalRPNRecursive };
