const { AutocompleteSystem, AutocompleteSystem2, AutocompleteSystem3 } = require('./642-autocomplete-system');

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

    /**
     * Тесты для выбора топ-3 без полной сортировки (например, через heap).
     * Поведение должно совпадать с текущей реализацией: топ-3 по (частота ↓, строка ↑).
     */
    describe('Top-3 selection (много кандидатов, без полной сортировки)', () => {
        test('Много кандидатов с одним префиксом — ровно 3, порядок по частоте затем ASCII', () => {
            const sentences = ['ax', 'ay', 'az', 'aa', 'ab', 'ac', 'a0', 'a1', 'a2'];
            const times = [1, 1, 1, 2, 2, 2, 3, 3, 3]; // топ по частоте: a0, a1, a2 (частота 3, потом по строке)
            const sys = new AutocompleteSystem(sentences, times);

            const result = sys.input('a');
            expect(result).toHaveLength(3);
            expect(result).toEqual(['a0', 'a1', 'a2']);
        });

        test('10 кандидатов, разные частоты — топ-3 по убыванию частоты', () => {
            const sentences = ['bx', 'by', 'bz', 'b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6'];
            const times = [1, 1, 2, 2, 3, 3, 4, 5, 6, 7]; // топ-3: b6(7), b5(6), b4(5)
            const sys = new AutocompleteSystem(sentences, times);

            const result = sys.input('b');
            expect(result).toHaveLength(3);
            expect(result).toEqual(['b6', 'b5', 'b4']);
        });

        test('Много кандидатов с одинаковой частотой — лексикографический порядок первых 3', () => {
            const sentences = ['cx', 'ca', 'cz', 'cb', 'cm', 'cn', 'cp'];
            const times = [5, 5, 5, 5, 5, 5, 5];
            const sys = new AutocompleteSystem(sentences, times);

            const result = sys.input('c');
            expect(result).toHaveLength(3);
            expect(result).toEqual(['ca', 'cb', 'cm']);
        });

        test('Один лидер по частоте, остальные ниже — он первый, дальше топ-2 по частоте и строке', () => {
            const sentences = ['dx', 'dy', 'dz', 'da', 'db', 'd_leader'];
            const times = [1, 1, 1, 2, 2, 10];
            const sys = new AutocompleteSystem(sentences, times);

            const result = sys.input('d');
            expect(result).toHaveLength(3);
            expect(result[0]).toBe('d_leader');
            expect(result).toContain('da');
            expect(result).toContain('db');
            expect(result).toEqual(['d_leader', 'da', 'db']);
        });

        test('Ровно 3 кандидата — вернуть все 3 в правильном порядке', () => {
            const sentences = ['e1', 'e2', 'e3'];
            const times = [3, 2, 1];
            const sys = new AutocompleteSystem(sentences, times);

            expect(sys.input('e')).toEqual(['e1', 'e2', 'e3']);
        });

        test('Много кандидатов (префикс "x") — не больше 3 элементов', () => {
            const sentences = Array.from({ length: 20 }, (_, i) => `x${String(i).padStart(2, '0')}`);
            const times = Array.from({ length: 20 }, (_, i) => i + 1); // 1..20, топ-3 по частоте: x19, x18, x17
            const sys = new AutocompleteSystem(sentences, times);

            const result = sys.input('x');
            expect(result).toHaveLength(3);
            expect(result).toEqual(['x19', 'x18', 'x17']);
        });
    });

    describe('AutocompleteSystem2 (вариант B: конец слова + DFS)', () => {
        test('Example: тот же результат, что и вариант A', () => {
            const sentences = ['i love you', 'island', 'iroman', 'i love leetcode'];
            const times = [5, 3, 2, 2];
            const sys = new AutocompleteSystem2(sentences, times);

            expect(sys.input('i')).toEqual(['i love you', 'island', 'i love leetcode']);
            expect(sys.input(' ')).toEqual(['i love you', 'i love leetcode']);
            expect(sys.input('a')).toEqual([]);
            expect(sys.input('#')).toEqual([]);
        });

        test('Топ-3 при многих кандидатах', () => {
            const sentences = ['ax', 'ay', 'az', 'aa', 'ab', 'ac', 'a0', 'a1', 'a2'];
            const times = [1, 1, 1, 2, 2, 2, 3, 3, 3];
            const sys = new AutocompleteSystem2(sentences, times);

            expect(sys.input('a')).toEqual(['a0', 'a1', 'a2']);
        });
    });

    describe('AutocompleteSystem3 (вариант C: кэш топ-3 в узле)', () => {
        test('Example: тот же результат', () => {
            const sentences = ['i love you', 'island', 'iroman', 'i love leetcode'];
            const times = [5, 3, 2, 2];
            const sys = new AutocompleteSystem3(sentences, times);

            expect(sys.input('i')).toEqual(['i love you', 'island', 'i love leetcode']);
            expect(sys.input(' ')).toEqual(['i love you', 'i love leetcode']);
            expect(sys.input('a')).toEqual([]);
            expect(sys.input('#')).toEqual([]);
        });

        test('После "#" кэш обновляется', () => {
            const sys = new AutocompleteSystem3(['hello'], [1]);
            expect(sys.input('h')).toEqual(['hello']);
            sys.input('i');
            sys.input('#');
            expect(sys.input('h')).toContain('hi');
        });
    });
});
