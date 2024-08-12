const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let tasks = [];

inputBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const task = inputBox.value.trim();
    if (task) {
      const newTask = {
        text: task,
        completed: false
      };
      tasks.push(newTask);
      renderTaskList();
      inputBox.value = ''; // Clear the input field
    }
  }
});

listContainer.addEventListener("click", function(e) {
  if (e.target.className === "done") {
    const taskIndex = Array.prototype.indexOf.call(e.target.parentNode.parentNode.children, e.target.parentNode);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    renderTaskList();
  } else if (e.target.className === "remove") {
    const taskIndex = Array.prototype.indexOf.call(e.target.parentNode.parentNode.children, e.target.parentNode);
    tasks.splice(taskIndex, 1);
    renderTaskList();
  }
}, false);

function renderTaskList() {
  listContainer.innerHTML = '';
  tasks.forEach((task) => {
    const taskList = document.querySelector('ul');
    const newTask = document.createElement('li');
    const doneButton = document.createElement('span');
    doneButton.className = 'done';
    doneButton.innerHTML = '&#10004;';
    newTask.appendChild(doneButton);
    const taskText = document.createTextNode(task.text);
    newTask.appendChild(taskText);
    const removeButton = document.createElement('span');
    removeButton.className = 'remove';
    removeButton.innerHTML = '&#10006;';
    newTask.appendChild(removeButton);
    if (task.completed) {
      newTask.classList.add("completed");
    }
    taskList.appendChild(newTask);
  });
}

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTaskList();
  }
}

loadTasks();

// Add event listener to save data when user closes the tab
window.addEventListener("beforeunload", saveData);
