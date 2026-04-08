// TODO: реализуйте ограничение параллельности:
// - одновременно выполняется не более `limit` промисов
// - как только один промис завершается, запускается следующий из очереди
// - результаты собираются в массив в том же порядке, что и исходный массив tasks
// - если задача падает, ошибка должна оказаться в соответствующей позиции результата,
//   при этом остальные задачи продолжают выполняться

async function promiseLimit4(tasks, limit) {
  const result = [];
  const workers = [];

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i]()
      .then((data) => {
        result.push(data);
        workers.filter((cur) => cur !== task);
      })
      .catch((error) => {
        result.push(error);
        workers.filter((cur) => cur !== task);
      });

    workers.push(task);

    if (workers.length === limit) {
      await Promise.race(workers);
    }
  }

  await Promise.all(workers);
  return result;
}

async function promiseLimit2(tasks, limit) {
  const results = [];
  const executing = [];
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i]()
      .then((result) => {
        results[i] = result;
        executing.splice(executing.indexOf(task), 1);
        return result;
      })
      .catch((error) => {
        results[i] = { error };
        executing.splice(executing.indexOf(task), 1);
      });

    executing.push(task);

    if (executing.length >= limit) {
      await Promise.race(executing);
    }
  }
  await Promise.all(executing);
  return results;
}

async function promiseLimit(tasks, limit) {
  const result = [];
  const runners = [];
  let index = 0;

  function getRunnable(task) {
    index++;
    return task()
      .then((data) => {
        result.push(data);
        
      })
      .catch((error) => {
        result.push(error);
      })
      .then(() => {
        if(index <= tasks.length) {
          const runnable = getRunnable(tasks[index]);
          runnable();
        }
      });
  }

  for(let i = 0; i < Math.min(limit, tasks.length); i++) {
    runners.push(getRunnable(tasks[index]))
  }

  await Promise.all(runners);
  return result;
}

/**
 * Ограничивает количество одновременно выполняющихся промисов.
 *
 * @param {Array<() => Promise<any>>} tasks - массив функций без аргументов, каждая возвращает Promise
 * @param {number} limit - максимальное количество одновременно выполняющихся задач
 * @returns {Promise<Array<any>>} - промис с массивом результатов в исходном порядке
 */
async function promiseLimit1(tasks, limit) {
  if (!tasks.length) return [];

  const res = [];

  let nextIndex = 0;
  const runners = [];

  function run(fn, index) {
    return fn()
      .then((data) => {
        res[index] = data;
      })
      .catch((error) => {
        res[index] = error;
      })
      .then(() => {
        if (nextIndex < tasks.length) {
          return run(tasks[nextIndex], nextIndex++);
        }
      });
  }

  for (let i = 0; i < Math.min(limit, tasks.length); i++) {
    runners.push(run(tasks[i], nextIndex++));
  }

  await Promise.all(runners);

  return res;

  // Решение
  // либо запустить первые limit задач и await‑ить, пока они завершаются (например, через Promise.race и очередь),
  // либо завести «воркеры» (до limit штук), каждый из которых в своём цикле с await берёт следующую задачу из общей очереди.
}

// Пример использования:
// const tasks = urls.map(url => () => fetch(url));
// const results = await promiseLimit(tasks, 3);
// // одновременно выполняется не более 3 запросов

module.exports = { promiseLimit };
