const createNewTaskElement = function (taskString) {
  const task = document.createElement("li");
  task.className = "task";

  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = "task-text";

  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "Remove";
  deleteButton.appendChild(deleteButtonImg);

  task.appendChild(checkBox);
  task.appendChild(label);
  task.appendChild(editInput);
  task.appendChild(editButton);
  task.appendChild(deleteButton);

  return task;
};

const addTask = function () {
  if (!taskInput.value) return;
  const task = createNewTaskElement(taskInput.value);
  incompleteTaskList.appendChild(task);
  addTaskEvents(task);
};

const editTask = function () {
  const task = this.parentNode;
  const editInput = task.querySelector("input[type=text]");
  const label = task.querySelector("label");
  const editBtn = task.querySelector(".edit");
  const containsClass = task.classList.contains("editMode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  task.classList.toggle("editMode");
};

var deleteTask = function () {
  const task = this.parentNode;
  const taskList = task.parentNode;
  taskList.removeChild(task);
};

const addTaskEvents = function (task) {
  const checkBox = task.querySelector("input[type=checkbox]");
  const editButton = task.querySelector("button.edit");
  const deleteButton = task.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = toggleTaskChecbox;
};

const toggleTaskChecbox = function () {
  const task = this.parentNode;
  if (this.checked) {
    completedTasksList.appendChild(task);
  } else {
    incompleteTaskList.appendChild(task);
  }
};

const init = function (taskLists) {
  taskLists.forEach((taskList) => {
    for (let i = 0; i < taskList.children.length; i++) {
      addTaskEvents(taskList.children[i]);
    }
  });
};

const taskInput = document.getElementById("new-task");
const addButton = document.querySelector(".add-task__button");
addButton.onclick = addTask;

const incompleteTaskList = document.getElementById("incomplete-tasks");
const completedTasksList = document.getElementById("completed-tasks");

init([incompleteTaskList, completedTasksList]);
