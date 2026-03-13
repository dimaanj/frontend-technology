/**
 * Примеры использования Async Iterator в JavaScript
 *
 * Async iterator (for await...of, Symbol.asyncIterator) нужен, когда данные
 * приходят асинхронно по одному элементу: стримы, пагинация API, очереди событий.
 *
 * Запуск примеров: node tech/async-iterator-examples.js
 */

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const { Readable } = require('stream');
const fs = require('fs');
const path = require('path');

// В Node.js 10+ стримы реализуют Symbol.asyncIterator — их можно обходить через for await...of

// ---------------------------------------------------------------------------
// 1. Async generator (async function*)
// Ленивая последовательность: следующий элемент запрашивается только при next()
// ---------------------------------------------------------------------------

async function* fetchPages(pageSize = 2) {
  let page = 0;
  while (true) {
    await delay(50); // имитация запроса к API
    const items = Array.from({ length: pageSize }, (_, i) => `item-${page * pageSize + i}`);
    if (items.length === 0) return;
    yield items;
    page++;
    if (page >= 3) return; // ограничиваем для примера
  }
}

// ---------------------------------------------------------------------------
// 2. Кастомный async iterable через Symbol.asyncIterator
// Полный контроль над тем, что возвращает каждый next()
// ---------------------------------------------------------------------------

const asyncIterable = {
  data: ['a', 'b', 'c'],
  delayMs: 30,

  [Symbol.asyncIterator]() {
    let i = 0;
    const self = this;
    return {
      async next() {
        if (i >= self.data.length) {
          return { done: true, value: undefined };
        }
        await delay(self.delayMs);
        const value = self.data[i++];
        return { done: false, value };
      },
    };
  },
};

// ---------------------------------------------------------------------------
// 3. Async generator для "ленивого" последовательного выполнения
// Каждый yield — после завершения одной асинхронной операции
// ---------------------------------------------------------------------------

async function* sequentialAsync(items, asyncFn) {
  for (const item of items) {
    const result = await asyncFn(item);
    yield result;
  }
}

// ---------------------------------------------------------------------------
// 4. Node.js Readable streams — чтение по кускам без загрузки всего в память
//    (файл, HTTP-ответ, логи). У Node-стримов есть [Symbol.asyncIterator].
// ---------------------------------------------------------------------------

/**
 * Чтение стрима по кускам через for await...of.
 * Аналог чтения файла: fs.createReadStream(path). Вместо файла — стрим из строк.
 */
async function readStreamInChunks(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return chunks;
}

/** Создаёт Readable-стрим из массива (имитация кусков файла или HTTP body). */
function createReadableFromChunks(chunks) {
  return Readable.from(chunks, { objectMode: true });
}

/**
 * Пример: как читают файл по кускам в Node.js.
 * В реальном коде: const stream = fs.createReadStream('file.txt', { encoding: 'utf8' });
 */
async function exampleNodeStream() {
  const stream = createReadableFromChunks(['chunk1\n', 'chunk2\n', 'chunk3\n']);
  const chunks = await readStreamInChunks(stream);
  return chunks;
}

// ---------------------------------------------------------------------------
// 5. Web APIs: ReadableStream.getReader() — чтение body по частям (fetch, браузер)
//    В Node.js 18+ fetch и Response тоже дают web ReadableStream.
// ---------------------------------------------------------------------------

/**
 * Обход ReadableStream через reader.read() в цикле.
 * В браузере: response = await fetch(url); stream = response.body;
 * В Node 18+: то же для fetch().
 */
async function readWebStream(readableStream) {
  const reader = readableStream.getReader();
  const chunks = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return chunks;
}

/** Создаёт Web ReadableStream из массива (для примера без реального fetch). */
function createWebReadableStream(chunks) {
  return new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(chunk);
      }
      controller.close();
    },
  });
}

// ---------------------------------------------------------------------------
// 6. Очередь событий — каждый next() ждёт следующее сообщение
//    Продюсеры пушат в очередь, потребитель итерирует через for await...of.
// ---------------------------------------------------------------------------

class AsyncMessageQueue {
  constructor() {
    this._queue = [];
    this._resolveWait = null; // резолвер для ожидающего next()
  }

  push(value) {
    this._queue.push(value);
    if (this._resolveWait) {
      this._resolveWait();
      this._resolveWait = null;
    }
  }

  close() {
    this.push(Symbol.for('AsyncMessageQueue.END'));
  }

  [Symbol.asyncIterator]() {
    const self = this;
    return {
      async next() {
        while (self._queue.length === 0) {
          const value = await new Promise((resolve) => {
            self._resolveWait = resolve;
          });
        }
        const value = self._queue.shift();
        if (value === Symbol.for('AsyncMessageQueue.END')) {
          return { done: true, value: undefined };
        }
        return { done: false, value };
      },
    };
  }
}

/** Пример: продюсер шлёт сообщения с задержкой, потребитель читает по одному. */
async function exampleMessageQueue() {
  const queue = new AsyncMessageQueue();
  const received = [];

  const consumer = (async () => {
    for await (const msg of queue) {
      received.push(msg);
    }
  })();

  queue.push('first');
  await delay(30);
  queue.push('second');
  await delay(30);
  queue.push('third');
  queue.close();

  await consumer;
  return received;
}

// ---------------------------------------------------------------------------
// Примеры использования (for await...of)
// ---------------------------------------------------------------------------

async function runExamples() {
  console.log('--- 1. Async generator (пагинация) ---');
  for await (const page of fetchPages(2)) {
    console.log('  page:', page);
  }

  console.log('\n--- 2. Кастомный async iterable ---');
  for await (const value of asyncIterable) {
    console.log('  value:', value);
  }

  console.log('\n--- 3. Sequential async generator ---');
  const postData = async (item) => {
    await delay(20);
    return `posted: ${item}`;
  };
  for await (const result of sequentialAsync(['x', 'y', 'z'], postData)) {
    console.log('  result:', result);
  }

  console.log('\n--- 4. Ручной вызов next() ---');
  const gen = fetchPages(1);
  const step1 = await gen.next();
  console.log('  step1:', step1);
  const step2 = await gen.next();
  console.log('  step2:', step2);

  console.log('\n--- 5. Node.js Readable stream (чтение по кускам) ---');
  const fileChunks = await exampleNodeStream();
  console.log('  chunks:', fileChunks);

  console.log('\n--- 6. Web ReadableStream.getReader() ---');
  const webStream = createWebReadableStream(['web1', 'web2', 'web3']);
  const webChunks = await readWebStream(webStream);
  console.log('  web chunks:', webChunks);

  console.log('\n--- 7. Очередь событий (next() ждёт сообщение) ---');
  const queueReceived = await exampleMessageQueue();
  console.log('  received:', queueReceived);
}

runExamples().catch(console.error);

module.exports = {
  fetchPages,
  asyncIterable,
  sequentialAsync,
  readStreamInChunks,
  createReadableFromChunks,
  exampleNodeStream,
  readWebStream,
  createWebReadableStream,
  AsyncMessageQueue,
  exampleMessageQueue,
};
