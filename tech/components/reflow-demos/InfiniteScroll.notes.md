# InfiniteScroll — разбор ключевых моментов

---

## 1. `void items[i].offsetHeight` — зачем `void`

`void expr` вычисляет выражение и выбрасывает результат, возвращая `undefined`.  
Здесь используется чтобы заглушить lint-предупреждение «unused expression» и явно обозначить намерение: читаем не для получения значения, а ради побочного эффекта — принудительного reflow.

`offsetHeight` — synchronous layout query: браузер обязан пересчитать геометрию прямо сейчас, чтобы вернуть значение.

**В реальном коде так не пишут** — это искусственный пример плохого паттерна для демонстрации.

---

## 2. `items[i].style.background = ...` — что это

Прямая запись инлайн-стиля в DOM. Браузер помечает layout как «грязный» (dirty).  
Следующий `offsetHeight` (read) вынужден заново пересчитать layout перед тем как вернуть значение.

**Плохой паттерн в цикле:**

```
read → write → read → write → read → write
↑ reflow  ↑ dirty  ↑ reflow  ↑ dirty  ↑ reflow
```

**Хороший паттерн:**

```
read → read → read → write → write → write
↑ один reflow                ↑ один repaint
```

---

## 3. `start`, `count`, `end` — вычисление видимого диапазона

Переменные виртуализации — определяют, какие из 200 элементов рендерить в DOM.

```javascript
const start = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - 2);  // первый видимый − буфер
const count = Math.ceil(clientHeight / ITEM_HEIGHT) + 4;              // видимых + буфер (2+2)
const end   = Math.min(TOTAL, start + count);                         // последний
```

**Пример** (контейнер 200px, `ITEM_HEIGHT=48`, прокрутили 300px):
```
start = floor(300/48) - 2 = 6 - 2 = 4
count = ceil(200/48) + 4  = 5 + 4 = 9
end   = 4 + 9 = 13
```
В DOM — только элементы 4–13, остальные 187 не рендерятся.

---

## 4. `clientHeight` vs `offsetHeight`

| | `clientHeight` | `offsetHeight` |
|---|---|---|
| Включает | padding + контент | padding + контент + border + scrollbar |
| Назначение | видимая область внутри | полный внешний размер |

Для виртуализации нужно «сколько элементов видит пользователь» → `clientHeight`.  
`offsetHeight` включает border (~1-2px) и вертикальный скроллбар (~17px) — `count` был бы чуть завышен.

---

## 5. Как работает скролл и `scrollTop`

`scrollTop` — количество прокрученных пикселей сверху. Растёт при скролле вниз. Из него выводится всё:

```
scrollTop → start/end → setRange → React рендерит нужные элементы
scrollTop → translateY → список сдвигается на правильную позицию
```

**`scroll-spacer`** с `height = 200 * ITEM_HEIGHT` создаёт виртуальное полное пространство — без него `scrollTop` никогда не вырастет до больших значений и скроллбар будет неправильным.

---

## 6. `translateY` vs `top`/`left`

**Три стадии browser render pipeline:**

```
Layout (reflow)  →  Paint (repaint)  →  Composite
геометрия           пиксели              склейка слоёв
```

| Свойство | Layout | Paint | Composite |
|---|---|---|---|
| `top`, `left` | ✅ да | ✅ да | ✅ да |
| `background` | ❌ нет | ✅ да | ✅ да |
| `transform`, `opacity` | ❌ нет | ❌ нет | ✅ только |

`transform: translateY` — только compositing. Браузер выносит элемент на отдельный GPU-слой и двигает его без пересчёта layout.

**Дополнительно:** `transform` работает на любом элементе, не требует `position: absolute/relative`, не сдвигает соседей.

---

## 7. `requestAnimationFrame` + `tickingRef`

**RAF** — синхронизирует `update()` с циклом отрисовки браузера (~60fps).  
Событие `scroll` может стрелять 100+ раз/сек. Без RAF — лишние пересчёты между кадрами, которые браузер не успеет показать.

**`tickingRef`** — защита от дублирования RAF-вызовов (throttle через RAF):

```javascript
const onScroll = () => {
  if (tickingRef.current) return;       // RAF уже запланирован — пропускаем
  tickingRef.current = true;
  requestAnimationFrame(() => {
    update();
    tickingRef.current = false;         // кадр отрисован — принимаем следующий
  });
};
```

```
scroll → ticking=false → ставим RAF, ticking=true
scroll → ticking=true  → return (игнор)
scroll → ticking=true  → return (игнор)
кадр   → update() один раз → ticking=false
scroll → ticking=false → ставим новый RAF
```

Итог: `update()` вызывается максимум 60 раз/сек независимо от частоты событий.

**Альтернатива:** `throttle(update, 16)` из lodash — похожий эффект, но RAF точнее привязан к реальному кадру браузера.
