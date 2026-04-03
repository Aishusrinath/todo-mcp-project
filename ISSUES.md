# To-Do App Issue Breakdown

## Core

### Issue 1: Add task filtering controls and filtered list rendering

**Description**  
Add `All`, `Active`, and `Completed` filter controls above the task list and update the app so the list reflects the selected filter. The selected filter should be visually clear, reset to `All` on refresh, and not affect the existing active task counter. Empty-state messaging should change based on the current filter.

**Acceptance criteria**
- [ ] The UI shows `All`, `Active`, and `Completed` filter controls above the list
- [ ] Clicking a filter updates the visible task list immediately
- [ ] The selected filter has a clear active visual state
- [ ] The selected filter resets to `All` after a page refresh
- [ ] The active task counter still shows active tasks left regardless of filter
- [ ] The empty-state message changes appropriately for `All`, `Active`, and `Completed`

**Checklist tasks**
- [ ] Add filter controls to the HTML layout
- [ ] Add simple filter UI state in JavaScript
- [ ] Update rendering logic to show only tasks for the selected filter
- [ ] Add selected-state styles for filter controls
- [ ] Add filter-specific empty-state copy
- [ ] Manually verify filter behavior with mixed task states

### Issue 2: Add inline task editing with save and cancel flows

**Description**  
Add beginner-friendly inline editing to each task row. A user should be able to click `Edit`, update the task text in place, then save or cancel the change. Only one task may be edited at a time, and starting a new edit should cancel any previous unsaved edit.

**Acceptance criteria**
- [ ] Each task row includes an `Edit` action
- [ ] Clicking `Edit` replaces the task text with an inline editing UI
- [ ] Only one task can be in edit mode at a time
- [ ] Clicking `Edit` on a different task cancels the previous unsaved edit
- [ ] Clicking `Save` persists the new task text
- [ ] Clicking `Cancel` restores the original task text
- [ ] Pressing `Enter` saves the edit
- [ ] Pressing `Escape` cancels the edit
- [ ] Editing works for both active and completed tasks

**Checklist tasks**
- [ ] Add an `Edit` action to task rows
- [ ] Add edit-mode UI rendering for a task row
- [ ] Add edit state tracking in JavaScript
- [ ] Implement save behavior
- [ ] Implement cancel behavior
- [ ] Add keyboard handling for `Enter` and `Escape`
- [ ] Manually verify one-task-at-a-time editing behavior

### Issue 3: Add contextual "Clear completed" action

**Description**  
Add a `Clear completed` button that appears only when there is at least one completed task. Clicking it should immediately remove all completed tasks, keep the current filter selected, and show the correct empty-state message if the current filtered view becomes empty.

**Acceptance criteria**
- [ ] A `Clear completed` action appears only when completed tasks exist
- [ ] Clicking `Clear completed` removes all completed tasks immediately
- [ ] Active tasks remain untouched
- [ ] The selected filter remains unchanged after clearing completed tasks
- [ ] The empty-state message updates correctly if the current view becomes empty
- [ ] The updated task list persists after refresh

**Checklist tasks**
- [ ] Add `Clear completed` control to the UI
- [ ] Show or hide the control based on task state
- [ ] Implement removal of all completed tasks
- [ ] Persist the updated task list to local storage
- [ ] Verify behavior in `All`, `Active`, and `Completed` views
- [ ] Manually verify refresh persistence after clearing completed

## Improvements

### Issue 4: Add edit validation and preserve beginner-friendly editing rules

**Description**  
Extend the app's existing validation rules into the new edit flow. Empty edited text should be blocked with a small inline validation message, while duplicate task text should remain allowed. Unsaved invalid edits should not overwrite the original task text.

**Acceptance criteria**
- [ ] Saving an edited task with empty text is blocked
- [ ] An inline validation message appears for invalid edits
- [ ] The original task text remains unchanged after a failed save
- [ ] Duplicate edited task text is allowed
- [ ] The validation message clears when the user fixes the input

**Checklist tasks**
- [ ] Reuse or adapt existing validation logic for edit mode
- [ ] Add inline error messaging in the editing UI
- [ ] Prevent invalid edit saves from mutating stored tasks
- [ ] Clear edit validation feedback on user input
- [ ] Manually verify empty and duplicate edit cases

### Issue 5: Cancel active editing cleanly on filter changes

**Description**  
Keep the state model simple by canceling any active edit when the user changes filters. This should prevent confusing hidden edit states and ensure the app remains predictable when moving between `All`, `Active`, and `Completed`.

**Acceptance criteria**
- [ ] Changing filters while editing cancels the unsaved edit
- [ ] The original task text is restored after the canceled edit
- [ ] No hidden or orphaned edit state remains after filter changes
- [ ] The filtered list renders correctly after the edit is canceled

**Checklist tasks**
- [ ] Clear edit state during filter changes
- [ ] Restore original task content on edit cancellation
- [ ] Re-render the list cleanly after filter changes
- [ ] Manually verify editing plus filter-switch interaction

### Issue 6: Polish task row actions and keep the single-file code readable

**Description**  
Clean up the UI and script structure so the new features feel cohesive without making the code harder for beginners to follow. This includes making row actions visually understandable and organizing the single JavaScript file into clearer helper sections for task updates, filter state, edit state, and rendering.

**Acceptance criteria**
- [ ] The new actions fit cleanly into the existing task row layout
- [ ] The JavaScript remains in one file but is organized into clear helper sections
- [ ] The app still supports add, complete, uncomplete, and delete after the new features land
- [ ] The UI remains responsive and accessible after the new controls are added

**Checklist tasks**
- [ ] Tidy task row button layout for `Edit`, `Save`, `Cancel`, and `Delete`
- [ ] Group related JavaScript functions into readable sections
- [ ] Reduce duplication where new logic overlaps existing logic
- [ ] Smoke-test all existing and new interactions
- [ ] Do a quick responsive and keyboard pass
