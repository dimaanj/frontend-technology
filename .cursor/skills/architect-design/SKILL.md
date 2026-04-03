---
name: architect-design
description: Architecture design phase. Use when starting a new feature, refactoring, or when user asks for design. Analyzes requirements, proposes design, documents decisions.
---

# Architect Design Phase

## Step 1: Analyze requirements

- Clarify scope and constraints
- Identify entities, features, widgets (FSD)
- List integrations (API, WebSocket, etc.)

## Step 2: Propose design

- FSD structure (layers, slices, segments)
- Normalized state (byId, allIds)
- Data flows (diagrams if helpful)
- Public API per slice (index.ts)

## Step 3: Document decisions

- ADR for non-obvious choices
- Technology rationale
- Trade-offs

## Output

Design document or ADR that developer can implement from.
