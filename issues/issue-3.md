## Description

Add a `Clear completed` button that appears only when there is at least one completed task. Clicking it should immediately remove all completed tasks, keep the current filter selected, and show the correct empty-state message if the current filtered view becomes empty.

## Acceptance criteria

- [ ] A `Clear completed` action appears only when completed tasks exist
- [ ] Clicking `Clear completed` removes all completed tasks immediately
- [ ] Active tasks remain untouched
- [ ] The selected filter remains unchanged after clearing completed tasks
- [ ] The empty-state message updates correctly if the current view becomes empty
- [ ] The updated task list persists after refresh

## Checklist tasks

- [ ] Add `Clear completed` control to the UI
- [ ] Show or hide the control based on task state
- [ ] Implement removal of all completed tasks
- [ ] Persist the updated task list to local storage
- [ ] Verify behavior in `All`, `Active`, and `Completed` views
- [ ] Manually verify refresh persistence after clearing completed
