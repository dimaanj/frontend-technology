# Quickselect — template steps

## Что решает

Найти элемент порядка \(k\) **без полной сортировки**.

- **k-th smallest**: элемент, который стоял бы на индексе `k - 1` после сортировки
- **k-th largest**: элемент, который стоял бы на индексе `n - k` после сортировки

Примеры задач:
- LeetCode **215** (Kth Largest)
- LeetCode **973** (K Closest) — как выбор границы

## Ключевая идея

Берём `partition` из quicksort: после разбиения pivot попадает на **своё итоговое место**.
В отличие от quicksort, мы продолжаем **только в ту сторону**, где лежит `targetIndex`.

## Шаги реализации

1. **Определи `targetIndex` (0-based)**:
   - k-th smallest: `targetIndex = k - 1`
   - k-th largest: `targetIndex = n - k`

2. **Инициализируй границы**:
   - `lo = 0`, `hi = n - 1`

3. **Цикл выбора** (`while (lo <= hi)`):
   - `pivotIndex = partition(nums, lo, hi)`
   - если `pivotIndex === targetIndex` → **ответ**: `return nums[pivotIndex]`
   - если `pivotIndex < targetIndex` → искать справа: `lo = pivotIndex + 1`
   - иначе искать слева: `hi = pivotIndex - 1`

4. **`partition` (Lomuto-стиль)**:
   - выбери pivot (mid / random / median-of-three)
   - перенеси pivot в `hi`
   - протяни `j` от `lo` до `hi - 1`, поддерживая границу `i` для элементов `< pivot`
   - в конце swap `arr[i]` и `arr[hi]`, вернуть `i`

## Повороты и corner cases

- **Валидация**: `k <= 0` или `k > n` (и/или `targetIndex` вне `[0..n-1]`)
- **Дубликаты**: важно, чтобы условие сравнения в `partition` было консистентным (`< pivot` слева, `>= pivot` справа)
- **Худший случай**: уже отсортированный массив + неудачный pivot (например, всегда крайний)

## Сложность

- **Среднее время**: \(O(n)\) — на каждом шаге выкидываем примерно половину
- **Худшее время**: \(O(n^2)\)
- **Память**: \(O(1)\) доп. (итеративная версия)

## Как уменьшить шанс худшего случая

- **Random pivot**: `pivotIndex = lo + Math.floor(Math.random() * (hi - lo + 1))`
- **Median-of-three**: выбрать pivot как медиану из `arr[lo]`, `arr[mid]`, `arr[hi]`

