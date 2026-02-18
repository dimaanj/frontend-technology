/**
 * 642. Design Search Autocomplete System
 *
 * Условие задачи (перевод):
 *
 * Нужно спроектировать систему автодополнения для поисковой строки, которая предлагает
 * предложения (фразы) по мере ввода символов пользователем.
 *
 * Начальная настройка:
 * - Даны массив предложений sentences и массив счётчиков times (оба длины n).
 * - sentences[i] — ранее введённая фраза.
 * - times[i] — сколько раз эта фраза была введена.
 *
 * Как работает система:
 * - Пользователь вводит символы по одному, формируя фразу.
 * - Каждая фраза заканчивается специальным символом '#'.
 * - Для каждого введённого символа (кроме '#') система возвращает топ-3 самых частых
 *   предложений, начинающихся с уже введённого префикса.
 *
 * Правила ранжирования:
 * - Предложения упорядочены по «горячности» (частоте ввода).
 * - Более частые идут первыми.
 * - При одинаковой частоте — сортировка по ASCII (лексикографически).
 * - Если подходящих фраз меньше 3 — вернуть все подходящие.
 *
 * Особое поведение:
 * - Ввод '#' означает завершение текущей фразы.
 * - Завершённая фраза добавляется в систему (если уже есть — счётчик увеличивается на 1).
 * - После ввода '#' вернуть пустой список и сбросить состояние для следующей фразы.
 *
 * Требования к реализации:
 * - Класс AutocompleteSystem с двумя методами:
 *   - AutocompleteSystem(sentences, times) — конструктор, инициализация историческими данными.
 *   - input(c) — обработка одного символа:
 *     - если c == '#' — сохранить текущую фразу и вернуть [];
 *     - иначе — вернуть список до 3 предложений по текущему префиксу.
 *
 * Пример: при вводе "i" → " " → "a":
 * - после "i"   → топ-3 фразы, начинающиеся с "i";
 * - после "i "  → топ-3 с "i ";
 * - после "i a" → топ-3 с "i a";
 * - после "i a#" → сохранить "i a", вернуть [].
 *
 * Сигнатура (как на LeetCode):
 *
 *   class AutocompleteSystem {
 *     constructor(sentences: string[], times: number[])
 *     input(c: string): string[]
 *   }
 *
 *   AutocompleteSystem(sentences, times) — конструктор
 *   input(c) — один символ; возвращает string[] (до 3 подсказок или [] при c === '#')
 */

/**
 * Min-куча для кортежей [sentence, count].
 * В корне — «минимальный» по компаратору элемент (худший кандидат для топ-k).
 * Компаратор по умолчанию: меньше count → хуже; при равенстве count — больше строка (lex) → хуже.
 */
/** «Меньше» = хуже кандидат (ниже count; при равенстве — строка больше по lex). В корне кучи — худший для вытеснения. */
function defaultTupleComparator(a, b) {
  const [, cA] = a;
  const [, cB] = b;
  if (cA !== cB) return cA - cB;
  return b[0].localeCompare(a[0]);
}

class MinHeap {
  constructor(comparator = defaultTupleComparator) {
    this.heap = [];
    this.comparator = comparator;
  }

  add(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  poll() {
    if (this.size() === 0) return null;
    const top = this.heap[0];
    const end = this.heap.pop();
    if (this.size() > 0) {
      this.heap[0] = end;
      this.bubbleDown(0);
    }
    return top;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.comparator(this.heap[parent], this.heap[index]) <= 0) break;
      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];
      index = parent;
    }
  }

  bubbleDown(index) {
    const length = this.size();
    while (true) {
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      let smallest = index;

      if (
        left < length &&
        this.comparator(this.heap[left], this.heap[smallest]) < 0
      ) {
        smallest = left;
      }
      if (
        right < length &&
        this.comparator(this.heap[right], this.heap[smallest]) < 0
      ) {
        smallest = right;
      }
      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap.length === 0 ? null : this.heap[0];
  }
}

class Node {
  constructor() {
    this.children = new Map(); // ch -> Node

    // A
    this.counts = new Map(); // sentence -> count
    // на добавление предложения -> # -> обновляем счетчик на каждом узле
    // на запрос подсказок берем из узла префиса список, сортируем по count (убываение), предложение (возрастание)

    // B
    this.sentence = ""; // если конец слова
    this.counter = 0;
    // на запрос подсказок -> делаем dfs по дереву и собираем все пары (предложение, счетчик) из концов слов, сортируем, берем топ 3

    // C
    this.sentences = [];
    // храним уже отсортированный список в узле по (count, sentence)
    // при добавлении -> пересчитываем его вдоль пути
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  /**
   * @param {string} word
   * @return {void}
   */
  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      if (!node.children.has(ch)) {
        node.children.set(ch, new Node());
      }
      node = node.children.get(ch);
    }
    node.terminal = true;
  }

  /**
   * @param {string} word
   * @return {boolean}
   */
  search(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      if (!node.children.has(ch)) {
        return false;
      }
      node = node.children.get(ch);
    }
    return node.terminal;
  }

  /**
   * @param {string} prefix
   * @return {boolean}
   */
  startsWith(prefix) {
    let node = this.root;
    for (let i = 0; i < prefix.length; i++) {
      const ch = prefix[i];
      if (!node.children.has(ch)) {
        return false;
      }
      node = node.children.get(ch);
    }
    return true;
  }
}

/**
 * Система автодополнения (LeetCode 642).
 * Конструктор и input(c) — единственный публичный API, как на LeetCode.
 */
class AutocompleteSystem1 {
  /**
   * @param {string[]} sentences — ранее введённые фразы
   * @param {number[]} times — times[i] = сколько раз вводили sentences[i]
   */
  constructor(sentences, times) {
    this.root = new Node();
    this.current = "";

    for (let i = 0; i < (sentences || []).length; i++) {
      this._addSentence(sentences[i], times[i]);
    }
  }

  /**
   * Обработка одного символа (как на LeetCode).
   * @param {string} c — один символ; '#' означает конец фразы
   * @return {string[]} — до 3 подсказок по текущему префиксу, либо [] при c === '#'
   */
  input(c) {
    if (c === "#") {
      if (this.current.length > 0) {
        this._addSentence(this.current, 1);
      }
      this.current = "";
      return [];
    }
    this.current = this.current + c;
    return this._top3(this.current);
  }

  /** @param {string} sentence @param {number} delta */
  _addSentence(sentence, delta = 1) {
    let node = this.root;
    for (let i = 0; i < sentence.length; i++) {
      const ch = sentence[i];

      if (!node.children.has(ch)) {
        node.children.set(ch, new Node());
      }

      node = node.children.get(ch);
      node.counts.set(sentence, (node.counts.get(sentence) || 0) + delta);
    }
  }

  /** @param {string} prefix @returns {string[]} */
  _top3(prefix) {
    let node = this.root;

    for (let i = 0; i < prefix.length; i++) {
      const ch = prefix[i];

      if (!node.children.has(ch)) {
        return [];
      }

      node = node.children.get(ch);
    }

    const heap = new MinHeap();
    for (const [sentence, count] of node.counts) {
      heap.add([sentence, count]);
      if (heap.size() > 3) heap.poll();
    }
    const result = [];
    while (heap.size() > 0) result.push(heap.poll());
    return result.reverse().map(([s]) => s);
  }
}

/**
 * Вариант B: в узле только «конец слова» (sentence + count).
 * При запросе — DFS от узла префикса, собираем все (sentence, count), сортируем, топ-3.
 */
function createNodeB() {
  return {
    children: new Map(),
    sentence: null,
    count: 0,
  };
}

class AutocompleteSystem2 {
  constructor(sentences, times) {
    this.root = createNodeB();
    this.current = "";

    for (let i = 0; i < (sentences || []).length; i++) {
      this._addSentence(sentences[i], times[i]);
    }
  }

  input(c) {
    if (c === "#") {
      if (this.current.length > 0) {
        this._addSentence(this.current, 1);
      }
      this.current = "";
      return [];
    }
    this.current = this.current + c;
    return this._top3(this.current);
  }

  _addSentence(sentence, delta = 1) {
    let node = this.root;
    for (let i = 0; i < sentence.length; i++) {
      const ch = sentence[i];
      if (!node.children.has(ch)) {
        node.children.set(ch, createNodeB());
      }
      node = node.children.get(ch);
    }
    node.sentence = sentence;
    node.count = (node.count || 0) + delta;
  }

  _top3(prefix) {
    let node = this.root;

    for (let i = 0; i < prefix.length; i++) {
      const ch = prefix[i];

      if (!node.children.has(ch)) {
        return [];
      }

      node = node.children.get(ch);
    }

    const stack = [node];
    const minheap = new MinHeap();
    while (stack.length) {
      const current = stack.pop();
      if (!current) {
        break;
      }

      if (current.sentence) {
        minheap.add([current.sentence, current.count]);
        if (minheap.size() > 3) minheap.poll();
      }

      for (const [, value] of current.children) {
        stack.push(value);
      }
    }

    const result = [];
    while (minheap.size()) {
      result.push(minheap.poll());
    }

    return result.reverse().map(([s]) => s);
  }
}

/**
 * Вариант C: в каждом узле храним готовый топ-3 по (count ↓, sentence ↑).
 * При добавлении предложения пересчитываем топ-3 во всех узлах вдоль пути.
 * Запрос подсказок: O(P) — просто читаем node.top3.
 */
function createNodeC() {
  return {
    children: new Map(),
    counts: new Map(),
    top3: [],
  };
}

function compareForTop3(a, b) {
  const [, cA] = a;
  const [, cB] = b;
  if (cA !== cB) return cB - cA;
  return a[0].localeCompare(b[0]);
}

class AutocompleteSystem3 {
  constructor(sentences, times) {
    this.root = createNodeC();
    this.current = "";

    for (let i = 0; i < (sentences || []).length; i++) {
      this._addSentence(sentences[i], times[i]);
    }
  }

  input(c) {
    if (c === "#") {
      if (this.current.length > 0) {
        this._addSentence(this.current, 1);
      }
      this.current = "";
      return [];
    }
    this.current = this.current + c;
    return this._top3(this.current);
  }

  _addSentence(sentence, delta = 1) {
    let node = this.root;
    for (let i = 0; i < sentence.length; i++) {
      const ch = sentence[i];
      if (!node.children.has(ch)) {
        node.children.set(ch, createNodeC());
      }
      node = node.children.get(ch);
      
      node.counts.set(sentence, (node.counts.get(sentence) || 0) + delta);
      this._updateTop3(node);
    }
  }

  _updateTop3(node) {
    const entries = Array.from(node.counts.entries());
    entries.sort(compareForTop3);
    node.top3 = entries.slice(0, 3);
  }

  _top3(prefix) {
    let node = this.root;
    for (let i = 0; i < prefix.length; i++) {
      const ch = prefix[i];
      if (!node.children.has(ch)) return [];
      node = node.children.get(ch);
    }
    return node.top3.map(([s]) => s);
  }
}

module.exports = {
  AutocompleteSystem: AutocompleteSystem1,
  AutocompleteSystem1,
  AutocompleteSystem2,
  AutocompleteSystem3,
};
