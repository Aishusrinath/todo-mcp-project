// Storage module: all localStorage reads and writes live behind these helpers.

import { isValidTask } from "./tasks.js";

export const STORAGE_KEY = "clearlist.tasks";

export function loadTasks(storage = localStorage, storageKey = STORAGE_KEY) {
  try {
    const stored = storage.getItem(storageKey);
    const parsed = stored ? JSON.parse(stored) : [];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidTask);
  } catch (error) {
    return [];
  }
}

export function saveTasks(storage, taskItems, storageKey = STORAGE_KEY) {
  storage.setItem(storageKey, JSON.stringify(taskItems));
}
