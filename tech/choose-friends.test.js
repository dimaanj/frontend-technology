const { chooseFriends } = require('./choose-friends');

describe('chooseFriends', () => {
  it('example: invite first and last', () => {
    expect(chooseFriends([[3, 1], [1, 3], [5, 3]])).toBe(4);
  });

  it('empty list', () => {
    expect(chooseFriends([])).toBe(0);
  });

  it('single friend', () => {
    expect(chooseFriends([[10, 5]])).toBe(5);
  });

  it('all can come (ratio <= 2)', () => {
    expect(chooseFriends([[2, 1], [3, 2], [4, 1]])).toBe(4);
  });

  it('only one salary band', () => {
    expect(chooseFriends([[5, 1], [5, 2], [5, 3]])).toBe(6);
  });
});
