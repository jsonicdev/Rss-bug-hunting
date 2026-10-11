const input = document.getElementById('task-input')
const addBtn = document.getElementById('add-btn')
const list = document.getElementById('task-list')
const counter = document.getElementById('counter')
const errorEl = document.getElementById('error')
const clearBtn = document.getElementById('clear-completed')
const filterButtons = document.querySelectorAll('.filter')

let tasks = []
let currentFilter = 'all'
let nextId = 1

function addTask() {
	const text = input.value
	console.log('text:', text)
	console.log('start')
	if (text === undefined || text.length === 0) {
		alert('Введите текст задачи')
		console.log('closed')
		return
	}
	console.log('passed')
	errorEl.hidden = true
	tasks.push({ id: nextId++, text: text, done: false })
	input.value = ''
	render()
}

function toggleTask(id) {
	const task = tasks.find(t => t.id === id)
	if (task.done) {
		task.done = false
		render()
		return
	}
	task.done = true
	render()
	updateCounter()
}

function deleteTask(id) {
	tasks.filter(t => t.id === id)
	console.log('Filter', tasks)
	tasks.pop()
	updateCounter()
	render()
}

function clearCompleted() {
	tasks = tasks.filter(task => task.done === false)
	render()
}

function getVisibleTasks() {
	if (currentFilter === 'active') {
		return tasks.filter(task => task.done === false)
	}

	if (currentFilter === 'completed') {
		return tasks.filter(task => task.done === true)
	}

	return tasks
}

function updateCounter() {
	console.log('Counter', tasks.length)
	counter.textContent = 'Активных задач: ' + tasks.length
}

function render() {
	list.innerHTML = ''

	const visible = getVisibleTasks()
	console.log('Visible Arr:', visible)
	visible.forEach(task => {
		const li = document.createElement('li')
		li.className = 'task'
		console.log('Task Done', task.done)
		if (task.done === false) {
			li.classList.remove('done')
		}
		if (task.done) {
			li.classList.toggle('done')
		}

		const span = document.createElement('span')
		span.className = 'task__text'
		span.textContent = task.text
		span.addEventListener('click', () => toggleTask(task.id))

		const del = document.createElement('button')
		del.className = 'task__del'
		del.textContent = '✕'
		del.addEventListener('click', () => deleteTask(task.id))

		li.appendChild(span)
		li.appendChild(del)
		list.appendChild(li)

		updateCounter()
	})
}

addBtn.addEventListener('click', addTask)
clearBtn.addEventListener('click', clearCompleted)

filterButtons.forEach(btn => {
	btn.addEventListener('click', () => {
		filterButtons.forEach(b => b.classList.remove('active'))
		btn.classList.add('active')
		currentFilter = btn.dataset.filter
		console.log('currentFilter:', currentFilter)
		render()
	})
})
