# Reflow Demos — разбор Bad vs Good

Каждый компонент показывает пару подходов: с лишними reflow и оптимизированный.

---

## 1. Infinite Scroll — layout thrashing

| | Bad | Good |
|---|---|---|
| Проблема | `offsetHeight` (read) → `style.background` (write) в цикле в `scroll`-обработчике | Все reads собраны вместе, writes — отдельно |
| DOM | Все 200 элементов сразу | Виртуализация: только видимые ±4 элемента |
| Инструмент | — | `requestAnimationFrame` + `translateY` для offset |

**Паттерн:** чередование read/write в цикле → браузер не может откладывать reflow, делает его на каждой итерации.

---

## 2. Drag & Drop — left/top vs transform

| | Bad | Good |
|---|---|---|
| CSS-свойство | `style.left`, `style.top` | `transform: translate(x, y)` |
| Browser pipeline | Layout → Paint → Composite | **Только Composite** |

`left`/`top` влияют на геометрию элемента и его соседей → принудительный reflow на каждый `mousemove`. `transform` обрабатывается отдельным compositor thread и не затрагивает layout.

---

## 3. Carousel — read при каждом клике vs кэш

| | Bad | Good |
|---|---|---|
| Когда читаем `offsetWidth` | В `useEffect` при каждом изменении `index` | Один раз при mount + `ResizeObserver` при resize |
| CSS-свойство сдвига | `left: -offset` | `transform: translateX(-offset)` |

`offsetWidth` — synchronous layout query, форсирует reflow. `ResizeObserver` отдаёт уведомление асинхронно, без форсирования.

---

## 4. Modal — JS-центрирование vs CSS

| | Bad | Good |
|---|---|---|
| Способ | `getBoundingClientRect()` + `window.innerWidth/Height` → `style.left/top` | `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%)` |
| Reflow | Да — forced layout при открытии | Нет — браузер сам центрирует без JS |

`getBoundingClientRect` читает computed layout → форсирует синхронный reflow. CSS `transform` — compositing, layout вообще не нужен.

---

## 5. Tooltip — немедленный read vs отложенный

| | Bad | Good |
|---|---|---|
| Момент read | Сразу в `mouseenter` | `setTimeout(100ms)` + `requestAnimationFrame` |
| Смысл | Читаем layout до того, как браузер готов | Даём браузеру завершить текущий frame, потом один read |

Immediate `getBoundingClientRect` в `mouseenter` вызывает reflow в середине event handling. Задержка + RAF батчит его в следующий frame.

---

## 6. Sticky Table — offsetTop в scroll vs CSS sticky

| | Bad | Good |
|---|---|---|
| В scroll-handler | `offsetTop + offsetHeight` для каждой строки = N reflow-ов | Один `scrollTop` read в RAF |
| Позиционирование заголовка | JS вычисление | `position: sticky` — нативно, без JS |

---

## Общие паттерны

| Паттерн | Суть |
|---|---|
| Read-write batching | Никогда не чередуй read/write в цикле — сначала все reads, потом все writes |
| `transform` vs `left/top` | `transform` = compositor only, без reflow и repaint |
| `requestAnimationFrame` | Батчинг обновлений, чтение геометрии только перед рисованием frame |
| CSS `sticky`/`fixed` | Нативное позиционирование браузером без JS layout queries |
| `ResizeObserver` | Async, не форсирует reflow в отличие от прямого чтения `offsetWidth` |

**Ключевая идея:** браузер откладывает reflow до следующего frame, но если синхронно читать геометрические свойства (`offsetWidth`, `getBoundingClientRect`, `offsetTop`) — он обязан сделать reflow прямо сейчас.
