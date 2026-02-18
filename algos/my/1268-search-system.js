var Node = function () {
  this.children = new Map();
  this.terminal = false;
};

var Trie = function () {
  this.root = new Node();
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let node = this.root;
  for (let i = 0; i < word.length; i++) {
    const ch = word[i];
    if (!node.children.has(ch)) {
      node.children.set(ch, new Node());
    }
    node = node.children.get(ch);
  }

  node.terminal = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let node = this.root;
  for (let i = 0; i < word.length; i++) {
    const ch = word[i];
    if (!node.children.has(ch)) {
      return false;
    }
    node = node.children.get(ch);
  }

  return node.terminal;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let node = this.root;
  for (let i = 0; i < prefix.length; i++) {
    const ch = prefix[i];
    if (!node.children.has(ch)) {
      return false;
    }
    node = node.children.get(ch);
  }

  return true;
};

////

Trie.prototype.remove = function (word) {
  if (!word.length) return;

  let node = this.root;
  const stack = [];
  for (let i = 0; i < word.length; i++) {
    const ch = word[i];
    if (!node.children.has(ch)) {
      return;
    }

    stack.push([node, ch]);
    node = node.children.get(ch);
  }

  node.terminal = false;

  while (stack.length && !node.terminal) {
    const [parent, ch] = stack.pop();

    const n = parent.children.get(ch);
    if (!n.children.size) {
      parent.children.delete(ch);
    }

    node = parent;
  }
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

module.exports = { Trie, Node };
