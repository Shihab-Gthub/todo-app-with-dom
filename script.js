/*
 * Title: To Do Application using vanilla JS DOM
 * Description: This JS file has all the JS functions necessary to control the to do application
 * Author: Sumit Saha ( Learn with Sumit )
 * Date: 12/17/2020
 *
 */

 // select elements & assign them to variables
 let newTask = document.querySelector('#new-task');
 let form = document.querySelector('form');
 let todoUl = document.querySelector('#items');
 let completeUl = document.querySelector('.complete-list ul');


// functions
let createTask = function(task) {
    let listItem = document.createElement('li');
    let checkBox = document.createElement('input');
    let label = document.createElement('label');

    label.innerText = task;
    checkBox.type = 'checkbox';

    listItem.appendChild(checkBox);
    listItem.appendChild(label);

    return listItem;
}

let addTask = function(event) {
    event.preventDefault();
    let listItem = createTask(newTask.value);
    todoUl.appendChild(listItem);
    newTask.value = "";
    // bind the new list item to the incomplete list
    bindInCompleteItems(listItem, completeTask);
}

let completeTask = function() {
    let listItem = this.parentNode;
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.className = 'delete';
    listItem.appendChild(deleteBtn);

    let checkBox = listItem.querySelector('input[type="checkbox"]');
    checkBox.remove();
    completeUl.appendChild(listItem);
    bindCompleteItems(listItem, deleteTask);
}

let deleteTask = function() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}

let bindInCompleteItems = function(taskItem, checkboxClick) {
    let checkBox = taskItem.querySelector('input[type="checkbox"]');
    checkBox.onchange = checkboxClick;
}

let bindCompleteItems = function(taskItem, deleteButtonClick) {
    let deleteButton = taskItem.querySelector('.delete');
    deleteButton.onclick = deleteButtonClick;
}

for(let i=0; i< todoUl.children.length; i++ ) {
    bindInCompleteItems(todoUl.children[i], completeTask);
}

for(let i=0; i< completeUl.children.length; i++ ) {
    bindCompleteItems(completeUl.children[i], deleteTask);
}

form.addEventListener('submit', addTask);

//alternative way to do that

//it is done in july 7,2022

const form = document.querySelector('.new-task-container')
const newTaskInput = document.querySelector('#new-task')
const incompleteUl = document.querySelector('#items')
const completedTasks = document.querySelector('.complete-list')
const completedListUl = completedTasks.lastElementChild

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (newTaskInput.value == '') {
        alert('new task cannot be empty')
    } else {
        const li = document.createElement('li')
        li.setAttribute('class', 'item')
        const checks = document.createElement('input')
        checks.type = "checkbox"
        const label = document.createElement('label')
        label.innerText = newTaskInput.value
        li.append(checks, label)
        incompleteUl.append(li)
        newTaskInput.value = ""
    }

})


incompleteUl.addEventListener("click", (e) => {
    const deletingEl = e.target
    const element = deletingEl.type
    if (element == 'checkbox') {
        const value = deletingEl.nextSibling.innerText
        const parent = deletingEl.parentNode
        incompleteUl.removeChild(parent)
        const completeinsert = completedTasks.lastElementChild
        const completeLi = document.createElement('li')
        completeLi.classList.add('item')
     
        const completeBtn = document.createElement('button')
        completeBtn.classList.add('delete')
        completeBtn.innerText = "Delete"
     
        completeLi.append(value, completeBtn)
        completedListUl.appendChild(completeLi)

    }
})
completedTasks.addEventListener('click', (e) => {
    const fullDlt = e.target
    if (fullDlt.className == "delete") {
        const fullDltParent = fullDlt.parentElement
        completedListUl.removeChild(fullDltParent)
    }
})


