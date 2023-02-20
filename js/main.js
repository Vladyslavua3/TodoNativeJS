//find element on page

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput')
const taskList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')

let tasks = [];


if(localStorage.getItem('tasks')){
   tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => renderTask(task.status,task.id,task.text))
}


function renderTask(status,id,text) {
    const cssClass = status ? "task-title task-title--done" : "task-title";


    const taskHtml =
        `<li id="${id}" class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClass}">${text}</span>
        <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
        <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
        <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
        </div>
        </li>`


    /// Add in Task list our new task
    taskList.insertAdjacentHTML('beforeend',taskHtml)
}




checkEmptyList();

// Add Tasks
form.addEventListener('submit',addTask)

// Delete task

taskList.addEventListener('click',deleteTask)

//Done task

taskList.addEventListener('click',doneTask)

/// Functions
function addTask(e){
    // cancel send form
    e.preventDefault();

    // Grab text from input

    const taskText = taskInput.value

   // Object of task
    const newTask = {
        id: Date.now(),
        text:taskText,
        status: false
    }

    //Add object into tasks array
    tasks.push(newTask)

    saveToLocalStorage()

    // create new markup for new task

    renderTask(newTask.status,newTask.id,newTask.text)

    // Clear our input and return on it focus
    taskInput.value = '';
    taskInput.focus();
    checkEmptyList();


}

function deleteTask(e) {

    if (e.target.dataset.action !== 'delete') return


    const parenNode = e.target.closest('.list-group-item');

    //Find id task
    const id = +parenNode.id

    // Find by index

   // const index = tasks.findIndex((task) => task.id === id)

    //tasks.splice(index,1)

    // Delete with filter
    tasks = tasks.filter(task => task.id !== id)

    saveToLocalStorage()


    parenNode.remove();
    checkEmptyList();

}

function doneTask(e) {

    if (e.target.dataset.action !== 'done') return


    const parenNode = e.target.closest('.list-group-item')


    const id = +parenNode.id


    const task = tasks.find((task) => task.id === id)

    task.status = !task.status

    saveToLocalStorage()

    const taskTitle = parenNode.querySelector('.task-title')
    taskTitle.classList.toggle('task-title--done')

}

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListElement = `<li id="emptyList" class="list-group-item empty-list">
<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
<div class="empty-list__title">List of tasks are empty</div></li>`
        taskList.insertAdjacentHTML('afterbegin',emptyListElement)
    }
    if(tasks.length > 0){
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage(){
    localStorage.setItem('tasks',JSON.stringify(tasks))
}