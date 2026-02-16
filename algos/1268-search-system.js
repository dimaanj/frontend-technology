function Node() {
    this.children = new Map();
    this.words = [];
}


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
        const char = word[i];
        if (!node.children.has(char)) {
            node.children.set(char, new Node());
        }
        node = node.children.get(char);
        node.words.push(word);
    }
};

Trie.prototype.search = function (word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (!node.children.has(char)) {
            return false;
        }
        node = node.children.get(char);
    }
    return node.words;
};

Trie.prototype.startsWith = function (prefix) {
    let node = this.root;
    for (let i = 0; i < prefix.length; i++) {
        const char = prefix[i];
        if (!node.children.has(char)) {
            return false;
        }
        node = node.children.get(char);
    }
    return true;
};

/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function (products, searchWord) {
    let root = new Trie();

    for (const word of products) {
        root.insert(word);
    }

    const result = [];
    for (let i = 0; i < searchWord.length; i++) {
        const found = root.search(searchWord.slice(0, i + 1));
        if(found) {
            result.push(found.sort().slice(0, 3));
        } else {
            result.push([]);
        }
    }

    return result;
};

module.exports = { suggestedProducts };