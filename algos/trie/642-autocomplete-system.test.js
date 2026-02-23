const { AutocompleteSystem } = require('./642-autocomplete-system');

/**
 * 642. Design Search Autocomplete System (Автодополнение поиска)
 *
 * УСЛОВИЕ:
 *
 * Нужно спроектировать систему автодополнения для поисковика: при вводе символов
 * показывать подсказки — предложения, которые пользователь раньше вводил.
 *
 * Начальные данные:
 * - Массив sentences длины n — ранее введённые предложения.
 * - Массив times длины n — times[i] равно количеству раз, которое вводили sentences[i].
 *
 * Работа системы:
 * - Пользователь вводит символы по одному, формируя предложение.
 * - Предложение завершается специальным символом '#'.
 * - На каждый введённый символ (кроме '#') система возвращает до 3 самых «горячих»
 *   предложений, начинающихся с текущего набранного префикса.
 *
 * Правила сортировки подсказок:
 * - По «горячести» (частоте ввода): сначала более частые.
 * - При одинаковой частоте — лексикографически по ASCII.
 * - Если подходящих предложений меньше 3 — вернуть все подходящие.
 *
 * Символ '#':
 * - Означает конец текущего предложения. Это предложение сохраняется в системе
 *   (если уже было — его счётчик увеличивается на 1).
 * - После ввода '#' метод input возвращает [] и система готова к вводу следующего предложения.
 *
 * Класс AutocompleteSystem:
 * - Конструктор: AutocompleteSystem(sentences, times) — инициализация историей.
 * - Метод input(c): обрабатывает один символ.
 *   - Если c === '#' — сохраняет текущее предложение и возвращает [].
 *   - Иначе — возвращает массив до 3 предложений-подсказок для текущего префикса.
 */
describe('642. Design Search Autocomplete System', () => {
    test('Example from problem: input "i", " ", "a", "#"', () => {
        const sentences = ['i love you', 'island', 'iroman', 'i love leetcode'];
        const times = [5, 3, 2, 2];
        const sys = new AutocompleteSystem(sentences, times);

        expect(sys.input('i')).toEqual(['i love you', 'island', 'i love leetcode']);
        expect(sys.input(' ')).toEqual(['i love you', 'i love leetcode']);
        expect(sys.input('a')).toEqual([]);
        expect(sys.input('#')).toEqual([]);
    });

    test('After "#" save sentence and next input uses new count', () => {
        const sentences = ['i love you', 'island', 'iroman', 'i love leetcode'];
        const times = [5, 3, 2, 2];
        const sys = new AutocompleteSystem(sentences, times);

        sys.input('i');
        sys.input(' ');
        sys.input('a');
        sys.input('#'); // saved "i a"

        // After "i " we should now have "i a" (count 1) among suggestions; top 3 by frequency
        const after = sys.input('i');
        expect(after.length).toBeLessThanOrEqual(3);
        expect(after).toContain('i love you');
        expect(after).toContain('island');
        // "i a" may appear if in top 3
        sys.input(' ');
        const suggestions = sys.input('a');
        expect(suggestions).toContain('i a');
        expect(suggestions.length).toBeLessThanOrEqual(3);
    });

    test('Ranking: higher frequency first, then ASCII order', () => {
        const sentences = ['aa', 'ab', 'ac'];
        const times = [2, 2, 3];
        const sys = new AutocompleteSystem(sentences, times);

        const result = sys.input('a');
        expect(result).toEqual(['ac', 'aa', 'ab']);
    });

    test('Fewer than 3 matches: return all', () => {
        const sentences = ['a', 'ab'];
        const times = [1, 1];
        const sys = new AutocompleteSystem(sentences, times);

        expect(sys.input('a')).toEqual(['a', 'ab']);
        expect(sys.input('b')).toEqual(['ab']);
        expect(sys.input('c')).toEqual([]);
    });

    test('Input "#" returns [] and resets current sentence', () => {
        const sys = new AutocompleteSystem(['hello'], [1]);

        expect(sys.input('h')).toEqual(['hello']);
        expect(sys.input('#')).toEqual([]);
        // после '#' сохранили "h", поэтому под префикс "h" теперь "h" и "hello" (по условию сохраняем любое предложение)
        expect(sys.input('h')).toEqual(['h', 'hello']);
    });

    test('Empty prefix: top 3 overall by frequency then ASCII', () => {
        const sentences = ['aaa', 'aab', 'aac', 'aad'];
        const times = [1, 1, 1, 1];
        const sys = new AutocompleteSystem(sentences, times);

        const result = sys.input('a');
        expect(result.length).toBeLessThanOrEqual(3);
        expect(result).toEqual(['aaa', 'aab', 'aac']);
    });

    test('Single sentence', () => {
        const sys = new AutocompleteSystem(['only'], [10]);

        expect(sys.input('o')).toEqual(['only']);
        expect(sys.input('n')).toEqual(['only']);
        expect(sys.input('l')).toEqual(['only']);
        expect(sys.input('y')).toEqual(['only']);
        expect(sys.input('#')).toEqual([]);
    });

    test('No matches returns empty array', () => {
        const sys = new AutocompleteSystem(['apple', 'apply'], [1, 1]);

        expect(sys.input('b')).toEqual([]);
        expect(sys.input('z')).toEqual([]);
    });

    test('Repeated same sentence increases count', () => {
        const sys = new AutocompleteSystem(['hi'], [1]);

        sys.input('h');
        sys.input('i');
        sys.input('#'); // "hi" count becomes 2

        sys.input('h');
        sys.input('i');
        sys.input('#'); // "hi" count becomes 3

        const result = sys.input('h');
        expect(result).toContain('hi');
        expect(result[0]).toBe('hi');
    });

    test('Empty initial data', () => {
        const sys = new AutocompleteSystem([], []);

        expect(sys.input('a')).toEqual([]);
        expect(sys.input('#')).toEqual([]);
    });
});
