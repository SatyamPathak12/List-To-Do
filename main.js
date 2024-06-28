document.addEventListener("DOMContentLoaded", loadTasks);

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("Please enter a task");
  } else {
    let task = inputBox.value;
    addTaskToDOM(task);
    saveTask(task, false);
    inputBox.value = "";
  }
}

function addTaskToDOM(task, isChecked = false) {
  let li = document.createElement("li");

  let checkbox = document.createElement("span");
  checkbox.classList.add("checkbox");
  if (isChecked) {
    li.classList.add("checked");
    checkbox.classList.add("checked");
  }
  checkbox.addEventListener("click", function (e) {
    e.stopPropagation();
    li.classList.toggle("checked");
    checkbox.classList.toggle("checked");
    updateTaskStatus(task);
  });

  let taskText = document.createElement("span");
  taskText.classList.add("task-text");
  taskText.innerHTML = task;

  let deleteIcon = document.createElement("span");
  deleteIcon.classList.add("delete-icon");
  deleteIcon.innerHTML = "&times;";
  deleteIcon.addEventListener("click", function (e) {
    e.stopPropagation();
    deleteTask(task);
    li.remove();
  });

  li.appendChild(checkbox);
  li.appendChild(taskText);
  li.appendChild(deleteIcon);
  listContainer.appendChild(li);

  li.addEventListener("click", function () {
    if (!e.target.classList.contains("delete-icon")) {
      li.classList.toggle("checked");
      checkbox.classList.toggle("checked");
      updateTaskStatus(task);
    }
  });
}

function saveTask(task, isChecked) {
  let tasks = getTasksFromStorage();
  tasks.push({ task, isChecked });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromStorage() {
  let tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function updateTaskStatus(task) {
  let tasks = getTasksFromStorage();
  tasks = tasks.map((t) => {
    if (t.task === task) {
      t.isChecked = !t.isChecked;
    }
    return t;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(task) {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter((t) => t.task !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = getTasksFromStorage();
  tasks.forEach((t) => {
    addTaskToDOM(t.task, t.isChecked);
  });
}
