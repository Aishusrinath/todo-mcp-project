const STORAGE_KEY = "clearlist.tasks";

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const validationMessage = document.querySelector("#validation-message");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const taskCounter = document.querySelector("#task-counter");

let tasks = loadTasks();

render();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
});

input.addEventListener("input", () => {
  clearValidation();
});

taskList.addEventListener("change", (event) => {
  const toggle = event.target.closest(".task-toggle");

  if (!toggle) {
    return;
  }

  toggleTask(toggle.dataset.taskId);
});

taskList.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-button");

  if (!button) {
    return;
  }

  deleteTask(button.dataset.taskId);
});

function addTask() {
  const text = input.value.trim();

  if (!text) {
    showValidation();
    return;
  }

  tasks.push({
    id: createTaskId(),
    text,
    completed: false,
    createdAt: Date.now(),
  });

  persistTasks();
  render();

  input.value = "";
  input.focus();
  clearValidation();
}

function toggleTask(taskId) {
  tasks = tasks.map((task) =>
    task.id === taskId
      ? { ...task, completed: !task.completed }
      : task
  );

  persistTasks();
  render();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  persistTasks();
  render();
}

function render() {
  const orderedTasks = sortTasks(tasks);
  const activeCount = orderedTasks.filter((task) => !task.completed).length;

  taskList.innerHTML = orderedTasks
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

  taskCounter.textContent = `${activeCount} ${activeCount === 1 ? "task" : "tasks"} left`;
  emptyState.hidden = orderedTasks.length > 0;
}

function sortTasks(taskItems) {
  return [...taskItems].sort((a, b) => {
    if (a.completed !== b.completed) {
      return Number(a.completed) - Number(b.completed);
    }

    return a.createdAt - b.createdAt;
  });
}

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidTask);
  } catch (error) {
    return [];
  }
}

function persistTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function isValidTask(task) {
  return (
    task &&
    typeof task.id === "string" &&
    typeof task.text === "string" &&
    typeof task.completed === "boolean" &&
    typeof task.createdAt === "number"
  );
}

function createTaskId() {
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function showValidation() {
  validationMessage.hidden = false;
  input.classList.add("is-invalid");
  input.focus();
}

function clearValidation() {
  validationMessage.hidden = true;
  input.classList.remove("is-invalid");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
