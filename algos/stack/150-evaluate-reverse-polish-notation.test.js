const { evalRPN, evalRPNRecursive } = require('./150-evaluate-reverse-polish-notation');

describe('Evaluate Reverse Polish Notation - LeetCode 150', () => {
  test('Example 1: ["2","1","+","3","*"] → (2+1)*3 = 9', () => {
    expect(evalRPN(['2', '1', '+', '3', '*'])).toBe(9);
  });

  test('Example 2: ["4","13","5","/","+"] → 4 + 13/5 = 6 (truncate)', () => {
    expect(evalRPN(['4', '13', '5', '/', '+'])).toBe(6);
  });

  test('Example 3: complex expression → 22', () => {
    const tokens = ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'];
    expect(evalRPN(tokens)).toBe(22);
  });

  test('single operand', () => {
    expect(evalRPN(['0'])).toBe(0);
    expect(evalRPN(['42'])).toBe(42);
    expect(evalRPN(['-5'])).toBe(-5);
  });

  test('addition only', () => {
    expect(evalRPN(['3', '2', '+'])).toBe(5);
    expect(evalRPN(['1', '1', '+', '1', '+'])).toBe(3);
  });

  test('subtraction', () => {
    expect(evalRPN(['5', '3', '-'])).toBe(2);
    expect(evalRPN(['1', '2', '-'])).toBe(-1);
    expect(evalRPN(['0', '1', '-'])).toBe(-1);
  });

  test('multiplication', () => {
    expect(evalRPN(['2', '3', '*'])).toBe(6);
    expect(evalRPN(['-2', '3', '*'])).toBe(-6);
    expect(evalRPN(['-2', '-3', '*'])).toBe(6);
  });

  test('division truncates toward zero', () => {
    expect(evalRPN(['7', '2', '/'])).toBe(3);
    expect(evalRPN(['8', '2', '/'])).toBe(4);
    expect(evalRPN(['1', '2', '/'])).toBe(0);
  });

  test('division with negative: truncate toward zero', () => {
    // -7/2 = -3.5 → trunc to -3 (toward zero)
    expect(evalRPN(['-7', '2', '/'])).toBe(-3);
    // 7/-2 = -3.5 → trunc to -3
    expect(evalRPN(['7', '-2', '/'])).toBe(-3);
    // -8/2 = -4
    expect(evalRPN(['-8', '2', '/'])).toBe(-4);
  });

  test('mixed operations', () => {
    expect(evalRPN(['2', '1', '+', '3', '*'])).toBe(9);
    expect(evalRPN(['1', '2', '+', '3', '4', '+', '*'])).toBe(21); // (1+2)*(3+4)=21
  });

  test('large numbers', () => {
    expect(evalRPN(['100', '50', '+'])).toBe(150);
    expect(evalRPN(['100', '50', '-'])).toBe(50);
  });
});

describe('evalRPNRecursive (same behaviour)', () => {
  test('Example 1', () => {
    expect(evalRPNRecursive(['2', '1', '+', '3', '*'])).toBe(9);
  });
  test('Example 2', () => {
    expect(evalRPNRecursive(['4', '13', '5', '/', '+'])).toBe(6);
  });
  test('Example 3', () => {
    expect(evalRPNRecursive(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'])).toBe(22);
  });
  test('division truncate and negatives', () => {
    expect(evalRPNRecursive(['-7', '2', '/'])).toBe(-3);
    expect(evalRPNRecursive(['7', '-2', '/'])).toBe(-3);
  });
});
