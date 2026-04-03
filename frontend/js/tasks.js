// Task domain rules: create, validate, sort, and update task collections.

export function addTaskToList(taskItems, text, createId = createTaskId, now = Date.now) {
  const trimmedText = text.trim();

  if (!trimmedText) {
    return taskItems;
  }

  return [
    ...taskItems,
    {
      id: createId(),
      text: trimmedText,
      completed: false,
      createdAt: now(),
    },
  ];
}

export function deleteTaskFromList(taskItems, taskId) {
  return taskItems.filter((task) => task.id !== taskId);
}

export function toggleTaskInList(taskItems, taskId) {
  return taskItems.map((task) =>
    task.id === taskId
      ? { ...task, completed: !task.completed }
      : task
  );
}

export function sortTasks(taskItems) {
  return [...taskItems].sort((a, b) => {
    if (a.completed !== b.completed) {
      return Number(a.completed) - Number(b.completed);
    }

    return a.createdAt - b.createdAt;
  });
}

export function isValidTask(task) {
  return (
    task &&
    typeof task.id === "string" &&
    typeof task.text === "string" &&
    typeof task.completed === "boolean" &&
    typeof task.createdAt === "number"
  );
}

export function createTaskId() {
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
