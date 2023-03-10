"use strict"
const $body = document.querySelector('body');

let $taskValue = document.querySelectorAll('[data-input]')[0];
let $taskBtn = document.querySelectorAll('[data-btn]')[0];
let $taskList = document.querySelectorAll('[data-list]')[0];
let $taskComplete = document.querySelectorAll('[data-complete]')[0];
let taskNum = 0;

let $completeCheckbox;

let taskItem = [];

function addTask() {
  $taskBtn.addEventListener('click', function (evt) {
    evt.preventDefault();

    let taskLength = document.querySelectorAll('[data-task]').length;

    if (!($taskValue.value.length === 0)) {
      taskNum = document.querySelectorAll('.p-todo__main-list-item').length + 1;
      let taskTemp = {};
      taskTemp.id = taskNum;
      taskTemp.value = $taskValue.value;
      taskTemp.complete = false;
      taskItem.push(taskTemp);
      localStorage.todoList = JSON.stringify(taskItem);

      let _html = `
      <div class="p-todo__main-list-item" data-task="${taskNum}">
        ${taskTemp.value}
        <label for="complete_checked-${taskNum}">
        <input type="checkbox" class="js-complete-check" id="complete_checked-${taskNum}" name="complete">
          完了
        </label>
        <button class="js-remove-btn" id="remove_btn-${taskNum}" type="button">
          削除
        </button>
      </div>`;

      $taskList.insertAdjacentHTML('afterbegin', _html);
      $taskValue.value = '';
      $completeCheckbox = document.querySelectorAll('.js-complete-check');
    }
  });
};

function completeTask() {
  document.addEventListener('click', function (evt) {
    if (evt.target.className === 'js-complete-check') {
      let $targetParent = evt.target.closest('[data-task]');
      let index = $targetParent.dataset.task - 1;
      if (evt.target.checked) {
        $taskComplete.appendChild($targetParent);
        taskItem[index].complete = true;
        localStorage.todoList = JSON.stringify(taskItem);
      } else {
        $taskList.appendChild($targetParent);
        taskItem[index].complete = false;
        localStorage.todoList = JSON.stringify(taskItem);
      }
    }
  });
};

function removeTask() {
  document.addEventListener('click', function (evt) {
    if (evt.target.className === 'js-remove-btn') {
      let $targetParent = evt.target.closest('[data-task]');
      let index = $targetParent.dataset.task - 1;

      taskItem.splice(index, 1)
      localStorage.todoList = JSON.stringify(taskItem);
      $targetParent.remove();
    }
  });
};

window.addEventListener('load', function () {
  addTask();
  completeTask();
  removeTask();
});

// ローカルサーバーにタスクがあるとき
let localtask = localStorage.todoList

if (localtask) {
  console.log('task')
  taskItem = JSON.parse(localtask);
  let length = Object.keys(taskItem).length;

  for (let i = 0; i < length; i++) {
    let complete = taskItem[i].complete ? 'checked' : '';

    console.log(complete)
    let _html = `
      <div class="p-todo__main-list-item" data-task="${taskItem[i].id}">
        ${taskItem[i].value}
        <label for="complete_checked-${taskItem[i].id}">
        <input type="checkbox" class="js-complete-check" id="complete_checked-${taskItem[i].id}" ${complete} name="complete">
          完了
        </label>
        <button class="js-remove-btn" id="remove_btn-${taskItem[i].id}" type="button">
          削除
        </button>
      </div>`;

    if (taskItem[i].complete) {
      $taskComplete.insertAdjacentHTML('afterbegin', _html);
    } else {
      $taskList.insertAdjacentHTML('afterbegin', _html);
    }
  }
}