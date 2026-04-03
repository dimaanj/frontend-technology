---
name: developer-implement
description: Implementation phase. Use after design is approved. Implements according to design document, follows project conventions.
---

# Developer Implement Phase

## Prerequisites

- Design document or ADR from architect-design phase
- Clear FSD structure and public APIs

## Step 1: Implement according to design

- Create slices in correct FSD layers
- Follow byId/allIds for state
- Export only via index.ts
- Add data-testid for E2E selectors

## Step 2: Follow project conventions

- TypeScript, typed interfaces
- FSD import rules (only from lower layers)
- Reflow optimizations where applicable (RAF, transform)

## Step 3: Do not deviate

- If design seems wrong, flag it — do not silently change
- Propose changes explicitly for architect review

## Output

Working implementation matching the design.
