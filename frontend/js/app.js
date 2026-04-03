// App module: wires together UI events, task operations, and persistence.

import { addTaskToList, deleteTaskFromList, toggleTaskInList } from "./tasks.js";
import { loadTasks, saveTasks } from "./storage.js";
import { clearValidation, getDomElements, renderApp, showValidation } from "./ui.js";

export function createTodoApp({
  storage = localStorage,
  elements = getDomElements(),
} = {}) {
  let tasks = loadTasks(storage);

  function render() {
    renderApp(elements, tasks);
  }

  function persist() {
    saveTasks(storage, tasks);
  }

  function handleAddTask(event) {
    event.preventDefault();

    const nextTasks = addTaskToList(tasks, elements.input.value);

    if (nextTasks === tasks) {
      showValidation(elements);
      return false;
    }

    tasks = nextTasks;
    persist();
    render();

    elements.input.value = "";
    elements.input.focus();
    clearValidation(elements);
    return true;
  }

  function handleToggleTask(taskId) {
    tasks = toggleTaskInList(tasks, taskId);
    persist();
    render();
  }

  function handleDeleteTask(taskId) {
    tasks = deleteTaskFromList(tasks, taskId);
    persist();
    render();
  }

  function bindEvents() {
    elements.form.addEventListener("submit", handleAddTask);

    elements.input.addEventListener("input", () => {
      clearValidation(elements);
    });

    elements.taskList.addEventListener("change", (event) => {
      const toggle = event.target.closest(".task-toggle");

      if (toggle) {
        handleToggleTask(toggle.dataset.taskId);
      }
    });

    elements.taskList.addEventListener("click", (event) => {
      const button = event.target.closest(".delete-button");

      if (button) {
        handleDeleteTask(button.dataset.taskId);
      }
    });
  }

  return {
    init() {
      render();
      bindEvents();
    },
    getTasks() {
      return [...tasks];
    },
  };
}

if (typeof document !== "undefined") {
  createTodoApp().init();
}
