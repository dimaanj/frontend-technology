const { getConcated } = require('./get-concated');

describe('getConcated', () => {
  it('example 1', () => {
    const arr = [
      { value: 'aabb', order: 1, expired: false },
      { value: 'bbaa', order: 2, expired: false },
    ];
    expect(getConcated(arr)).toBe('ba');
  });

  it('example 2', () => {
    const arr = [
      { value: 'hello', order: 1, expired: false },
      { value: 'world', order: 2, expired: false },
    ];
    expect(getConcated(arr)).toBe('olehdrw');
  });
});
