const { WordDictionary } = require('./211-design-add-and-search-ds');

describe('Design Add and Search Words Data Structure - LeetCode 211', () => {
    
    test('Example from problem statement', () => {
        const wordDictionary = new WordDictionary();
        wordDictionary.addWord("bad");
        wordDictionary.addWord("dad");
        wordDictionary.addWord("mad");
        
        expect(wordDictionary.search("pad")).toBe(false);
        expect(wordDictionary.search("bad")).toBe(true);
        expect(wordDictionary.search(".ad")).toBe(true);
        expect(wordDictionary.search("b..")).toBe(true);
    });
    
    test('Empty dictionary search returns false', () => {
        const wordDictionary = new WordDictionary();
        expect(wordDictionary.search("test")).toBe(false);
        expect(wordDictionary.search(".")).toBe(false);
        expect(wordDictionary.search("...")).toBe(false);
    });
    
    test('Single character words', () => {
        const wordDictionary = new WordDictionary();
        wordDictionary.addWord("a");
        wordDictionary.addWord("b");
        
        expect(wordDictionary.search("a")).toBe(true);
        expect(wordDictionary.search("b")).toBe(true);
        expect(wordDictionary.search("c")).toBe(false);
        expect(wordDictionary.search(".")).toBe(true);
    });
    
    test('Wildcard at different positions', () => {
        const wordDictionary = new WordDictionary();
        wordDictionary.addWord("cat");
        wordDictionary.addWord("bat");
        wordDictionary.addWord("rat");
        
        expect(wordDictionary.search(".at")).toBe(true);
        expect(wordDictionary.search("c.t")).toBe(true);
        expect(wordDictionary.search("ca.")).toBe(true);
        expect(wordDictionary.search("...")).toBe(true);
        expect(wordDictionary.search("..t")).toBe(true);
    });
    
    test('Multiple wildcards', () => {
        const wordDictionary = new WordDictionary();
        wordDictionary.addWord("word");
        wordDictionary.addWord("bird");
        
        expect(wordDictionary.search("....")).toBe(true);
        expect(wordDictionary.search("w...")).toBe(true);
        expect(wordDictionary.search(".o..")).toBe(true);
        expect(wordDictionary.search("..r.")).toBe(true);
        expect(wordDictionary.search("...d")).toBe(true);
        expect(wordDictionary.search("w..d")).toBe(true);
    });
    
    test('All wildcards', () => {
        const wordDictionary = new WordDictionary();
        wordDictionary.addWord("test");
        
        expect(wordDictionary.search("....")).toBe(true);
        expect(wordDictionary.search(".....")).toBe(false);
        expect(wordDictionary.search("...")).toBe(false);
    });
    
    test('Different word lengths', () => {
        const wordDictionary = new WordDictionary();
        wordDictionary.addWord("a");
        wordDictionary.addWord("at");
        wordDictionary.addWord("ate");
        wordDictionary.addWord("apple");
        
        expect(wordDictionary.search("a")).toBe(true);
        expect(wordDictionary.search("at")).toBe(true);
        expect(wordDictionary.search("ate")).toBe(true);
        expect(wordDictionary.search("apple")).toBe(true);
        expect(wordDictionary.search(".")).toBe(true);
        expect(wordDictionary.search("..")).toBe(true);
        expect(wordDictionary.search("...")).toBe(true);
        expect(wordDictionary.search(".....")).toBe(true);
        expect(wordDictionary.search("......")).toBe(false);
    });
    
    test('Words with common prefixes', () => {
        const wordDictionary = new WordDictionary();
        wordDictionary.addWord("app");
        wordDictionary.addWord("apple");
        wordDictionary.addWord("application");
        
        expect(wordDictionary.search("app")).toBe(true);
        expect(wordDictionary.search("apple")).toBe(true);
        expect(wordDictionary.search("application")).toBe(true);
        expect(wordDictionary.search("appl")).toBe(false);
        expect(wordDictionary.search("...")).toBe(true);
        expect(wordDictionary.search(".....")).toBe(true);
        expect(wordDictionary.search("...........")).toBe(true);
    });
    
    test('Wildcard does not match when word length differs', () => {
        const wordDictionary = new WordDictionary();
        wordDictionary.addWord("abc");
        
        expect(wordDictionary.search("..")).toBe(false);
        expect(wordDictionary.search("....")).toBe(false);
        expect(wordDictionary.search("...")).toBe(true);
    });
    
    test('Complex wildcard patterns', () => {
        const wordDictionary = new WordDictionary();
        wordDictionary.addWord("ran");
        wordDictionary.addWord("run");
        wordDictionary.addWord("rune");
        
        expect(wordDictionary.search("r.n")).toBe(true);
        expect(wordDictionary.search("r..")).toBe(true);
        expect(wordDictionary.search(".an")).toBe(true);
        expect(wordDictionary.search(".un")).toBe(true);
        expect(wordDictionary.search("..n")).toBe(true);
        expect(wordDictionary.search("r.ne")).toBe(true);
        expect(wordDictionary.search("..ne")).toBe(true);
    });
    
    test('No match cases', () => {
        const wordDictionary = new WordDictionary();
        wordDictionary.addWord("hello");
        wordDictionary.addWord("world");
        
        expect(wordDictionary.search("hallo")).toBe(false);
        expect(wordDictionary.search("word")).toBe(false);
        expect(wordDictionary.search("h....")).toBe(true);
        expect(wordDictionary.search("w....")).toBe(true);
        expect(wordDictionary.search("x....")).toBe(false);
    });
    
    test('Duplicate words', () => {
        const wordDictionary = new WordDictionary();
        wordDictionary.addWord("test");
        wordDictionary.addWord("test");
        wordDictionary.addWord("test");
        
        expect(wordDictionary.search("test")).toBe(true);
        expect(wordDictionary.search("....")).toBe(true);
        expect(wordDictionary.search("t...")).toBe(true);
    });
    
    test('Long words', () => {
        const wordDictionary = new WordDictionary();
        wordDictionary.addWord("programming");
        
        expect(wordDictionary.search("programming")).toBe(true);
        expect(wordDictionary.search("...........")).toBe(true);
        expect(wordDictionary.search("p..........")).toBe(true);
        expect(wordDictionary.search("..........g")).toBe(true);
        expect(wordDictionary.search("pro........")).toBe(true);
        expect(wordDictionary.search("............")).toBe(false);
    });
});
