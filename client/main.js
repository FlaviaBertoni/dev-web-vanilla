async function load() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();

    if (!tasks || tasks.length === 0) return showEmptyMessage();

    tasks.forEach((task) => { appendTask(task) });
    addfilterTasksEvent(tasks);
}

function showEmptyMessage() {
    const tasksElement = document.getElementById("tasks");

    const newItem = document.createElement("div");
    newItem.className = 'empty';
    newItem.innerText = 'nenhuma tarefa encontrada.';

    tasksElement.appendChild(newItem);
}

function appendTask(task) {
    const tasksElement = document.getElementById("tasks");

    const newItem = document.createElement("div");
    newItem.className = 'item';

    const text = document.createElement("p");
    text.innerText = task.description;
    text.className = 'text';
    newItem.appendChild(text);

    const date = document.createElement("p");
    date.innerText = task.targetDate;
    date.className = 'date';
    newItem.appendChild(date);

    tasksElement.appendChild(newItem);
}

function addfilterTasksEvent(tasks) {
    const input = document.getElementById('filter');

    input.addEventListener('change', function () {

        const tasksElement = document.getElementById("tasks");
        tasksElement.innerHTML = '';

        if (!this.value) return tasks.forEach((task) => { appendTask(task) });

        const exp = new RegExp(this.value.trim(), 'i');
        const filterTasks = tasks.filter(task => exp.test(task.description) || exp.test(task.targetDate));
        console.log('filterTasks', filterTasks)

        if (!filterTasks || filterTasks.length === 0) return showEmptyMessage();
        filterTasks.forEach((task) => { appendTask(task) });
    });
}

load();
