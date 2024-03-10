const taskForm  = document.getElementById('task-form')
const taskInput = document.getElementById('task-input')
const taskList  = document.getElementById('task-list')

function addTask(e) {
    e.preventDefault()
    
    newTask = taskInput.value
    
    if (newTask === '') {
        alert('Add a task')
        return
    }

    //create list item
    const li = document.createElement('li')
    li.className ='list-group-item d-flex justify-content-between align-items-center'
    li.appendChild(document.createTextNode(newTask))
    const button = createButton('btn btn-danger btn-sm remove-task-btn')
    li.appendChild(button)
    
    taskList.appendChild(li)
    taskInput.value = ''
}

function createButton(classes) {
    const button = document.createElement('button')
    button.className = classes
    button.textContent = 'Delete'
    return button
}



// event listeners
taskForm.addEventListener('submit', addTask)
