function Node() {
    this.children = new Map();
    this.terminal = false;
}

var Trie = function() {
    this.root = new Node();
};

Trie.prototype.insert = function(word) {
    let node = this.root;
    for(let i = 0; i < word.length; i++) {
        const char = word[i];
        if(!node.children.has(char)) {
            node.children.set(char, new Node());
        }
        node = node.children.get(char);
    }
    node.terminal = true;
}


Trie.prototype.search = function(word) {
    return this.dfs(word, 0, this.root);
}

Trie.prototype.dfs = function(word, index, node) {
    if(index === word.length) {
        return node.terminal;
    }
    
    const char = word[index];
    
    if(char === '.') {
        // Wildcard: try all possible children
        for(let childNode of node.children.values()) {
            if(this.dfs(word, index + 1, childNode)) {
                return true;
            }
        }
        return false;
    } else {
        // Regular character
        if(!node.children.has(char)) {
            return false;
        }
        return this.dfs(word, index + 1, node.children.get(char));
    }
}


var WordDictionary = function() {
    this.root = new Trie();
};

/** 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    this.root.insert(word);
};

/** 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    return this.root.search(word);
};

/** 
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */

module.exports = { WordDictionary };