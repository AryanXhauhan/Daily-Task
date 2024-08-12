const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

inputBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const task = inputBox.value.trim();
    if (task) {
      const taskList = document.querySelector('ul');
      const newTask = document.createElement('li');
      const doneButton = document.createElement('span');
      doneButton.className = 'done';
      doneButton.innerHTML = '&#10004;';
      newTask.appendChild(doneButton);
      const taskText = document.createTextNode(task);
      newTask.appendChild(taskText);
      const removeButton = document.createElement('span');
      removeButton.className = 'remove';
      removeButton.innerHTML = '&#10006;';
      newTask.appendChild(removeButton);
      taskList.appendChild(newTask);
      inputBox.value = ''; // Clear the input field
    }
  }
});

listContainer.addEventListener("click", function(e) {
  if (e.target.className === "done") {
    e.target.parentNode.classList.toggle("completed");
  } else if (e.target.className === "remove") {
    e.target.parentNode.remove();
  }
}, false);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

// Add event listener to save data when user closes the tab
window.addEventListener("beforeunload", saveData);