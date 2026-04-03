## Description

Clean up the UI and script structure so the new features feel cohesive without making the code harder for beginners to follow. This includes making row actions visually understandable and organizing the single JavaScript file into clearer helper sections for task updates, filter state, edit state, and rendering.

## Acceptance criteria

- [ ] The new actions fit cleanly into the existing task row layout
- [ ] The JavaScript remains in one file but is organized into clear helper sections
- [ ] The app still supports add, complete, uncomplete, and delete after the new features land
- [ ] The UI remains responsive and accessible after the new controls are added

## Checklist tasks

- [ ] Tidy task row button layout for `Edit`, `Save`, `Cancel`, and `Delete`
- [ ] Group related JavaScript functions into readable sections
- [ ] Reduce duplication where new logic overlaps existing logic
- [ ] Smoke-test all existing and new interactions
- [ ] Do a quick responsive and keyboard pass
