document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("taskForm");
  if (!form) return;

  const input = document.getElementById("taskInput");
  const list = document.getElementById("taskList");
  const taskCount = document.getElementById("taskCount");
  const completedCount = document.getElementById("completedCount");
  const emptyMessage = document.getElementById("emptyMessage");
  const clearCompleted = document.getElementById("clearCompleted");
  const STORAGE_KEY = "foc-team-todo-tasks";

  function getTasks() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function renderTasks() {
    const tasks = getTasks();
    list.innerHTML = "";
    tasks.forEach(task => {
      const item = document.createElement("li");
      item.className = "task-item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.setAttribute("aria-label", `Mark ${task.text} as completed`);
      checkbox.addEventListener("change", () => {
        const updated = getTasks().map(t => t.id === task.id ? {...t, completed: checkbox.checked} : t);
        saveTasks(updated);
        renderTasks();
      });

      const text = document.createElement("span");
      text.className = task.completed ? "task-text done" : "task-text";
      text.textContent = task.text;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "delete-task";
      remove.textContent = "Delete";
      remove.setAttribute("aria-label", `Delete ${task.text}`);
      remove.addEventListener("click", () => {
        saveTasks(getTasks().filter(t => t.id !== task.id));
        renderTasks();
      });

      item.append(checkbox, text, remove);
      list.appendChild(item);
    });

    const completed = tasks.filter(t => t.completed).length;
    taskCount.textContent = `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`;
    completedCount.textContent = `${completed} completed`;
    emptyMessage.hidden = tasks.length !== 0;
    clearCompleted.hidden = completed === 0;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const tasks = getTasks();
    tasks.push({id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())), text, completed: false});
    saveTasks(tasks);
    input.value = "";
    renderTasks();
    input.focus();
  });

  clearCompleted.addEventListener("click", () => {
    saveTasks(getTasks().filter(task => !task.completed));
    renderTasks();
  });

  renderTasks();
});