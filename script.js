const taskForm  = document.getElementById('task-form')
const taskInput = document.getElementById('task-input')
const taskList  = document.getElementById('task-list')
const clearTasks = document.getElementById('clear-tasks')
const filterInput = document.getElementById('filter-tasks')

function displayTasks() {
    const tasksFromStorage = getTasksFromStorage()
    tasksFromStorage.forEach(task => addTaskToDOM(task))
    checkUI()
}

function onAddTaskSubmit(e) {
    e.preventDefault()
    
    newTask = taskInput.value
    
    if (newTask === '') {
        alert('Add a task')
        return
    }

    //create dom element
    addTaskToDOM(newTask)

    //add tasks to storage
    addTaskToStorage(newTask)

    checkUI()

    taskInput.value = ''
}

function addTaskToDOM(task) {
    //create list item
    const li = document.createElement('li')
    li.className ='d-flex border-bottom justify-content-between align-items-center task-item mb-3'
    li.appendChild(document.createTextNode(task))
    const button = createButton('btn btn-danger btn-sm remove-task')
    li.appendChild(button)
    
    taskList.appendChild(li)
}

function addTaskToStorage(task) {
    const tasksFromStorage = getTasksFromStorage()
    
    tasksFromStorage.push(task)

    //convert to json string
    localStorage.setItem('tasks', JSON.stringify(tasksFromStorage))
}

function getTasksFromStorage() {
    let tasksFromStorage
    
    if (localStorage.getItem('tasks') === null) {
        tasksFromStorage = []
    } else {
        tasksFromStorage = JSON.parse(localStorage.getItem('tasks'))
    }

    return tasksFromStorage
}

function createButton(classes) {
    const button = document.createElement('button')
    button.className = classes
    button.textContent = 'Delete'
    return button
}

function onClickTask(e) {
    if (e.target.classList.contains('remove-task')) {
        removeTask(e.target.parentElement)
    }
}

function removeTask(task) {
    if (confirm('Are you sure?')) {
        //remove item from DOM
        task.remove()

        console.log(task.firstChild.textContent)

        //remove from storage
        removeTaskFromStorage(task.firstChild.textContent)

        checkUI()
    }
}

function removeTaskFromStorage(task) {
    let tasksFromStorage = getTasksFromStorage()

    //filter out item to be removed
    tasksFromStorage = tasksFromStorage.filter((t) => t !== task)

    localStorage.setItem('tasks', JSON.stringify(tasksFromStorage))
}

function clearAllTasks(e) {
    while (taskList.firstChild) { //while the task list still has a child element
        taskList.removeChild(taskList.firstChild) // keep removing the 1st child element
    }

    //clear from local storage
    localStorage.removeItem('tasks')
    checkUI()
}

function filterTasks(e) {
    const tasks = document.querySelectorAll('.task-item')
    const text = e.target.value.toLowerCase()

    tasks.forEach((task) => {
        const taskName = task.firstChild.textContent.toLowerCase()

        if (taskName.indexOf(text) != -1) {
            task.style.display = 'flex'
        } else {
            task.classList.remove('d-flex')
            task.style.display = 'none'
        }
    })

}

function checkUI() {
    const tasks = document.querySelectorAll('.task-item')
    if (tasks.length === 0) {
        clearTasks.style.display = 'none'
        filterInput.style.display = 'none'
    } else {
        clearTasks.style.display = 'block'
        filterInput.style.display = 'block'
    }
}

function init() {
    // event listeners
    taskForm.addEventListener('submit', onAddTaskSubmit)
    taskList.addEventListener('click', onClickTask)
    clearTasks.addEventListener('click', clearAllTasks)
    filterInput.addEventListener('input', filterTasks)
    document.addEventListener('DOMContentLoaded', displayTasks)
    checkUI()
}

init()
