# PRD: Add edit, filter, and clear completed features to the to-do app

## Problem Statement

The current to-do app proves the basic flow of adding, completing, and deleting tasks, but it becomes limiting as soon as a user wants to manage a real list. Users cannot fix a typo after creating a task, cannot narrow the list to only active or completed items, and cannot remove all completed work in one step. That makes the app feel like a first draft instead of a usable proof of concept.

## Solution

Extend the existing beginner-friendly frontend so users can edit task text inline, filter the list by `All`, `Active`, or `Completed`, and clear all completed tasks with one action. The implementation should stay simple, readable, and approachable for someone learning from the codebase, while preserving the app's current strengths: local storage persistence, quick interactions, and a calm single-screen UI.

## User Stories

1. As a user, I want to edit an existing task, so that I can fix mistakes without deleting and recreating it.
2. As a user, I want editing to happen inline in the task row, so that the flow feels simple and direct.
3. As a user, I want only one task to be editable at a time, so that the interface stays easy to understand.
4. As a user, I want unsaved edits to be canceled when I start editing another task, so that the app avoids confusing overlapping states.
5. As a user, I want unsaved edits to be canceled when I change filters, so that filter behavior stays predictable.
6. As a user, I want to save an edit with a button, so that the action is obvious.
7. As a keyboard user, I want pressing `Enter` to save an edit, so that editing feels fast.
8. As a keyboard user, I want pressing `Escape` to cancel an edit, so that I can back out quickly.
9. As a user, I want edited tasks to follow the same validation rules as new tasks, so that the app behaves consistently.
10. As a user, I want empty edited text to be rejected, so that tasks always remain meaningful.
11. As a user, I want duplicate task text to still be allowed, so that the app stays simple and flexible.
12. As a user, I want to edit both active and completed tasks, so that I am not blocked by task state.
13. As a user, I want to filter tasks by `All`, so that I can see the entire list.
14. As a user, I want to filter tasks by `Active`, so that I can focus on unfinished work.
15. As a user, I want to filter tasks by `Completed`, so that I can review finished items separately.
16. As a user, I want the selected filter to be obvious in the UI, so that I always know what I am looking at.
17. As a user, I want filters to be simple buttons above the list, so that they are easy to discover.
18. As a user, I want the active task counter to keep showing active tasks left regardless of the selected filter, so that the app keeps one consistent progress signal.
19. As a user, I want filter state to reset to `All` on refresh, so that the feature stays simple and does not add extra persistence rules.
20. As a user, I want the empty-state message to match the selected filter, so that I understand why no tasks are shown.
21. As a user, I want a `Clear completed` action, so that I can clean up finished work quickly.
22. As a user, I want `Clear completed` to appear only when there are completed tasks, so that the interface stays uncluttered.
23. As a user, I want `Clear completed` to remove completed tasks immediately, so that it matches the app's current low-friction delete behavior.
24. As a user, I want the current filter to remain selected after clearing completed tasks, so that the app does not unexpectedly change views.
25. As a user viewing `Completed`, I want to see a clear empty state after clearing completed tasks, so that the app still feels intentional.
26. As a beginner developer, I want the code to remain simple and readable, so that I can learn from it and safely extend it later.
27. As a future maintainer, I want task state, filtering, and rendering concerns to be separated into small helpers, so that new features do not turn the file into spaghetti.

## Implementation Decisions

- Keep the app frontend-only and continue storing tasks in local storage.
- Keep the code beginner-friendly by staying within a single JavaScript file, but organize it into clearer helper sections for task updates, filter state, and rendering.
- Introduce a small UI state for the selected filter with three values: `All`, `Active`, and `Completed`.
- Reset the selected filter to `All` on refresh instead of persisting it.
- Add inline editing within the task row rather than using a modal or separate form.
- Allow only one task in edit mode at a time.
- Cancel any existing edit when the user starts editing a different task.
- Cancel edit mode when the user switches filters.
- Support edit save via `Save` button and `Enter`, and support cancel via `Cancel` button and `Escape`.
- Reuse the current validation philosophy: block empty text, allow duplicate text.
- Apply editing rules to both active and completed tasks.
- Keep the active task counter as a global progress signal rather than changing it to reflect the current filter.
- Add filter controls above the task list as simple buttons or pills.
- Add a contextual `Clear completed` button that only appears when at least one completed task exists.
- Make `Clear completed` immediate, with no confirmation step.
- Keep current ordering rules intact: active tasks first, completed tasks after, oldest-first within each group.
- Update empty-state copy so it changes depending on whether the user is viewing `All`, `Active`, or `Completed`.

## Testing Decisions

- Good tests should verify external behavior a user can observe, not internal implementation details.
- Manual browser checks are enough for the current stage of the project.
- Manual checks should cover creating tasks, editing tasks, canceling edits, keyboard editing behavior, switching filters, clearing completed tasks, empty-state behavior per filter, and local storage persistence after changes.
- If a test setup is added later, prioritize small behavior tests around task editing, filter selection, filtered rendering, and clearing completed tasks.
- Future tests should focus on user-visible outcomes such as which tasks appear, which buttons are shown, whether invalid edits are blocked, and whether completed tasks are removed.

## Out of Scope

- Authentication or multi-user support.
- Backend or API integration.
- Drag-and-drop sorting or manual reordering.
- Due dates, priorities, categories, or tags.
- Bulk actions beyond `Clear completed`.
- Persisting the selected filter across refreshes.
- Confirmation dialogs or undo flows.
- Dark mode or broader visual redesign.
- A full automated test harness in this PRD.

## Further Notes

- The current app already has a simple and workable foundation, so this should be treated as a focused enhancement rather than a rewrite.
- The main product goal remains the same: the app should feel fast, obvious, and friendly within the first minute of use.
