(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))n(l);new MutationObserver(l=>{for(const a of l)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function c(l){const a={};return l.integrity&&(a.integrity=l.integrity),l.referrerPolicy&&(a.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?a.credentials="include":l.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(l){if(l.ep)return;l.ep=!0;const a=c(l);fetch(l.href,a)}})();document.querySelector("body");let i=document.querySelectorAll("[data-input]")[0],p=document.querySelectorAll("[data-btn]")[0],d=document.querySelectorAll("[data-list]")[0],m=document.querySelectorAll("[data-complete]")[0],s=0,t=[];function f(){p.addEventListener("click",function(o){if(o.preventDefault(),document.querySelectorAll("[data-task]").length,i.value.length!==0){s=document.querySelectorAll(".p-todo__main-list-item").length+1;let e={};e.id=s,e.value=i.value,e.complete=!1,t.push(e),localStorage.todoList=JSON.stringify(t);let c=`
      <div class="p-todo__main-list-item" data-task="${s}">
        ${e.value}
        <label for="complete_checked-${s}">
        <input type="checkbox" class="js-complete-check" id="complete_checked-${s}" name="complete">
          完了
        </label>
        <button class="js-remove-btn" id="remove_btn-${s}" type="button">
          削除
        </button>
      </div>`;d.insertAdjacentHTML("afterbegin",c),i.value="",document.querySelectorAll(".js-complete-check")}})}function g(){document.addEventListener("click",function(o){if(o.target.className==="js-complete-check"){let e=o.target.closest("[data-task]"),c=e.dataset.task-1;o.target.checked?(m.appendChild(e),t[c].complete=!0,localStorage.todoList=JSON.stringify(t)):(d.appendChild(e),t[c].complete=!1,localStorage.todoList=JSON.stringify(t))}})}function k(){document.addEventListener("click",function(o){if(o.target.className==="js-remove-btn"){let e=o.target.closest("[data-task]"),c=e.dataset.task-1;t.splice(c,1),localStorage.todoList=JSON.stringify(t),e.remove()}})}window.addEventListener("load",function(){f(),g(),k()});let u=localStorage.todoList;if(u){console.log("task"),t=JSON.parse(u);let o=Object.keys(t).length;for(let e=0;e<o;e++){let c=t[e].complete?"checked":"";console.log(c);let n=`
      <div class="p-todo__main-list-item" data-task="${t[e].id}">
        ${t[e].value}
        <label for="complete_checked-${t[e].id}">
        <input type="checkbox" class="js-complete-check" id="complete_checked-${t[e].id}" ${c} name="complete">
          完了
        </label>
        <button class="js-remove-btn" id="remove_btn-${t[e].id}" type="button">
          削除
        </button>
      </div>`;t[e].complete?m.insertAdjacentHTML("afterbegin",n):d.insertAdjacentHTML("afterbegin",n)}}
