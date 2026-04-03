import test from "node:test";
import assert from "node:assert/strict";

import { STORAGE_KEY, loadTasks, saveTasks } from "../frontend/js/storage.js";
import {
  addTaskToList,
  deleteTaskFromList,
  toggleTaskInList,
} from "../frontend/js/tasks.js";

test("adding a task appends a new active task with trimmed text", () => {
  const tasks = addTaskToList(
    [],
    "  Buy milk  ",
    () => "task-1",
    () => 123
  );

  assert.deepEqual(tasks, [
    {
      id: "task-1",
      text: "Buy milk",
      completed: false,
      createdAt: 123,
    },
  ]);
});

test("adding a blank task returns the original list unchanged", () => {
  const originalTasks = [];
  const tasks = addTaskToList(originalTasks, "   ");

  assert.equal(tasks, originalTasks);
  assert.deepEqual(tasks, []);
});

test("deleting a task removes only the matching task", () => {
  const tasks = deleteTaskFromList(
    [
      { id: "a", text: "First", completed: false, createdAt: 1 },
      { id: "b", text: "Second", completed: true, createdAt: 2 },
    ],
    "a"
  );

  assert.deepEqual(tasks, [
    { id: "b", text: "Second", completed: true, createdAt: 2 },
  ]);
});

test("deleting a missing task leaves the list unchanged", () => {
  const originalTasks = [
    { id: "a", text: "First", completed: false, createdAt: 1 },
  ];

  const tasks = deleteTaskFromList(originalTasks, "missing");

  assert.deepEqual(tasks, originalTasks);
});

test("toggling completed flips only the matching task", () => {
  const tasks = toggleTaskInList(
    [
      { id: "a", text: "First", completed: false, createdAt: 1 },
      { id: "b", text: "Second", completed: true, createdAt: 2 },
    ],
    "a"
  );

  assert.deepEqual(tasks, [
    { id: "a", text: "First", completed: true, createdAt: 1 },
    { id: "b", text: "Second", completed: true, createdAt: 2 },
  ]);
});

test("toggling a missing task leaves all tasks unchanged", () => {
  const originalTasks = [
    { id: "a", text: "First", completed: false, createdAt: 1 },
  ];

  const tasks = toggleTaskInList(originalTasks, "missing");

  assert.deepEqual(tasks, originalTasks);
});

test("saving tasks writes JSON to localStorage with the app storage key", () => {
  const storage = createStorageMock();
  const tasks = [
    { id: "a", text: "First", completed: false, createdAt: 1 },
  ];

  saveTasks(storage, tasks);

  assert.equal(storage.getItem(STORAGE_KEY), JSON.stringify(tasks));
});

test("loading tasks returns previously saved valid tasks from localStorage", () => {
  const storage = createStorageMock({
    [STORAGE_KEY]: JSON.stringify([
      { id: "a", text: "First", completed: false, createdAt: 1 },
      { id: "b", text: "Second", completed: true, createdAt: 2 },
    ]),
  });

  const tasks = loadTasks(storage);

  assert.deepEqual(tasks, [
    { id: "a", text: "First", completed: false, createdAt: 1 },
    { id: "b", text: "Second", completed: true, createdAt: 2 },
  ]);
});

test("loading tasks ignores invalid task objects from localStorage", () => {
  const storage = createStorageMock({
    [STORAGE_KEY]: JSON.stringify([
      { id: "a", text: "First", completed: false, createdAt: 1 },
      { id: "b", text: "Missing createdAt", completed: true },
    ]),
  });

  const tasks = loadTasks(storage);

  assert.deepEqual(tasks, [
    { id: "a", text: "First", completed: false, createdAt: 1 },
  ]);
});

test("loading tasks returns an empty list when localStorage contains invalid JSON", () => {
  const storage = createStorageMock({
    [STORAGE_KEY]: "{not-json}",
  });

  const tasks = loadTasks(storage);

  assert.deepEqual(tasks, []);
});

function createStorageMock(initialValues = {}) {
  const values = { ...initialValues };

  return {
    getItem(key) {
      return Object.hasOwn(values, key) ? values[key] : null;
    },
    setItem(key, value) {
      values[key] = String(value);
    },
  };
}
