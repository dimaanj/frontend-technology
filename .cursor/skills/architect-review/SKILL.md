---
name: architect-review
description: Architecture review phase. Use after implementation. Verifies implementation matches design, flags deviations.
---

# Architect Review Phase

## Step 1: Verify against design

- Compare implementation to design document
- Check FSD structure (layers, slices)
- Verify public APIs (index.ts exports)
- Validate state shape (byId, allIds)

## Step 2: Flag deviations

- List any deviations from design
- Categorize: critical (must fix), minor (consider), acceptable (documented)
- Suggest corrections for critical issues

## Step 3: Document acceptable deviations

- If implementation differs for good reason, document in ADR
- Update design doc if design was wrong

## Output

Review report: matches / deviations with severity and recommendations.
