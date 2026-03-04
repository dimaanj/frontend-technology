const { buildRoute } = require('./build-route');

describe('buildRoute', () => {
  it('Example 1: A -> B -> C -> D -> E', () => {
    const input = [
      { from: 'C', to: 'D' },
      { from: 'B', to: 'C' },
      { from: 'A', to: 'B' },
      { from: 'D', to: 'E' },
    ];
    const expected = [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' },
      { from: 'C', to: 'D' },
      { from: 'D', to: 'E' },
    ];
    expect(buildRoute(input)).toEqual(expected);
  });

  it('Example 2: NY -> London -> Moscow -> SPb', () => {
    const input = [
      { from: 'London', to: 'Moscow' },
      { from: 'NY', to: 'London' },
      { from: 'Moscow', to: 'SPb' },
    ];
    const expected = [
      { from: 'NY', to: 'London' },
      { from: 'London', to: 'Moscow' },
      { from: 'Moscow', to: 'SPb' },
    ];
    expect(buildRoute(input)).toEqual(expected);
  });

  it('Example 3: Tokio -> NY -> London -> Moscow -> SPb -> Berlin', () => {
    const input = [
      { from: 'London', to: 'Moscow' },
      { from: 'Tokio', to: 'NY' },
      { from: 'NY', to: 'London' },
      { from: 'SPb', to: 'Berlin' },
      { from: 'Moscow', to: 'SPb' },
    ];
    const expected = [
      { from: 'Tokio', to: 'NY' },
      { from: 'NY', to: 'London' },
      { from: 'London', to: 'Moscow' },
      { from: 'Moscow', to: 'SPb' },
      { from: 'SPb', to: 'Berlin' },
    ];
    expect(buildRoute(input)).toEqual(expected);
  });
});
