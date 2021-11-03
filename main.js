let taskarea = document.querySelector('.taskarea')
let add_task_btn = document.getElementById('add_task_btn')
let delete_all_btn = document.getElementById('delete_all_btn')
let filter_menu = document.getElementById('filter_menu')
let filter = document.getElementById('filter')
let input_crossbtn = document.getElementById('input_crossbtn')
let input_box = document.getElementById('input_box')

// Filter menu Elements Starts
let filter_all_tasks = document.getElementById('all')
let filter_completed_tasks = document.getElementById('completed')
let filter_incompleted_tasks = document.getElementById('incompleted')
// Filter menu Elements Ends


input_crossbtn.addEventListener('click', () => {
  input_box.value = ''
})


let list = []

add_task_btn.addEventListener('click', function(e) {
  e.preventDefault()
  addTodoObj(input_box.value)
})

function addTodoObj(item) {
  if (!(item == '')) {
    const todoObj = {
      id: Date.now(),
      name: item,
      completed: false
    }
    list.push(todoObj)

    addToLocalStorage(list)
    input_box.value = ''
    // console.log(item);
  }
}


function renderList(list) {
  taskarea.innerHTML = ''
  list.forEach(function(item) {

    var checked = item.completed ? 'checked' : null

    const div = document.createElement('div')
    div.setAttribute('class', 'taskbox')
    div.setAttribute('data-key', item.id)

    //console.log(item.id);

    // adding class to list items

    // if (item.completed === true) {
    //   div.classList.add('checked')
    // }


    div.innerHTML = ` 
    <div class="textbox">${item.name}</div>
    <div class="checkbox_area">
      <input type="checkbox" class="checkbox" ${checked}/>
      <div class="deleteTask">
        <i class="fi-rr-trash removeTask"></i>
            </div>
          </div>
      `
    taskarea.append(div)
  })
}

function addToLocalStorage(list) {
  localStorage.setItem('list', JSON.stringify(list))

  renderList(list)
}

function getFromLocalStorage() {
  const referance = localStorage.getItem('list')

  if (referance) {
    list = JSON.parse(referance)
    renderList(list)
  }
}

getFromLocalStorage()


//Making toggle checkbox and delete button

taskarea.addEventListener('click', function(e) {
  // console.log(e.target.type);

  if (e.target.type === "checkbox") {
    toggleCheckbox(event.target.parentElement.parentElement.getAttribute('data-key'))
    //   console.log(event.target.parentElement.parentElement.getAttribute('data-key'));
  }

  if (e.target.classList.contains('removeTask')) {
    //  console.log(e.target.classList);
    deleteItem(event.target.parentElement.parentElement.parentElement.getAttribute('data-key'))
    //  console.log(event.target.parentElement.parentElement.parentElement.getAttribute('data-key'))
  }
})





function toggleCheckbox(id) {
  list.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed
      // console.log(item.completed = item.completed);
    }
  })
  addToLocalStorage(list)
}

function deleteItem(id) {
  list = list.filter(function(item) {
    return item.id != id
  })

  addToLocalStorage(list)
}

filter.addEventListener('click', (e) => {
  filter_menu.classList.toggle('active')

  document.addEventListener('click', (event) => {

    if (event.target.tagName === "A") {
      filter_menu.classList.remove('active')
    }
  })
})

let taskbox = document.querySelectorAll('.taskbox')
filter_completed_tasks.addEventListener('click', () => {
  taskbox.forEach((taskbox) => {
    if (taskbox.lastElementChild.firstElementChild.checked == true) {
      taskbox.classList.remove('hide_tasks')
    } else {
      taskbox.classList.add('hide_tasks')
    }
  })

})

filter_incompleted_tasks.addEventListener('click', () => {
  taskbox.forEach((taskbox) => {
    if (taskbox.lastElementChild.firstElementChild.checked == false) {
      taskbox.classList.remove('hide_tasks')
    } else {
      taskbox.classList.add('hide_tasks')
    }
  })

})

filter_all_tasks.addEventListener('click', () => {
  taskbox.forEach((taskbox) => {
    taskbox.classList.remove('hide_tasks')
  })

})

delete_all_btn.addEventListener('click', () => {
  list = list.filter((item)=>{
    return !list
  })
 // console.log(list);
  addToLocalStorage(list)

})
