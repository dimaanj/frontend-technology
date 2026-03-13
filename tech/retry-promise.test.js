const { retryPromise } = require('./retry-promise');

describe('retryPromise (template)', () => {
  it('возвращает результат при успехе с первой попытки', async () => {
    const fn = jest.fn().mockResolvedValue('ok');

    await expect(retryPromise(fn, 3)).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('повторяет попытки при ошибке и успешно завершается', async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error('failed-1'))
      .mockRejectedValueOnce(new Error('failed-2'))
      .mockResolvedValue('success');

    await expect(retryPromise(fn, 3)).resolves.toBe('success');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('бросает последнюю ошибку, если попытки закончились', async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error('failed-1'))
      .mockRejectedValueOnce(new Error('failed-2'))
      .mockRejectedValueOnce(new Error('failed-3'))
      .mockRejectedValueOnce(new Error('failed-4'));

    await expect(retryPromise(fn, 3)).rejects.toThrow('failed-4');
    expect(fn).toHaveBeenCalledTimes(4); // 1 попытка + 3 retry
  });

  it('при retries = 0 делает только одну попытку', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('single-attempt'));

    await expect(retryPromise(fn, 0)).rejects.toThrow('single-attempt');
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
