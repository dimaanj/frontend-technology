const { makeGreat } = require('./make-great');

describe('makeGreat', () => {
  it('пример 1', () => {
    expect(makeGreat([3, 2, 0, 1, 1, 4], 4)).toEqual([4, 2, 0, 4, 1, 4]);
  });

  it('пример 2', () => {
    expect(makeGreat([5, 0, 2, 0, 0, 6], 4)).toEqual([5, 0, 4, 0, 0, 6]);
  });

  it('пример 3', () => {
    expect(makeGreat([5, 0, 0, 0, 0, 6], 4)).toEqual([5, 0, 0, 4, 0, 6]);
  });

  it('массив длины < 3 возвращается без изменений', () => {
    expect(makeGreat([1, 2], 4)).toEqual([1, 2]);
  });

  it('уже великий массив не меняется', () => {
    expect(makeGreat([5, 5, 5], 4)).toEqual([5, 5, 5]);
  });
});
