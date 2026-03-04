# Tech Components — запуск в браузере

Компоненты из папки `tech/components` можно запускать локально через Vite.

## Запуск

```bash
cd tech/components
npm install
npm run dev
```

Открой в браузере адрес из вывода (обычно http://localhost:5173).

## Какой компонент показывается

По умолчанию рендерится **Accordion**. Переключение по хешу в URL:

- `http://localhost:5173/#accordion` — Accordion

Чтобы добавить новый компонент:

1. Создай папку, например `tech/components/my-component/`.
2. В `main.jsx` импортируй компонент и добавь его в объект `components`:

```js
import MyComponent from './my-component/App.jsx';

const components = {
  accordion: AccordionApp,
  'my-component': MyComponent,
};
```

3. Открывай `http://localhost:5173/#my-component`.

## Сборка

```bash
npm run build
npm run preview   # просмотр собранной версии
```
