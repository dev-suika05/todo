"use strict"
const $body = document.querySelector('body');

let $taskValue = document.querySelectorAll('[data-input]')[0];
let $taskBtn = document.querySelectorAll('[data-btn]')[0];
let $taskList = document.querySelectorAll('[data-list]')[0];
let $taskComplete = document.querySelectorAll('[data-complete]')[0];
let taskNum = 0;

let $completeCheckbox;

function addTask(){
  $taskBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    let task = $taskValue.value;
  
    let taskLength = document.querySelectorAll('[data-task]').length;
  
    if(!(task.length === 0)) {
      taskNum = document.querySelectorAll('.p-todo__main-list-item').length + 1;
  
      let _html = `
      <div class="p-todo__main-list-item" data-task>
        ${task}
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
      let length = $completeCheckbox.length;
  
      let $targetParent = evt.target.closest('[data-task]');
      if(evt.target.checked) {
        $taskComplete.appendChild($targetParent);
      } else {
        $taskList.appendChild($targetParent);
      }
    } 
  });
};

function removeTask() {
  document.addEventListener('click',function(evt){
    if (evt.target.className === 'js-remove-btn') {
      let $targetParent = evt.target.closest('[data-task]');

      $targetParent.remove();
    } 
  });
};

window.addEventListener('load',function(){
  addTask();
  completeTask();
  removeTask();
});