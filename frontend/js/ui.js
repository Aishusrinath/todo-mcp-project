// UI module: DOM lookup, rendering, and validation feedback stay here.

import { sortTasks } from "./tasks.js";

export function getDomElements() {
  return {
    form: document.querySelector("#task-form"),
    input: document.querySelector("#task-input"),
    validationMessage: document.querySelector("#validation-message"),
    taskList: document.querySelector("#task-list"),
    emptyState: document.querySelector("#empty-state"),
    taskCounter: document.querySelector("#task-counter"),
  };
}

export function renderApp(elements, taskItems) {
  const orderedTasks = sortTasks(taskItems);
  const activeCount = orderedTasks.filter((task) => !task.completed).length;

  elements.taskList.innerHTML = orderedTasks
    .map(
      (task) => `
        <li class="task-item ${task.completed ? "completed" : ""}">
          <input
            class="task-toggle"
            type="checkbox"
            data-task-id="${task.id}"
            aria-label="Mark ${escapeHtml(task.text)} as ${task.completed ? "active" : "complete"}"
            ${task.completed ? "checked" : ""}
          >
          <p class="task-text">${escapeHtml(task.text)}</p>
          <button class="delete-button" type="button" data-task-id="${task.id}" aria-label="Delete ${escapeHtml(task.text)}">
            Delete
          </button>
        </li>
      `
    )
    .join("");

  elements.taskCounter.textContent = `${activeCount} ${activeCount === 1 ? "task" : "tasks"} left`;
  elements.emptyState.hidden = orderedTasks.length > 0;
}

export function showValidation(elements) {
  elements.validationMessage.hidden = false;
  elements.input.classList.add("is-invalid");
  elements.input.focus();
}

export function clearValidation(elements) {
  elements.validationMessage.hidden = true;
  elements.input.classList.remove("is-invalid");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
