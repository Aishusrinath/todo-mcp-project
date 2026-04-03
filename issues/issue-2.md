## Description

Add beginner-friendly inline editing to each task row. A user should be able to click `Edit`, update the task text in place, then save or cancel the change. Only one task may be edited at a time, and starting a new edit should cancel any previous unsaved edit.

## Acceptance criteria

- [ ] Each task row includes an `Edit` action
- [ ] Clicking `Edit` replaces the task text with an inline editing UI
- [ ] Only one task can be in edit mode at a time
- [ ] Clicking `Edit` on a different task cancels the previous unsaved edit
- [ ] Clicking `Save` persists the new task text
- [ ] Clicking `Cancel` restores the original task text
- [ ] Pressing `Enter` saves the edit
- [ ] Pressing `Escape` cancels the edit
- [ ] Editing works for both active and completed tasks

## Checklist tasks

- [ ] Add an `Edit` action to task rows
- [ ] Add edit-mode UI rendering for a task row
- [ ] Add edit state tracking in JavaScript
- [ ] Implement save behavior
- [ ] Implement cancel behavior
- [ ] Add keyboard handling for `Enter` and `Escape`
- [ ] Manually verify one-task-at-a-time editing behavior
