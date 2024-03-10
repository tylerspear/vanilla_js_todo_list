const taskForm  = document.getElementById('task-form')
const taskInput = document.getElementById('task-input')
const taskList  = document.getElementById('task-list')
const clearTasks = document.getElementById('clear-tasks')
const filterInput = document.getElementById('filter-tasks')

function addTask(e) {
    e.preventDefault()
    
    newTask = taskInput.value
    
    if (newTask === '') {
        alert('Add a task')
        return
    }

    //create list item
    const li = document.createElement('li')
    li.className ='d-flex border-bottom justify-content-between align-items-center task-item mb-3'
    li.appendChild(document.createTextNode(newTask))
    const button = createButton('btn btn-danger btn-sm remove-task')
    li.appendChild(button)
    
    taskList.appendChild(li)
    checkUI()
    taskInput.value = ''
}

function createButton(classes) {
    const button = document.createElement('button')
    button.className = classes
    button.textContent = 'Delete'
    return button
}

function removeTask(e) {
    if (e.target.classList.contains('remove-task')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.remove()
        }
    }
    checkUI()
}

function clearAllTasks(e) {
    while (taskList.firstChild) { //while the task list still has a child element
        taskList.removeChild(taskList.firstChild) // keep removing the 1st child element
    }
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

// event listeners
taskForm.addEventListener('submit', addTask)
taskList.addEventListener('click', removeTask)
clearTasks.addEventListener('click', clearAllTasks)
filterInput.addEventListener('input', filterTasks)
checkUI()