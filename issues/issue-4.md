## Description

Extend the app's existing validation rules into the new edit flow. Empty edited text should be blocked with a small inline validation message, while duplicate task text should remain allowed. Unsaved invalid edits should not overwrite the original task text.

## Acceptance criteria

- [ ] Saving an edited task with empty text is blocked
- [ ] An inline validation message appears for invalid edits
- [ ] The original task text remains unchanged after a failed save
- [ ] Duplicate edited task text is allowed
- [ ] The validation message clears when the user fixes the input

## Checklist tasks

- [ ] Reuse or adapt existing validation logic for edit mode
- [ ] Add inline error messaging in the editing UI
- [ ] Prevent invalid edit saves from mutating stored tasks
- [ ] Clear edit validation feedback on user input
- [ ] Manually verify empty and duplicate edit cases
