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
