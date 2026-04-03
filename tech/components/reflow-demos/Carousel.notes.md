# Carousel — итоги обсуждения

## Баг: BadCarousel не скроллился

**Причина:** CSS-свойство `left` работает только на позиционированных элементах (`position: relative/absolute/fixed/sticky`). У `.carousel-track` `position` не был задан — браузер игнорировал `left: -Xpx`.

**Фикс:** добавлен `position: relative` в `.carousel-track--bad`.

---

## Ключевые концепции

### 1. Reflow при чтении layout-свойств

Чтение `offsetWidth`, `offsetHeight`, `getBoundingClientRect()` и подобных **форсирует reflow** — браузер обязан пересчитать layout перед тем как вернуть значение.

- `BadCarousel` читает `offsetWidth` в `useEffect([index])` — при каждом нажатии кнопки
- `GoodCarousel` читает `offsetWidth` только при mount и при реальном ресайзе контейнера

### 2. Кэширование через ResizeObserver

"Кэш" — это значение `width` в state, прочитанное один раз при mount.

```js
useEffect(() => {
  const update = () => setWidth(el.offsetWidth); // читаем один раз
  update();

  const ro = new ResizeObserver(update); // инвалидируем кэш при ресайзе
  ro.observe(el);
  return () => ro.disconnect();
}, []); // пустой массив — не зависит от index
```

При навигации по слайдам DOM не читается — только умножение `width * index`.

### 3. `transform` vs `left` для анимации

| | `left` | `transform` |
|---|---|---|
| Вызывает reflow | Да | Нет |
| Вызывает repaint | Да | Нет (compositor) |
| GPU-ускорение | Нет | Да |

`transform: translateX()` обрабатывается на уровне compositor — без reflow и repaint.

---

## Идеальный вариант (продакшн)

Если слайды одинаковой ширины, пиксельный offset не нужен вообще:

```jsx
style={{ transform: `translateX(-${index * 100}%)` }}
```

Браузер сам считает процент, никакого JS для ширины, никакого reflow.

**Когда без пиксельного `width` не обойтись:** слайды разной ширины, кастомные gap, физика drag-to-swipe с momentum.

---

## Итог

Демо показывает два независимых улучшения:
1. **Не читай layout в hot path** — кэшируй через ResizeObserver
2. **Используй `transform` вместо `left`** — compositor-only, без reflow
