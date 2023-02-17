//find element on page

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput')
const taskList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')

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


    // create new markup for new task

    const taskHtml =
        `<li class="list-group-item d-flex justify-content-between task-item">
        <span class="task-title">${taskText}</span>
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

    // Clear our input and return on it focus
    taskInput.value = '';
    taskInput.focus();


    // Check if length array more than 1 than hide block Empty
    if(taskList.children.length > 1){
        emptyList.classList.add('none')
    }
}

function deleteTask(e){
    if(e.target.dataset.action === 'delete'){
       const parenNode = e.target.closest('.list-group-item');
       parenNode.remove()
    }

    if(taskList.children.length === 1){
        emptyList.classList.remove('none')
    }
}

function doneTask(e) {
    if (e.target.dataset.action === 'done') {
        const parenNode = e.target.closest('.list-group-item')
        const taskTitle = parenNode.querySelector('.task-title')
        taskTitle.classList.toggle('task-title--done')
    }
}