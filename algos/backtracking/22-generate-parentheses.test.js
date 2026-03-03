const { generateParenthesis } = require('./22-generate-parentheses');

const sortResult = (res) => res.slice().sort();

describe('Generate Parentheses - LeetCode 22', () => {
  test('Example 1: n = 3', () => {
    const result = generateParenthesis(3);
    const expected = ['((()))', '(()())', '(())()', '()(())', '()()()'];
    expect(result).toHaveLength(expected.length);
    expect(sortResult(result)).toEqual(sortResult(expected));
  });

  test('Example 2: n = 1', () => {
    expect(generateParenthesis(1)).toEqual(['()']);
  });

  test('n = 2', () => {
    const result = generateParenthesis(2);
    const expected = ['(())', '()()'];
    expect(result).toHaveLength(expected.length);
    expect(sortResult(result)).toEqual(sortResult(expected));
  });
});
