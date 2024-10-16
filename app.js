let GeneralAddBtn = document.querySelector('.add-button')
let openTaskBox = document.querySelector('.openBox')
let CategoryName = document.querySelectorAll('.item')
let taskContainer = document.querySelectorAll('.task-container')
let taskInput = document.querySelector('.add-input')
let addTaskButton = document.querySelector('.addTask-btn')

//******** all task containers ********

let AllContainer = document.querySelector('.tasks-container')
let todayContainer = document.querySelector('.today-container')

//********** task box button *********

GeneralAddBtn.addEventListener('click' , () => {
    if (openTaskBox.className.includes('fa fa-plus')) {
        document.querySelector('.add-input-box').style.display = 'flex'
        openTaskBox.className = 'fa fa-xmark'
        GeneralAddBtn.style.backgroundColor = 'var(--red-color)'
    }
    else{
        document.querySelector('.add-input-box').style.display = 'none'
        openTaskBox.className = 'fa fa-plus'
        GeneralAddBtn.style.backgroundColor = 'var(--dark-blue)'
    }
})

//********* task container and category item *********

CategoryName.forEach((item1) => {
    item1.addEventListener('click' , (event) => {
        let DataSetName = event.target.dataset.name
        taskContainer.forEach((item2) => {
            if (item2.dataset.name === DataSetName) {
                item2.style.display = 'flex'
                CategoryName.forEach((item3) => {
                    if (item3.dataset.name === item2.dataset.name) {
                        item3.classList.add('clickedCaregory')
                    }
                    else{
                        item3.classList.remove('clickedCaregory')
                    }
                })
            }
            else{
                item2.style.display = 'none'
            }
        })
    })
})

window.addEventListener('load' , () => {
    todayContainer.style.display = 'flex'
    document.querySelector('.todayBTN').classList.add('clickedCaregory')
})

// create the task array

let TaskArray = [];

function addtask () {
    let InputValue = taskInput.value
    if (InputValue) {
        let TaskObject = {
            Task : InputValue,
            case : false
        }
        TaskArray.push(TaskObject)
        TaskOperation(TaskArray)
        setLocalStorage (TaskArray)
        AllContainer.classList.add('task-contain-style')
    }
    else{
        alert('please Fill Input');
    }
    ClearInput()
}

taskInput.addEventListener('keydown' , (event)=> {
    let InputValue = taskInput.value
    if (event.keyCode == 13) {
        if (InputValue) {
            addtask()
        }
        else{
            alert('please Fill INPUT')
        }
    }
})

function ClearInput() {
    taskInput.value = ''
}

// operation on task array

function TaskOperation (tasks) {
    todayContainer.innerHTML = ''
    tasks.forEach((item , index) => {

        let taskItem = document.createElement('div')
        taskItem.className = 'task-item'

        let mainTaskBox = document.createElement('div')
        mainTaskBox.className = 'main-task'

        let checkedBox = document.createElement('div')
        checkedBox.className = 'check-box'
        checkedBox.setAttribute('onclick' , `checkedTask(${index})`)

        let tickBox = document.createElement('span')
        tickBox.className = 'checkedSymbol'

        let mainTask = document.createElement('span')
        mainTask.className = 'task'
        mainTask.innerHTML = item.Task

        if (item.case) {
            tickBox.style.display = 'block'
            mainTask.classList.add('checkedTask')
            // taskItem.classList.add('changeOpacity')
        }
        
        checkedBox.append(tickBox)
        mainTaskBox.append(checkedBox , mainTask)

        let taskControler = document.createElement('div')
        taskControler.className = 'task-controler-box'

        let ellipsIcon = document.createElement('i')
        ellipsIcon.className = 'fa-solid fa-pen'

        let DeleteIcon = document.createElement('i')
        DeleteIcon.className = 'fa fa-trash'
        DeleteIcon.setAttribute('onclick' , `deletTask(${index})`)

        taskControler.append(ellipsIcon , DeleteIcon)
        taskItem.append(mainTaskBox , taskControler)
        todayContainer.append(taskItem)

    })

    if (!TaskArray.length) {
        AllContainer.classList.remove('task-contain-style')
    }
}

// delete task

function deletTask(taskindex){
    console.log(taskindex)
    let localvalue = JSON.parse(localStorage.getItem('Tods'))
    TaskArray = localvalue
    TaskArray.splice(taskindex , 1)
    setLocalStorage(TaskArray)
    TaskOperation(TaskArray)
}

// complete task 

function checkedTask(taskindex){
    let localvalue = JSON.parse(localStorage.getItem('Tods'))
    TaskArray = localvalue
    TaskArray.forEach((item , index) => {
        if (index == taskindex) {
            item.case = !item.case
        }
    })
    setLocalStorage(TaskArray)
    TaskOperation(TaskArray)
}

function openMenuBox(taskId){

}

// local storage operation

function setLocalStorage (taskarray) {
    localStorage.setItem('Tods' , JSON.stringify(taskarray))
}

function getLocalStorage () {
    let localValue = JSON.parse(localStorage.getItem('Tods'))
    if (localValue) {
        TaskArray = localValue
        AllContainer.classList.add('task-contain-style')
    }
    else{
        TaskArray = [ ]
        AllContainer.classList.remove('task-contain-style')
    }
    TaskOperation (TaskArray)
}

// Events in DOM

window.addEventListener('load' , getLocalStorage)
addTaskButton.addEventListener('click' , addtask)



