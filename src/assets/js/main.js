"use strict"

let $taskValue = document.querySelectorAll('[data-input]')[0];
let $taskBtn = document.querySelectorAll('[data-btn]')[0];
let $taskList = document.querySelectorAll('[data-list]')[0];

$taskBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  let task = $taskValue.value;

  let _html = `
  <div class="p-todo__main-list-item">
    ${task}
  </div>`;

  $taskList.insertAdjacentHTML('afterbegin',_html);

  $taskValue.value = '';
})