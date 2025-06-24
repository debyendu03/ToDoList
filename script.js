const tickIconEl = document.querySelector("#tick-icon");
const editIconEl = document.querySelector(".edit-icon");
const checkmarkconEl = document.querySelector(".checkmark-icon");
const addTaskBtnEl = document.querySelector("#plus-icon");
const taskContainerEl = document.querySelector("#task-container");
const inputEl = document.querySelector("#input");
const footerDiv = document.querySelector(".footer-div");

addTaskBtnEl.addEventListener("click", () => {
  const inputValue = inputEl.value;
  if (inputEl.value == "") {
    alert("input is emepty");
    return;
  }
  const newTask = document.createElement("div");
  newTask.classList.add("tasks-div");
  newTask.innerHTML = `<div class="left-section-of-task-div">
            <i class="circle-icon"
              ><img src="/icons/circle.svg" alt="circle icon"
            /></i>
            <span class="task-text">${inputValue}</span>
          </div>
          <div class="right-section-of-task-div">
            <i class="edit-icon"
              ><img src="/icons/edit.svg" alt="edit icon"
            /></i>
            <i class="delete-icon"
              ><img src="/icons/delete.svg" alt="delete icon"
            /></i>
          </div>`;
  //delete function
  newTask.querySelector(".delete-icon").addEventListener("click", (e) => {
    e.target.closest(".tasks-div").remove();
  });
  //complete function
  newTask.querySelector(".circle-icon").addEventListener("click", (e) => {
    const taskDiv = e.target.closest(".tasks-div");
    taskDiv.querySelector(".edit-icon").remove();
    taskDiv.querySelector(".circle-icon").innerHTML = `<i class="circle-icon"
              ><img src="/icons/checkmark.svg" alt="checkmark icon"
            /></i>`;
    footerDiv.appendChild(taskDiv);
  });
  //edit function
  newTask.querySelector(".edit-icon").addEventListener("click", (e) => {
    const tempInnnerTextOfSpan = newTask.querySelector(".task-text").innerText;

    newTask.querySelector(
      ".task-text"
    ).innerHTML = `<input type="text" class="input-for-edit">`;

    newTask.querySelector(".input-for-edit").value = tempInnnerTextOfSpan;
    var keyCheck = event.getModifierState("Enter");
    newTask
      .querySelector(".input-for-edit")
      .addEventListener("onkeydown", (e) => {
        // newTask.querySelector(".task-text").innerText = newTask.querySelector(".input-for-edit").value;
      });
  });

  taskContainerEl.append(newTask);
  inputEl.value = "";
});

// Add task on Enter key
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTaskBtnEl.click();
  }
});

// Optional: Improve edit functionality to save on Enter and blur
function enableEditOnTask(taskDiv) {
  const span = taskDiv.querySelector(".task-text");
  const editIcon = taskDiv.querySelector(".edit-icon");
  editIcon.addEventListener("click", () => {
    const currentText = span.innerText;
    span.innerHTML = `<input type='text' class='input-for-edit' value='${currentText}'>`;
    const input = span.querySelector(".input-for-edit");
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        span.innerText = input.value;
      }
    });
    input.addEventListener("blur", () => {
      span.innerText = input.value;
    });
  });
}

// Enhance all new tasks with improved edit
const originalAddTaskBtnHandler = addTaskBtnEl.onclick;
addTaskBtnEl.addEventListener("click", () => {
  const newTask = taskContainerEl.lastElementChild;
  if (newTask && newTask.classList.contains("tasks-div")) {
    enableEditOnTask(newTask);
  }
});

// Demo tasks to show on first visit (one completed)
const DEMO_TASKS = [
  { text: "Welcome to your ToDo List!", completed: false },
  {
    text: "Click the plus icon or press Enter to add a new task.",
    completed: false,
  },
  { text: "This is a completed task example.", completed: true },
];

function createTaskElement(text, completed = false) {
  const newTask = document.createElement("div");
  newTask.classList.add("tasks-div");
  newTask.innerHTML = `<div class="left-section-of-task-div">
            <i class="circle-icon">$${
              completed
                ? `<img src='/icons/checkmark.svg' alt='checkmark icon'/>`
                : `<img src='/icons/circle.svg' alt='circle icon'/>`
            }</i>
            <span class="task-text${
              completed ? " after-complete-task-text" : ""
            }">${text}</span>
          </div>
          <div class="right-section-of-task-div">
            ${
              completed
                ? ""
                : `<i class='edit-icon'><img src='/icons/edit.svg' alt='edit icon'/></i>`
            }
            <i class="delete-icon"><img src="/icons/delete.svg" alt="delete icon"/></i>
          </div>`;
  //delete function
  newTask.querySelector(".delete-icon").addEventListener("click", (e) => {
    e.target.closest(".tasks-div").remove();
  });
  //complete function
  if (!completed) {
    newTask.querySelector(".circle-icon").addEventListener("click", (e) => {
      const taskDiv = e.target.closest(".tasks-div");
      taskDiv.querySelector(".edit-icon").remove();
      taskDiv.querySelector(
        ".circle-icon"
      ).innerHTML = `<img src='/icons/checkmark.svg' alt='checkmark icon'/>`;
      taskDiv
        .querySelector(".task-text")
        .classList.add("after-complete-task-text");
      footerDiv.appendChild(taskDiv);
    });
  }
  //edit function
  if (!completed) {
    newTask.querySelector(".edit-icon").addEventListener("click", (e) => {
      const tempInnnerTextOfSpan =
        newTask.querySelector(".task-text").innerText;
      newTask.querySelector(
        ".task-text"
      ).innerHTML = `<input type="text" class="input-for-edit">`;
      newTask.querySelector(".input-for-edit").value = tempInnnerTextOfSpan;
      newTask
        .querySelector(".input-for-edit")
        .addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            newTask.querySelector(".task-text").innerText =
              newTask.querySelector(".input-for-edit").value;
          }
        });
      newTask.querySelector(".input-for-edit").addEventListener("blur", (e) => {
        newTask.querySelector(".task-text").innerText =
          newTask.querySelector(".input-for-edit").value;
      });
    });
  }
  return newTask;
}

// Show demo tasks only on first visit
if (!localStorage.getItem("todo_demo_shown")) {
  DEMO_TASKS.forEach((task) => {
    const el = createTaskElement(task.text, task.completed);
    if (task.completed) {
      footerDiv.appendChild(el);
    } else {
      taskContainerEl.appendChild(el);
    }
  });
  localStorage.setItem("todo_demo_shown", "1");
}
