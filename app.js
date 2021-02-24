// UI vars
const form = document.querySelector('#task-form') // form itself and submit
const taskList = document.querySelector('.collection') // uls
const clearBtn = document.querySelector('.clear-tasks') // clear all btn
// const filter = document.querySelector('#filter') // filter
const taskInput = document.querySelector('#task') // form inout




loadEventListerners()
//Loading all listerners
function loadEventListerners() {
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks)
    // TASK FORM
    form.addEventListener('submit', addTask);
    //Delete Li by using Event Delgation 
    taskList.addEventListener('click', removeTask)
    //Clear all Tasks
    clearBtn.addEventListener('click', clearTasks)
    //filter tasks
    // filter.addEventListener('keyup', filterTasks)

}

//Get tasks from LS 
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    // Looping throught the LS and outputing in LI
    tasks.forEach(function(task){
        //creating li dynamically
        const li = document.createElement('li')
        li.className = 'collection-item'
        li.appendChild(document.createTextNode(task))
        const link = document.createElement('a')
        link.className = 'delete-item secondary-content'
        link.innerHTML = '<i class="fa fa-remove"></i>'
        //Append li and link
        li.appendChild(link)
        //append li to ul 
        taskList.appendChild(li)
    })
}

//ADD Tasks
function addTask(e) {
    if (taskInput.value === '') {
        alert('add something');
    } 
    //creating li dynamically
    const li = document.createElement('li')
    li.className = 'collection-item'
    li.appendChild(document.createTextNode(taskInput.value))
    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //Append li and link
    li.appendChild(link)
    //append li to ul 
    taskList.appendChild(li)

    //store in Local Storage
    storeTaskInLocalStorage(taskInput.value)

    //clear input
    taskInput.value = ''

    e.preventDefault()
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    //adding new task to tasks array in LS
    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//REMOVING Tasks
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item') ) {
        //cofirmation to delete
        if (confirm('Confirm and delete ?')){
        e.target.parentElement.parentElement.remove()

        //Removing from LS
        removeTasksFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
    console.log(e.target)
}

function removeTasksFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


//CLEAR Tasks
function clearTasks() {
    taskList.innerHTML = ''
    //you can also do while loop which is faster way

    clearTasksFromLocalStorage()
}

//cleaing from LS 
function clearTasksFromLocalStorage() {
    localStorage.clear()
}


// function filterTasks(e) {
//     const text = e.target.value.toLowerCase()

// }

//An aplication were we can create tasks which is persisted to local S .. if we come back it will still be tere


