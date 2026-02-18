const { Trie } = require('./1268-search-system');

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, got ${actual}`);
  }
}

function run(name, fn) {
  try {
    fn();
    console.log('OK:', name);
  } catch (e) {
    console.log('FAIL:', name, e.message);
  }
}

// --- insert ---

run('insert одного слова', function () {
  const trie = new Trie();
  trie.insert('apple');
  assertEqual(trie.search('apple'), true);
  assertEqual(trie.startsWith('app'), true);
});

run('insert нескольких слов с общим префиксом', function () {
  const trie = new Trie();
  trie.insert('app');
  trie.insert('apple');
  trie.insert('application');
  assertEqual(trie.search('app'), true);
  assertEqual(trie.search('apple'), true);
  assertEqual(trie.search('application'), true);
});

run('insert одного символа', function () {
  const trie = new Trie();
  trie.insert('a');
  assertEqual(trie.search('a'), true);
  assertEqual(trie.startsWith('a'), true);
});

run('insert пустой строки не ломает', function () {
  const trie = new Trie();
  trie.insert('');
  trie.insert('x');
  assertEqual(trie.search('x'), true);
});

run('insert того же слова дважды — search true', function () {
  const trie = new Trie();
  trie.insert('word');
  trie.insert('word');
  assertEqual(trie.search('word'), true);
});

run('insert независимых слов', function () {
  const trie = new Trie();
  trie.insert('a');
  trie.insert('ab');
  trie.insert('abc');
  trie.insert('b');
  assertEqual(trie.search('a'), true);
  assertEqual(trie.search('ab'), true);
  assertEqual(trie.search('abc'), true);
  assertEqual(trie.search('b'), true);
});

// --- search ---

run('search в пустом дереве — false', function () {
  const trie = new Trie();
  assertEqual(trie.search('a'), false);
  assertEqual(trie.search(''), false);
});

run('search отсутствующего слова — false', function () {
  const trie = new Trie();
  trie.insert('apple');
  assertEqual(trie.search('app'), false);
  assertEqual(trie.search('applee'), false);
  assertEqual(trie.search('banana'), false);
});

run('search по префиксу без полного слова — false', function () {
  const trie = new Trie();
  trie.insert('apple');
  assertEqual(trie.search('a'), false);
  assertEqual(trie.search('app'), false);
});

run('search добавленного слова — true', function () {
  const trie = new Trie();
  trie.insert('test');
  assertEqual(trie.search('test'), true);
});

run('search короткого и длинного при общем префиксе', function () {
  const trie = new Trie();
  trie.insert('app');
  trie.insert('apple');
  assertEqual(trie.search('app'), true);
  assertEqual(trie.search('apple'), true);
});

run('search после нескольких insert', function () {
  const trie = new Trie();
  trie.insert('one');
  trie.insert('two');
  trie.insert('three');
  assertEqual(trie.search('one'), true);
  assertEqual(trie.search('two'), true);
  assertEqual(trie.search('three'), true);
  assertEqual(trie.search('four'), false);
});

// --- startsWith ---

run('startsWith в пустом дереве — false', function () {
  const trie = new Trie();
  assertEqual(trie.startsWith('a'), false);
});

run('startsWith пустой строки — true', function () {
  const trie = new Trie();
  trie.insert('x');
  assertEqual(trie.startsWith(''), true);
});

run('startsWith полного слова — true', function () {
  const trie = new Trie();
  trie.insert('apple');
  assertEqual(trie.startsWith('apple'), true);
});

run('startsWith префикса — true', function () {
  const trie = new Trie();
  trie.insert('apple');
  assertEqual(trie.startsWith('a'), true);
  assertEqual(trie.startsWith('ap'), true);
  assertEqual(trie.startsWith('app'), true);
  assertEqual(trie.startsWith('appl'), true);
});

run('startsWith отсутствующего префикса — false', function () {
  const trie = new Trie();
  trie.insert('apple');
  assertEqual(trie.startsWith('b'), false);
  assertEqual(trie.startsWith('apx'), false);
  assertEqual(trie.startsWith('applee'), false);
});

run('startsWith при нескольких словах', function () {
  const trie = new Trie();
  trie.insert('app');
  trie.insert('apple');
  trie.insert('application');
  assertEqual(trie.startsWith('app'), true);
  assertEqual(trie.startsWith('appl'), true);
  assertEqual(trie.startsWith('applic'), true);
  assertEqual(trie.startsWith('b'), false);
});

// --- remove ---

run('remove пустой строки не ломает дерево', function () {
  const trie = new Trie();
  trie.insert('a');
  trie.remove('');
  assertEqual(trie.search('a'), true);
});

run('remove отсутствующего слова не меняет дерево', function () {
  const trie = new Trie();
  trie.insert('apple');
  trie.remove('app');
  trie.remove('banana');
  assertEqual(trie.search('apple'), true);
});

run('remove единственного слова — поиск false, префикс исчезает', function () {
  const trie = new Trie();
  trie.insert('apple');
  trie.remove('apple');
  assertEqual(trie.search('apple'), false);
  assertEqual(trie.startsWith('a'), false);
  assertEqual(trie.startsWith('app'), false);
});

run('remove одного из двух независимых слов', function () {
  const trie = new Trie();
  trie.insert('a');
  trie.insert('b');
  trie.remove('a');
  assertEqual(trie.search('a'), false);
  assertEqual(trie.search('b'), true);
});

run('remove длинного слова при наличии короткого (app, apple)', function () {
  const trie = new Trie();
  trie.insert('app');
  trie.insert('apple');
  trie.remove('apple');
  assertEqual(trie.search('app'), true);
  assertEqual(trie.search('apple'), false);
  assertEqual(trie.startsWith('app'), true);
});

run('remove короткого слова при наличии длинного (app, apple)', function () {
  const trie = new Trie();
  trie.insert('app');
  trie.insert('apple');
  trie.remove('app');
  assertEqual(trie.search('app'), false);
  assertEqual(trie.search('apple'), true);
  assertEqual(trie.startsWith('app'), true);
});

run('remove не отрезает общую ветку (apple, application)', function () {
  const trie = new Trie();
  trie.insert('apple');
  trie.insert('application');
  trie.remove('apple');
  assertEqual(trie.search('apple'), false);
  assertEqual(trie.search('application'), true);
  assertEqual(trie.startsWith('app'), true);
  assertEqual(trie.startsWith('applic'), true);
});

run('remove подрезает только хвост до ветвления', function () {
  const trie = new Trie();
  trie.insert('app');
  trie.insert('apple');
  trie.remove('apple');
  assertEqual(trie.search('app'), true);
  assertEqual(trie.startsWith('a'), true);
});

run('несколько remove подряд', function () {
  const trie = new Trie();
  trie.insert('a');
  trie.insert('ab');
  trie.insert('abc');
  trie.remove('abc');
  assertEqual(trie.search('ab'), true);
  assertEqual(trie.search('abc'), false);
  trie.remove('ab');
  assertEqual(trie.search('a'), true);
  assertEqual(trie.search('ab'), false);
  trie.remove('a');
  assertEqual(trie.search('a'), false);
});

run('remove слова в середине общего префикса (a, ab, abc)', function () {
  const trie = new Trie();
  trie.insert('a');
  trie.insert('ab');
  trie.insert('abc');
  trie.remove('ab');
  assertEqual(trie.search('a'), true);
  assertEqual(trie.search('ab'), false);
  assertEqual(trie.search('abc'), true);
});

// --- дополнительные тесты ---

run('пустое дерево: remove не падает', function () {
  const trie = new Trie();
  trie.remove('a');
  trie.remove('word');
  assertEqual(trie.search('a'), false);
});

run('remove одного символа', function () {
  const trie = new Trie();
  trie.insert('a');
  trie.remove('a');
  assertEqual(trie.search('a'), false);
  assertEqual(trie.startsWith('a'), false);
});

run('повторный remove того же слова не падает', function () {
  const trie = new Trie();
  trie.insert('test');
  trie.remove('test');
  trie.remove('test');
  trie.remove('test');
  assertEqual(trie.search('test'), false);
});

run('remove слова, которого нет (путь обрывается в середине)', function () {
  const trie = new Trie();
  trie.insert('apple');
  trie.remove('appx');
  trie.remove('axy');
  assertEqual(trie.search('apple'), true);
  assertEqual(trie.startsWith('app'), true);
});

run('три ветки от одного префикса (app, apple, application)', function () {
  const trie = new Trie();
  trie.insert('app');
  trie.insert('apple');
  trie.insert('application');
  trie.remove('apple');
  assertEqual(trie.search('app'), true);
  assertEqual(trie.search('apple'), false);
  assertEqual(trie.search('application'), true);
  trie.remove('app');
  assertEqual(trie.search('app'), false);
  assertEqual(trie.search('application'), true);
});

run('remove длинной ветки (a, ab, abc, abcd)', function () {
  const trie = new Trie();
  trie.insert('a');
  trie.insert('ab');
  trie.insert('abc');
  trie.insert('abcd');
  trie.remove('abcd');
  assertEqual(trie.search('abc'), true);
  assertEqual(trie.search('abcd'), false);
  assertEqual(trie.startsWith('ab'), true);
  trie.remove('abc');
  assertEqual(trie.search('ab'), true);
  assertEqual(trie.search('abc'), false);
});

run('независимые ветки: remove не трогает другие', function () {
  const trie = new Trie();
  trie.insert('abc');
  trie.insert('acb');
  trie.insert('bac');
  trie.remove('abc');
  assertEqual(trie.search('abc'), false);
  assertEqual(trie.search('acb'), true);
  assertEqual(trie.search('bac'), true);
  assertEqual(trie.startsWith('a'), true);
  assertEqual(trie.startsWith('b'), true);
});

run('startsWith после remove: префиксы удалённого слова пропадают только если ветка подрезана', function () {
  const trie = new Trie();
  trie.insert('apple');
  trie.remove('apple');
  assertEqual(trie.startsWith(''), true); // пустой префикс — корень
  assertEqual(trie.startsWith('a'), false);
});

run('одно и то же слово insert дважды — один remove убирает', function () {
  const trie = new Trie();
  trie.insert('dup');
  trie.insert('dup');
  trie.remove('dup');
  assertEqual(trie.search('dup'), false);
});

run('remove в разном порядке (a, ab, abc)', function () {
  const trie = new Trie();
  trie.insert('a');
  trie.insert('ab');
  trie.insert('abc');
  trie.remove('a');
  assertEqual(trie.search('a'), false);
  assertEqual(trie.search('ab'), true);
  assertEqual(trie.search('abc'), true);
  assertEqual(trie.startsWith('a'), true);
});
