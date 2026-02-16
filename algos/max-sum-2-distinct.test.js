const { maxSumAtMost2Distinct } = require('./max-sum-2-distinct');

describe('maxSumAtMost2Distinct', () => {
  it('пустой массив', () => {
    expect(maxSumAtMost2Distinct([])).toBe(0);
  });

  it('один элемент', () => {
    expect(maxSumAtMost2Distinct([5])).toBe(5);
    expect(maxSumAtMost2Distinct([-3])).toBe(-3);
  });

  it('один уникальный элемент', () => {
    expect(maxSumAtMost2Distinct([1, 1, 1, 1])).toBe(4);
    expect(maxSumAtMost2Distinct([2, 2, 2])).toBe(6);
  });

  it('два уникальных элемента', () => {
    expect(maxSumAtMost2Distinct([1, 2, 1, 2])).toBe(6);
    expect(maxSumAtMost2Distinct([5, 3, 5, 3])).toBe(16);
  });

  it('выбор лучшего из двух окон', () => {
    expect(maxSumAtMost2Distinct([1, 1, 1, -100, 2, 2, 2])).toBe(6); // [2,2,2]
    expect(maxSumAtMost2Distinct([3, 3, -5, 4, 4, 4])).toBe(12); // [4,4,4]
  });

  it('все отрицательные', () => {
    expect(maxSumAtMost2Distinct([-1, -2, -1, -2])).toBe(-1); // [-1] или [-2]
    expect(maxSumAtMost2Distinct([-5, -3, -5])).toBe(-3); // [-3]
  });

  it('три элемента — нужен выбор двух', () => {
    expect(maxSumAtMost2Distinct([1, 2, 3])).toBe(5); // [2,3]
    expect(maxSumAtMost2Distinct([1, 10, 3])).toBe(13); // [10,3]
  });
});
