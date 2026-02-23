/**
 * 146. LRU Cache (Кэш с вытеснением наименее недавно использованного)
 *
 * - LRUCache(capacity) — инициализация с положительным capacity.
 * - get(key) — значение по ключу или -1.
 * - put(key, value) — обновить или добавить; при переполнении удалить LRU.
 * - get и put в среднем за O(1).
 */

var Node = function (key, value, prev, next) {
  this.key = key;
  this.value = value;
  this.next = next;
  this.prev = prev;
};

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.map = new Map();
  this.capacity = capacity;

  this.head = new Node();
  this.tail = new Node();

  this.head.next = this.tail;
  this.tail.prev = this.head;
};

LRUCache.prototype.remove = function (node) {
  var prev = node.prev;
  var next = node.next;

  prev.next = node.next;
  next.prev = node.prev;
};

LRUCache.prototype.addToHead = function (node) {
  var next = this.head.next;

  this.head.next = node;
  next.prev = node;

  node.prev = this.head;
  node.next = next;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.map.has(key)) {
    var current = this.map.get(key);
    this.remove(current);
    this.addToHead(current);
    return current.value;
  }
  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.map.has(key)) {
    var current = this.map.get(key);
    current.value = value;

    this.remove(current);
    this.addToHead(current);
  } else {
    var newNode = new Node(key, value, this.head);

    this.map.set(key, newNode);
    this.addToHead(newNode);
  }

  if (this.map.size > this.capacity) {
    var last = this.tail.prev;

    this.map.delete(last.key);
    this.remove(last);
  }
};

module.exports = { LRUCache, Node };
