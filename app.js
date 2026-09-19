const STORAGE_KEY = "today-todos";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");
const clearCompletedButton = document.querySelector("#clear-completed");

let todos = loadTodos();

// 從瀏覽器儲存空間載入之前的待辦事項。
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch {
    return [];
  }
}

// 將目前清單保存到瀏覽器，讓重新整理後資料仍然存在。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 根據最新資料重新繪製清單與未完成數量。
function renderTodos() {
  todoList.replaceChildren();

  todos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = "todo-item";
    item.classList.toggle("completed", todo.completed);

    const checkbox = document.createElement("input");
    checkbox.className = "todo-check";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `標記「${todo.text}」為${todo.completed ? "未完成" : "已完成"}`);
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);
    deleteButton.textContent = "×";
    deleteButton.addEventListener("click", () => deleteTodo(todo.id));

    item.append(checkbox, text, deleteButton);
    todoList.append(item);
  });

  const unfinishedCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  remainingCount.textContent = `未完成:${unfinishedCount} 項`;
  clearCompletedButton.hidden = completedCount === 0;
  clearCompletedButton.disabled = completedCount === 0;
  clearCompletedButton.setAttribute("aria-label", `清除已完成項目，共 ${completedCount} 項`);
  emptyState.hidden = todos.length > 0;
}

function addTodo(text) {
  todos.push({
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    text,
    completed: false,
  });
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) => (
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

function clearCompletedTodos() {
  const completedCount = todos.filter((todo) => todo.completed).length;

  if (completedCount === 0) {
    return;
  }

  const confirmed = window.confirm(`確定要刪除 ${completedCount} 個已完成項目嗎？`);
  if (!confirmed) {
    return;
  }

  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (!text) {
    todoInput.focus();
    return;
  }

  addTodo(text);
  todoInput.value = "";
  todoInput.focus();
});

clearCompletedButton.addEventListener("click", clearCompletedTodos);

renderTodos();
