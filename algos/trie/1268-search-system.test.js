const { suggestedProducts } = require('./1268-search-system');

describe('Search Suggestions System - LeetCode 1268', () => {
    
    test('Example 1: Basic case with "mouse" search', () => {
        const products = ["mobile","mouse","moneypot","monitor","mousepad"];
        const searchWord = "mouse";
        const expected = [
            ["mobile","moneypot","monitor"],
            ["mobile","moneypot","monitor"],
            ["mouse","mousepad"],
            ["mouse","mousepad"],
            ["mouse","mousepad"]
        ];
        expect(suggestedProducts(products, searchWord)).toEqual(expected);
    });

    test('Example 2: Search for "havana"', () => {
        const products = ["havana"];
        const searchWord = "havana";
        const expected = [
            ["havana"],
            ["havana"],
            ["havana"],
            ["havana"],
            ["havana"],
            ["havana"]
        ];
        expect(suggestedProducts(products, searchWord)).toEqual(expected);
    });

    test('Example 3: Multiple products starting with "bags"', () => {
        const products = ["bags","baggage","banner","box","cloths"];
        const searchWord = "bags";
        const expected = [
            ["baggage","bags","banner"],
            ["baggage","bags","banner"],
            ["baggage","bags"],
            ["bags"]
        ];
        expect(suggestedProducts(products, searchWord)).toEqual(expected);
    });

    test('No matching products after some characters', () => {
        const products = ["mobile","mouse","moneypot","monitor","mousepad"];
        const searchWord = "mozz";
        const expected = [
            ["mobile","moneypot","monitor"],
            ["mobile","moneypot","monitor"],
            [],
            []
        ];
        expect(suggestedProducts(products, searchWord)).toEqual(expected);
    });

    test('Single product in array', () => {
        const products = ["apple"];
        const searchWord = "app";
        const expected = [
            ["apple"],
            ["apple"],
            ["apple"]
        ];
        expect(suggestedProducts(products, searchWord)).toEqual(expected);
    });

    test('Empty products array', () => {
        const products = [];
        const searchWord = "test";
        const expected = [[], [], [], []];
        expect(suggestedProducts(products, searchWord)).toEqual(expected);
    });

    test('No products match the search word', () => {
        const products = ["apple","banana","cherry"];
        const searchWord = "dog";
        const expected = [[], [], []];
        expect(suggestedProducts(products, searchWord)).toEqual(expected);
    });

    test('More than 3 matching products - returns top 3 lexicographically', () => {
        const products = ["apple","apricot","application","apply","ape","apartment","april"];
        const searchWord = "ap";
        const expected = [
            ["apartment","ape","apple"],
            ["apartment","ape","apple"]
        ];
        expect(suggestedProducts(products, searchWord)).toEqual(expected);
    });

    test('Products with different lengths', () => {
        const products = ["a","ab","abc","abcd","abcde"];
        const searchWord = "abcdef";
        const expected = [
            ["a","ab","abc"],
            ["ab","abc","abcd"],
            ["abc","abcd","abcde"],
            ["abcd","abcde"],
            ["abcde"],
            []
        ];
        expect(suggestedProducts(products, searchWord)).toEqual(expected);
    });

    test('All products have same prefix', () => {
        const products = ["test1","test2","test3","test4","test5"];
        const searchWord = "test";
        const expected = [
            ["test1","test2","test3"],
            ["test1","test2","test3"],
            ["test1","test2","test3"],
            ["test1","test2","test3"]
        ];
        expect(suggestedProducts(products, searchWord)).toEqual(expected);
    });

    test('Exact match exists', () => {
        const products = ["code","coder","coding","code"];
        const searchWord = "code";
        const expected = [
            ["code","code","coder"],
            ["code","code","coder"],
            ["code","code","coder"],
            ["code","code","coder"]
        ];
        expect(suggestedProducts(products, searchWord)).toEqual(expected);
    });

    test('Single character search word', () => {
        const products = ["apple","ape","application","banana"];
        const searchWord = "a";
        const expected = [
            ["ape","apple","application"]
        ];
        expect(suggestedProducts(products, searchWord)).toEqual(expected);
    });

    test('Products unsorted - should return sorted results', () => {
        const products = ["zebra","zoo","apple","application","ape"];
        const searchWord = "ap";
        const expected = [
            ["ape","apple","application"],
            ["ape","apple","application"]
        ];
        expect(suggestedProducts(products, searchWord)).toEqual(expected);
    });

    test('Lowercase and mixed case handling - case sensitive', () => {
        const products = ["Mobile","mouse","MONITOR","mousepad","moneypot"];
        const searchWord = "mo";
        const expected = [
            ["moneypot","mouse","mousepad"],
            ["moneypot","mouse","mousepad"]
        ];
        expect(suggestedProducts(products, searchWord)).toEqual(expected);
    });

    test('Products with special characters', () => {
        const products = ["test-1","test-2","test_3","test"];
        const searchWord = "test";
        const expected = [
            ["test","test-1","test-2"],
            ["test","test-1","test-2"],
            ["test","test-1","test-2"],
            ["test","test-1","test-2"]
        ];
        expect(suggestedProducts(products, searchWord)).toEqual(expected);
    });

    test('Decreasing number of matches as search progresses', () => {
        const products = ["abcd","abce","abcf","abd","abe"];
        const searchWord = "abcd";
        const expected = [
            ["abcd","abce","abcf"],
            ["abcd","abce","abcf"],
            ["abcd","abce","abcf"],
            ["abcd"]
        ];
        expect(suggestedProducts(products, searchWord)).toEqual(expected);
    });

    test('Very long search word', () => {
        const products = ["test"];
        const searchWord = "testinglongstring";
        const expected = [
            ["test"],
            ["test"],
            ["test"],
            ["test"],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];
        expect(suggestedProducts(products, searchWord)).toEqual(expected);
    });
});
