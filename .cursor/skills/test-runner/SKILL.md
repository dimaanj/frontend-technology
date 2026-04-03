---
name: test-runner
description: Testing phase. Use after implementation. Adds or runs tests, fixes failures.
---

# Test Runner Phase

## Step 1: Add tests

- Unit: store actions, selectors (Vitest)
- Component: widgets, features (React Testing Library)
- E2E: critical flows (Playwright or cursor-ide-browser)

## Step 2: Run tests

```bash
npm test
```

## Step 3: Fix failures

- Fix failing tests or fix implementation
- Do not skip or disable tests without documenting why

## Step 4: Verify coverage

- Critical paths covered
- Mocks for WebSocket/SSE where needed

## Output

All tests passing.
