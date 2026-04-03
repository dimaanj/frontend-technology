# Агенты для Pet RAG Editor

Промпты для создания специализированных агентов. Используй при настройке Cursor Rules или Custom Instructions.

## Файлы

- `architect.md` — архитектор (FSD, state, ADR)
- `developer.md` — разработчик (реализация слайсов)
- `tester.md` — тестировщик (Vitest, RTL, E2E)

## Full cycle workflow

Порядок скиллов для полного цикла: см. [AGENTS.md](../../AGENTS.md) в корне проекта.

1. architect-design
2. developer-implement
3. architect-review
4. test-runner

## Связанные скиллы

- `.cursor/skills/architect-design/`
- `.cursor/skills/developer-implement/`
- `.cursor/skills/architect-review/`
- `.cursor/skills/test-runner/`

## MCP для UI-тестов

**cursor-ide-browser**: browser_navigate, browser_snapshot, browser_click, browser_type, browser_scroll, browser_wait_for, browser_take_screenshot.
