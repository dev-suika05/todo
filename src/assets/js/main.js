"use strict"
const $body = document.querySelector('body');

let $taskValue = document.querySelectorAll('[data-input]')[0];
let $taskBtn = document.querySelectorAll('[data-btn]')[0];
let $taskList = document.querySelectorAll('[data-list]')[0];
let $taskComplete = document.querySelectorAll('[data-complete]')[0];
let taskNum = 0;

let $completeCheckbox;

let taskItem = [];

function addTask(){
  $taskBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    
    let taskLength = document.querySelectorAll('[data-task]').length;
    
    if(!($taskValue.value.length === 0)) {
      taskNum = document.querySelectorAll('.p-todo__main-list-item').length + 1;
      let taskTemp = {};
      taskTemp.id = taskNum;
      taskTemp.value = $taskValue.value;
      taskTemp.complete = false;
      taskItem.push(taskTemp);

      console.log(taskItem);
  
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
    
      $taskList.insertAdjacentHTML('afterbegin',_html);
      $taskValue.value = '';
      $completeCheckbox = document.querySelectorAll('.js-complete-check');
    }
  });
};

function completeTask() {
  document.addEventListener('click',function(evt){
    if (evt.target.className === 'js-complete-check') {
      let $targetParent = evt.target.closest('[data-task]');
      let index = $targetParent.dataset.task - 1;
      if(evt.target.checked) {
        $taskComplete.appendChild($targetParent);
        taskItem[index].complete = true;
      } else {
        $taskList.appendChild($targetParent);
        taskItem[index].complete = false;
      }
    } 
  });
};

function removeTask() {
  document.addEventListener('click',function(evt){
    if (evt.target.className === 'js-remove-btn') {
      let $targetParent = evt.target.closest('[data-task]');
      let index = $targetParent.dataset.task - 1;

      taskItem.splice(index,1)
      $targetParent.remove();
    } 
  });
};

window.addEventListener('load',function(){
  addTask();
  completeTask();
  removeTask();
});