import { v4 as uuidV4 } from 'uuid'
type Task = { id: string, title: string, completed: boolean, createdAt: Date }

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector("#new-task-form") as HTMLFormElement
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const clearAllBtn = document.querySelector<HTMLBodyElement>('#clearAll')
let tasks: Task[] = loadTasks()
tasks.forEach(addListItem)


form.addEventListener('submit', e => {
  e.preventDefault()
  if (input?.value.trim() == "" || input?.value == null) return
  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  tasks.push(newTask)
  addListItem(newTask)
  input.value = ''
})
function addListItem(task: Task) {
  const item = document.createElement('li')
  const label = document.createElement('label')
  const checkbox = document.createElement('input')
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked
    item.classList.toggle('completed')
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
  saveTasks()
}
clearAllBtn?.addEventListener('click', () => {
  let items = document.querySelectorAll<HTMLLIElement>('li')
  items.forEach((item) => {
    item.remove()
  })
  tasks = []
  saveTasks()
})


function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}
function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}