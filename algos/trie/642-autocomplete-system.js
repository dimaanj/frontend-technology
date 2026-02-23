/**
 * 642. Design Search Autocomplete System (Автодополнение поиска)
 *
 * Условие: см. 642-autocomplete-system.test.js (блок УСЛОВИЕ в комментарии).
 *
 * Решение: Trie + Min-Heap размера 3 для выбора топ-3 по (частота ↓, строка ↑).
 */

/** Минимальная куча с произвольным компаратором. "Меньший" элемент — в корне. */
class MinHeap {
    constructor(compare = (a, b) => a - b) {
        this.a = [];
        this.compare = compare;
    }

    size() {
        return this.a.length;
    }

    push(x) {
        this.a.push(x);
        this._siftUp(this.a.length - 1);
    }

    pop() {
        if (this.a.length === 0) return undefined;
        const top = this.a[0];
        const last = this.a.pop();
        if (this.a.length > 0) {
            this.a[0] = last;
            this._siftDown(0);
        }
        return top;
    }

    _siftUp(i) {
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (this.compare(this.a[i], this.a[p]) >= 0) break;
            [this.a[i], this.a[p]] = [this.a[p], this.a[i]];
            i = p;
        }
    }

    _siftDown(i) {
        const n = this.a.length;
        while (true) {
            let best = i;
            const l = 2 * i + 1;
            const r = 2 * i + 2;
            if (l < n && this.compare(this.a[l], this.a[best]) < 0) best = l;
            if (r < n && this.compare(this.a[r], this.a[best]) < 0) best = r;
            if (best === i) break;
            [this.a[i], this.a[best]] = [this.a[best], this.a[i]];
            i = best;
        }
    }
}

/** Узел Trie: дети по символам и счётчики предложений с этим префиксом. */
function createNode() {
    return {
        children: new Map(),
        counts: new Map(), // sentence -> count для всех предложений с этим префиксом
    };
}

class AutocompleteSystem {
    constructor(sentences, times) {
        this.root = createNode();
        this.current = '';

        for (let i = 0; i < (sentences || []).length; i++) {
            this._addSentence(sentences[i], times[i]);
        }
    }

    /** Добавить предложение с заданной частотой (обновить все узлы вдоль пути). */
    _addSentence(sentence, delta = 1) {
        let node = this.root;
        for (const ch of sentence) {
            if (!node.children.has(ch)) {
                node.children.set(ch, createNode());
            }
            node = node.children.get(ch);
            const prev = node.counts.get(sentence) || 0;
            node.counts.set(sentence, prev + delta);
        }
    }

    /**
     * Сравнение для "топ по частоте, при равенстве по строке ASC".
     * В куче храним "худший" из топ-3 в корне: меньшая частота или большая строка = хуже.
     */
    _compare(a, b) {
        const [sA, cA] = a;
        const [sB, cB] = b;
        if (cA !== cB) return cA - cB; // min-heap: меньшая частота — "меньше" (хуже)
        return (sB.localeCompare(sA));   // при равенстве: большая строка — "меньше" (хуже)
    }

    /** По префиксу вернуть до 3 предложений: heap размера 3, затем извлечь и развернуть порядок. */
    _top3(prefix) {
        let node = this.root;
        for (const ch of prefix) {
            if (!node.children.has(ch)) return [];
            node = node.children.get(ch);
        }

        const heap = new MinHeap(this._compare.bind(this));
        for (const [sentence, count] of node.counts) {
            heap.push([sentence, count]);
            if (heap.size() > 3) heap.pop();
        }

        const result = [];
        while (heap.size() > 0) {
            result.push(heap.pop());
        }
        return result.reverse().map(([s]) => s);
    }

    input(c) {
        if (c === '#') {
            if (this.current.length > 0) {
                this._addSentence(this.current, 1);
            }
            this.current = '';
            return [];
        }
        this.current += c;
        return this._top3(this.current);
    }
}

module.exports = { AutocompleteSystem };
