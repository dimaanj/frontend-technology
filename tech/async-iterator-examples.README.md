# Примеры Async Iterator

Файл: `async-iterator-examples.js`

## Когда нужен async iterator

- **Стримы** — чтение по кускам (файл, HTTP, логи) без загрузки всего в память
- **Web APIs** — `ReadableStream.getReader()`, чтение body по частям (fetch, браузер)
- **Очереди событий** — каждый `next()` ждёт следующее сообщение
- **Пагинация API** — следующая страница запрашивается только при обращении к `next()`
- **Ленивая последовательность** — элементы появляются асинхронно по одному

Обычный массив уже целиком в памяти — для него достаточно `for...of`. Async iterator — когда данные «приходят со временем».

---

## 1. Async generator (пагинация)

`async function* fetchPages(pageSize)` — имитация пагинации: каждая итерация «запрашивает» следующую страницу.

```js
for await (const page of fetchPages(2)) {
  console.log(page); // ['item-0', 'item-1'], затем ['item-2', 'item-3'], ...
}
```

---

## 2. Кастомный async iterable

Объект с `[Symbol.asyncIterator]()`, возвращающий итератор, у которого `next()` возвращает промис.

```js
for await (const value of asyncIterable) {
  console.log(value); // 'a', 'b', 'c' с задержкой между ними
}
```

---

## 3. Sequential async generator

Ленивый аналог sequentialPromises: каждый `yield` после `await asyncFn(item)`.

```js
for await (const result of sequentialAsync(['x', 'y', 'z'], postData)) {
  console.log(result);
}
```

---

## 4. Node.js Readable streams

В Node.js 10+ стримы реализуют `Symbol.asyncIterator`. Чтение файла или HTTP-ответа по кускам без загрузки всего в память.

**Чтение стрима по кускам:**

```js
const chunks = [];
for await (const chunk of stream) {
  chunks.push(chunk);
}
```

**Реальный файл:**

```js
const fs = require('fs');
const stream = fs.createReadStream('file.txt', { encoding: 'utf8' });
for await (const chunk of stream) {
  process.stdout.write(chunk);
}
```

В файле примеры: `readStreamInChunks(stream)`, `createReadableFromChunks([...])`, `exampleNodeStream()`.

---

## 5. Web APIs: ReadableStream.getReader()

В браузере и в Node.js 18+ (fetch) тело ответа — это Web `ReadableStream`. Чтение по частям через `reader.read()`.

**Паттерн обхода:**

```js
const reader = response.body.getReader();
try {
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    console.log(value); // Uint8Array chunk
  }
} finally {
  reader.releaseLock();
}
```

В файле: `readWebStream(readableStream)`, `createWebReadableStream([...])` для примера без реального fetch.

---

## 6. Очередь событий

Класс `AsyncMessageQueue`: продюсеры вызывают `queue.push(msg)`, потребитель итерирует через `for await...of`. Каждый `next()` ждёт следующее сообщение; при `queue.close()` итерация завершается.

```js
const queue = new AsyncMessageQueue();

const consumer = (async () => {
  for await (const msg of queue) {
    console.log(msg);
  }
})();

queue.push('first');
queue.push('second');
queue.close();
await consumer;
```

В файле: `AsyncMessageQueue`, `exampleMessageQueue()`.

---

## Запуск

```bash
node tech/async-iterator-examples.js
```

Скрипт выводит все примеры по очереди; из-за задержек выполнение займёт несколько секунд.
