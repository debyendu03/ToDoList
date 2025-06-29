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
            <i class="checkmark-icon"><img src="/icons/checkmark.svg" alt="checkmark icon"
            /></i>
            <span class="task-text">${inputValue}</span>
          </div>
          <div class="right-section-of-task-div">
            <i class="edit-icon"><img src="/icons/edit.svg" alt="edit icon"
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
    footerDiv.appendChild(taskDiv);
  });
  //undo complete
  newTask.querySelector(".checkmark-icon").addEventListener("click", (e) => {
    const undoCompleteTask = e.target.closest(".tasks-div");
    taskContainerEl.appendChild(undoCompleteTask);
  });
  //edit function
  newTask.querySelector(".edit-icon").addEventListener("click", (e) => {
    const tempInnnerTextOfSpan = newTask.querySelector(".task-text").innerText;
    newTask.querySelector(
      ".task-text"
    ).innerHTML = `<input type="text" class="edited-task-text" value="${tempInnnerTextOfSpan}">`;

    const editedTaskText = newTask.querySelector(".edited-task-text");
    editedTaskText.focus();
    editedTaskText.setSelectionRange(
      editedTaskText.value.length,
      editedTaskText.value.length
    );

    editedTaskText.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        newTask.querySelector(".task-text").innerText = editedTaskText.value;
      }
    });
    editedTaskText.addEventListener("blur", () => {
      newTask.querySelector(".task-text").innerText = editedTaskText.value;
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
