# Drag & Drop — left/top vs transform

## Флоу перетаскивания (общий для обоих вариантов)

```
mousedown на drag-box
  └─ запоминаем offset = { x: clientX - pos.x, y: clientY - pos.y }
       (разница между курсором и левым-верхним углом бокса)

mousemove на drag-area
  └─ если offset есть → считаем новую позицию
       new_x = clientX - offset.x
       new_y = clientY - offset.y
     → обновляем state pos

mouseup на drag-area
  └─ сбрасываем offset в null → перетаскивание остановлено
```

Зачем хранить `offset`? Чтобы бокс не "прыгал" к курсору при захвате.
Кликнул в середине бокса → разница между курсором и углом бокса сохранена → при движении бокс держит эту же точку захвата.

---

## Зачем два раза вычитать clientX

Строка в `mousedown` **не двигает** элемент — она только сохраняет, в какую точку бокса кликнули.
Двигает элемент именно `setPos` в `mousemove`.

**Разбор на числах:**

```
drag-area начинается в x=100 от viewport
бокс стоит в pos.x = 20 (относительно drag-area)
визуально бокс = 120px от левого края экрана

Кликаем в середину бокса:
  e.clientX = 170 (курсор в viewport)
```

**mousedown:**
```
dragRef.x = clientX  - pos.x
           = 170     - 20
           = 150     ← "grab offset": курсор на 150px правее origin drag-area
```

**mousemove**, курсор сдвинулся до clientX = 200:
```
new pos.x = clientX  - dragRef.x
           = 200     - 150
           = 50      ← новая позиция бокса
```

**Если раскрыть полностью:**
```
new_pos = clientX_now - (clientX_down - pos_at_down)
        = (clientX_now - clientX_down) + pos_at_down
        =      Δмышь                  + начальная_позиция
```

Т.е. это просто: **начальная позиция + сколько сдвинулась мышь**.

**Почему нельзя просто `setPos({ x: e.clientX })`?**
- `left` позиционируется относительно контейнера, а `clientX` — относительно viewport. Координатные системы разные.
- Верхний-левый угол бокса прыгнет прямо под курсор в момент клика, игнорируя, что кликнули в середину.

---

## Чем отличаются два варианта

### BadDrag — `left` / `top`

```jsx
style={{ left: pos.x, top: pos.y }}
```

Каждый `setPos` → React меняет `left`/`top` в стиле.

**Что происходит в браузере при каждом mousemove:**

```
JS setPos()
  → изменение style.left / style.top
    → Layout (reflow) — браузер пересчитывает геометрию элемента и его соседей
      → Paint — перерисовывает пиксели
        → Composite — выводит на экран
```

`left`/`top` — это геометрические свойства. Браузер не знает, как они повлияют
на других элементов вокруг (могут ли они "сдвинуть" соседей), поэтому **обязан**
пересчитать layout всего affected-дерева. При 60fps = 60 reflow в секунду.

---

### GoodDrag — `transform: translate()`

```jsx
style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
```

Каждый `setPos` → React меняет `transform` в стиле.

**Что происходит в браузере при каждом mousemove:**

```
JS setPos()
  → изменение transform
    → Composite only — GPU двигает слой, не трогая layout
```

`transform` не влияет на layout соседей — браузер **гарантированно** знает это.
Элемент с `transform` поднимается на отдельный compositing layer (GPU-текстура).
Перемещение = сдвиг текстуры на GPU, без участия CPU в layout/paint.

---

## Сравнение пайплайнов

| Этап | `left/top` | `transform` |
|------|-----------|-------------|
| **Layout (reflow)** | ✅ каждый кадр | ❌ не нужен |
| **Paint** | ✅ каждый кадр | ❌ не нужен |
| **Composite** | ✅ каждый кадр | ✅ только это |
| **CPU нагрузка** | высокая | минимальная |
| **GPU** | не используется | сдвиг текстуры |
| **Jank при 60fps** | возможен | маловероятен |

---

## Почему `pos` всё равно в state?

Оба варианта используют `useState` для `pos`. В GoodDrag это всё ещё вызывает
ре-рендер React при каждом mousemove. Для идеального варианта можно уйти от state:

```js
// Без state — напрямую через ref и DOM
const onMouseMove = (e) => {
  if (!dragRef.current) return;
  const x = e.clientX - dragRef.current.offsetX;
  const y = e.clientY - dragRef.current.offsetY;
  boxRef.current.style.transform = `translate(${x}px, ${y}px)`;
};
```

Это убирает ре-рендер React полностью — только composite.

---

## Ключевые свойства, которые НЕ вызывают reflow

Можно анимировать/менять без reflow:
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (с осторожностью)

Всё остальное (`width`, `height`, `left`, `top`, `margin`, `padding`, `font-size` и т.д.) — **вызывает reflow**.

---

## Итог

- **`left/top`** — удобно читать, но дорого: reflow + paint на каждый кадр.
- **`transform`** — только composite, GPU, нет reflow. Стандарт для анимаций и drag-n-drop.
- В продакшне: либо `transform` + убрать state (прямой DOM-доступ через ref), либо `transform` + `requestAnimationFrame` для батчинга.
