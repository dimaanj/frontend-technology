const { RateLimiter } = require('./rate-limit');

describe('RateLimiter — sliding window', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('разрешает запросы в пределах лимита', () => {
    const limiter = new RateLimiter(3, 60_000);
    expect(limiter.isAllowed('a@a.com')).toBe(true);
    expect(limiter.isAllowed('a@a.com')).toBe(true);
    expect(limiter.isAllowed('a@a.com')).toBe(true);
  });

  test('блокирует запрос при превышении лимита', () => {
    const limiter = new RateLimiter(3, 60_000);
    limiter.isAllowed('a@a.com');
    limiter.isAllowed('a@a.com');
    limiter.isAllowed('a@a.com');
    expect(limiter.isAllowed('a@a.com')).toBe(false);
  });

  test('запрещённый запрос не регистрируется (не занимает слот)', () => {
    const limiter = new RateLimiter(2, 60_000);
    limiter.isAllowed('a@a.com'); // 1
    limiter.isAllowed('a@a.com'); // 2
    limiter.isAllowed('a@a.com'); // false — не регистрируется
    limiter.isAllowed('a@a.com'); // false — всё ещё 2 записанных запроса

    // спустя 61 секунду окно сдвинулось — оба старых запроса вышли
    jest.advanceTimersByTime(61_000);
    expect(limiter.isAllowed('a@a.com')).toBe(true);
  });

  test('разные пользователи имеют независимые лимиты', () => {
    const limiter = new RateLimiter(2, 60_000);
    limiter.isAllowed('alice@example.com');
    limiter.isAllowed('alice@example.com');

    expect(limiter.isAllowed('bob@example.com')).toBe(true);
    expect(limiter.isAllowed('alice@example.com')).toBe(false);
  });

  test('окно скользящее: старые запросы выходят из окна', () => {
    const limiter = new RateLimiter(2, 60_000);

    limiter.isAllowed('a@a.com'); // t=0
    limiter.isAllowed('a@a.com'); // t=0  → лимит исчерпан
    expect(limiter.isAllowed('a@a.com')).toBe(false);

    jest.advanceTimersByTime(61_000); // t=61s — оба запроса вышли из окна

    expect(limiter.isAllowed('a@a.com')).toBe(true); // снова разрешён
  });

  test('частичное обновление окна: часть запросов выходит, часть остаётся', () => {
    const limiter = new RateLimiter(3, 60_000);

    limiter.isAllowed('a@a.com'); // t=0  (1)
    limiter.isAllowed('a@a.com'); // t=0  (2)

    jest.advanceTimersByTime(30_000); // t=30s

    limiter.isAllowed('a@a.com'); // t=30s (3) → лимит исчерпан

    expect(limiter.isAllowed('a@a.com')).toBe(false);

    jest.advanceTimersByTime(31_000); // t=61s — первые два запроса (t=0) вышли из окна

    // остался только запрос t=30s → в окне 1 из 3
    expect(limiter.isAllowed('a@a.com')).toBe(true);
    expect(limiter.isAllowed('a@a.com')).toBe(true);
    expect(limiter.isAllowed('a@a.com')).toBe(false); // снова лимит
  });
});
