/**
 * Возвращает обработчик, который выводит сообщения последовательно по id (1, 2, 3, ...),
 * даже если они приходят асинхронно в разном порядке.
 */
const messagesProcessor = () => {
  const messages = new Map();
  let expectedId = 1;

  return (id, message) => {
    messages.set(id, message);
    while (messages.has(expectedId)) {
      const message = messages.get(expectedId);
      console.log(`Сообщение ${expectedId}: ${message}`);
      expectedId++;
    }
  };
};

// Пример использования (как в задании)
const process = messagesProcessor();
setTimeout(() => process(5, "Сообщение 5"), 500);
setTimeout(() => process(1, "Сообщение 1"), 100);
setTimeout(() => process(3, "Сообщение 3"), 300);
setTimeout(() => process(2, "Сообщение 2"), 200);
setTimeout(() => process(4, "Сообщение 4"), 400);
setTimeout(() => process(7, "Сообщение 7 с большой задержкой"), 2000);
setTimeout(() => process(6, "Сообщение 6"), 600);


// setTimeout(() => console.log("end"), 5000);
