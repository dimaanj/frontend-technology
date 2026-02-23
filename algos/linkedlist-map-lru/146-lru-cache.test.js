const { LRUCache } = require('./146-lru-cache');

/**
 * Запускает последовательность операций в формате LeetCode и возвращает массив результатов.
 * @param {string[]} operations - ["LRUCache", "put", "get", ...]
 * @param {Array[]} args - [[2], [1, 1], [1], ...]
 * @returns {Array} - массив возвращаемых значений (null для put)
 */
function runLRU(operations, args) {
  let cache = null;
  const output = [];
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const arg = args[i];
    switch (op) {
      case 'LRUCache':
        cache = new LRUCache(arg[0]);
        output.push(null);
        break;
      case 'get':
        output.push(cache.get(arg[0]));
        break;
      case 'put':
        cache.put(arg[0], arg[1]);
        output.push(null);
        break;
      default:
        throw new Error(`Unknown operation: ${op}`);
    }
  }
  return output;
}

describe('LRU Cache - LeetCode 146', () => {
  test('Example 1 from problem statement', () => {
    const operations = ['LRUCache', 'put', 'put', 'get', 'put', 'get', 'put', 'get', 'get', 'get'];
    const args = [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]];
    const expected = [null, null, null, 1, null, -1, null, -1, 3, 4];
    expect(runLRU(operations, args)).toEqual(expected);
  });

  test('capacity 1: put overwrites, get returns current', () => {
    const cache = new LRUCache(1);
    cache.put(1, 10);
    expect(cache.get(1)).toBe(10);
    cache.put(2, 20); // вытесняет (1,10)
    expect(cache.get(1)).toBe(-1);
    expect(cache.get(2)).toBe(20);
  });

  test('get of missing key returns -1', () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    expect(cache.get(2)).toBe(-1);
    expect(cache.get(1)).toBe(1);
  });

  test('put same key updates value and refreshes LRU order', () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(1, 10); // обновление, 1 становится MRU
    cache.put(3, 3);  // вытесняется 2 (LRU), не 1
    expect(cache.get(1)).toBe(10);
    expect(cache.get(2)).toBe(-1);
    expect(cache.get(3)).toBe(3);
  });

  test('get refreshes LRU: touched key is not evicted next', () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.get(1);     // 1 становится MRU
    cache.put(3, 3);  // вытесняется 2
    expect(cache.get(2)).toBe(-1);
    expect(cache.get(1)).toBe(1);
    expect(cache.get(3)).toBe(3);
  });

  test('capacity 2: two keys then evict LRU on third put', () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    expect(cache.get(1)).toBe(1);
    cache.put(3, 3);   // вытесняет 2
    expect(cache.get(2)).toBe(-1);
    expect(cache.get(3)).toBe(3);
  });

  test('multiple get and put, eviction order follows LRU', () => {
    const operations = ['LRUCache', 'put', 'put', 'get', 'put', 'get', 'put', 'get', 'get', 'get'];
    const args = [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]];
    expect(runLRU(operations, args)).toEqual([null, null, null, 1, null, -1, null, -1, 3, 4]);
  });

  test('capacity 3: no eviction until fourth key', () => {
    const cache = new LRUCache(3);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3);
    expect(cache.get(1)).toBe(1);
    expect(cache.get(2)).toBe(2);
    expect(cache.get(3)).toBe(3);
    cache.put(4, 4);   // вытесняет 1 (если порядок вставки = LRU и get не менял порядок в реализации)
    // Зависит от реализации: при двусвязном списке LRU = tail.prev, MRU = head.next.
    // После put(1), put(2), put(3) порядок MRU->LRU: 3, 2, 1. Вытесняется 1.
    expect(cache.get(1)).toBe(-1);
    expect(cache.get(4)).toBe(4);
  });

  test('get then put same key: value updated, key stays MRU', () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.get(1);
    cache.put(1, 100);
    cache.put(3, 3);   // вытесняет 2
    expect(cache.get(1)).toBe(100);
    expect(cache.get(2)).toBe(-1);
    expect(cache.get(3)).toBe(3);
  });

  test('empty get returns -1', () => {
    const cache = new LRUCache(1);
    expect(cache.get(0)).toBe(-1);
  });

  test('key 0 and value 0 are valid', () => {
    const cache = new LRUCache(2);
    cache.put(0, 0);
    expect(cache.get(0)).toBe(0);
    cache.put(1, 1);
    cache.put(2, 2);   // вытесняет 0
    expect(cache.get(0)).toBe(-1);
    expect(cache.get(2)).toBe(2);
  });

  test('capacity 1: update same key does not evict', () => {
    const cache = new LRUCache(1);
    cache.put(1, 1);
    cache.put(1, 2);
    expect(cache.get(1)).toBe(2);
  });

  test('eviction order: least recently used is at tail', () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.get(2);       // 2 в голову, 1 остаётся LRU
    cache.put(3, 3);    // вытесняет 1
    expect(cache.get(1)).toBe(-1);
    expect(cache.get(2)).toBe(2);
    expect(cache.get(3)).toBe(3);
  });
});
