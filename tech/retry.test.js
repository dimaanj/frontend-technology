const { retry } = require('./retry');

describe('retry', () => {
  it('возвращает результат при успехе с первой попытки', async () => {
    const fn = jest.fn().mockResolvedValue('ok');
    const result = await retry(fn, { count: 3, delay: 10 });
    expect(result).toBe('ok');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('повторяет вызов при ошибке и ждёт delay между попытками', async () => {
    const fn = jest.fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('success');
    const start = Date.now();
    const result = await retry(fn, { count: 3, delay: 50 });
    const elapsed = Date.now() - start;
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(3);
    expect(elapsed).toBeGreaterThanOrEqual(100); // 2 паузы по 50ms
  });

  it('бросает последнюю ошибку, если все попытки неудачны', async () => {
    const err = new Error('all failed');
    const fn = jest.fn().mockRejectedValue(err);
    await expect(retry(fn, { count: 3, delay: 1 })).rejects.toThrow('all failed');
    expect(fn).toHaveBeenCalledTimes(3);
  });
});
