## Description

Add `All`, `Active`, and `Completed` filter controls above the task list and update the app so the list reflects the selected filter. The selected filter should be visually clear, reset to `All` on refresh, and not affect the existing active task counter. Empty-state messaging should change based on the current filter.

## Acceptance criteria

- [ ] The UI shows `All`, `Active`, and `Completed` filter controls above the list
- [ ] Clicking a filter updates the visible task list immediately
- [ ] The selected filter has a clear active visual state
- [ ] The selected filter resets to `All` after a page refresh
- [ ] The active task counter still shows active tasks left regardless of filter
- [ ] The empty-state message changes appropriately for `All`, `Active`, and `Completed`

## Checklist tasks

- [ ] Add filter controls to the HTML layout
- [ ] Add simple filter UI state in JavaScript
- [ ] Update rendering logic to show only tasks for the selected filter
- [ ] Add selected-state styles for filter controls
- [ ] Add filter-specific empty-state copy
- [ ] Manually verify filter behavior with mixed task states
