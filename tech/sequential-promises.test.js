const { sequentialPromises } = require('./sequential-promises');

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

describe('sequentialPromises', () => {
  it('возвращает [] для пустого массива', async () => {
    const asyncFn = jest.fn();
    const results = await sequentialPromises([], asyncFn);
    expect(results).toEqual([]);
    expect(asyncFn).not.toHaveBeenCalled();
  });

  it('вызывает asyncFn для каждого элемента по очереди и возвращает результаты', async () => {
    const items = ['item1', 'item2', 'item3'];
    const postData = async (item) => {
      await delay(50);
      return `posted: ${item}`;
    };

    const results = await sequentialPromises(items, postData);

    expect(results).toEqual(['posted: item1', 'posted: item2', 'posted: item3']);
  });

  it('выполняет вызовы последовательно (следующий только после предыдущего)', async () => {
    const order = [];
    const asyncFn = jest.fn().mockImplementation(async (item) => {
      order.push(`start-${item}`);
      await delay(30);
      order.push(`end-${item}`);
      return item;
    });

    await sequentialPromises(['a', 'b', 'c'], asyncFn);

    expect(order).toEqual(['start-a', 'end-a', 'start-b', 'end-b', 'start-c', 'end-c']);
  });

  it('при ошибке останавливается и бросает её', async () => {
    const asyncFn = jest.fn().mockImplementation(async (item) => {
      if (item === 'item2') throw new Error('fail');
      return item;
    });

    await expect(sequentialPromises(['item1', 'item2', 'item3'], asyncFn)).rejects.toThrow('fail');
    expect(asyncFn).toHaveBeenCalledTimes(2); // item1, item2 — на item2 падает
  });
});
