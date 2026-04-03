## Description

Keep the state model simple by canceling any active edit when the user changes filters. This should prevent confusing hidden edit states and ensure the app remains predictable when moving between `All`, `Active`, and `Completed`.

## Acceptance criteria

- [ ] Changing filters while editing cancels the unsaved edit
- [ ] The original task text is restored after the canceled edit
- [ ] No hidden or orphaned edit state remains after filter changes
- [ ] The filtered list renders correctly after the edit is canceled

## Checklist tasks

- [ ] Clear edit state during filter changes
- [ ] Restore original task content on edit cancellation
- [ ] Re-render the list cleanly after filter changes
- [ ] Manually verify editing plus filter-switch interaction
