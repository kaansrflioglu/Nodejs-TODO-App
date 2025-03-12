let tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    if (taskInput.value.trim() === "") return;
    tasks.push({ text: taskInput.value, done: false });
    taskInput.value = "";
    renderTasks();
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function deleteDoneTasks() {
    tasks = tasks.filter(task => !task.done);
    renderTasks();
}

function deleteAllTasks() {
    tasks = [];
    renderTasks();
}

function filterTasks(type) {
    renderTasks(type);
}

function renderTasks(filter = "all") {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (filter === "done" && !task.done) return;
        if (filter === "todo" && task.done) return;

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        const taskText = document.createElement("span");
        taskText.innerHTML = task.done ? `<s>${task.text}</s>` : task.text;

        const actions = document.createElement("div");
        actions.innerHTML = `
            <input type="checkbox" ${task.done ? "checked" : ""} onclick="toggleTask(${index})" class="me-2">
            <button class="btn btn-warning btn-sm me-2">✏️</button>
            <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">🗑️</button>
        `;

        li.appendChild(taskText);
        li.appendChild(actions);
        taskList.appendChild(li);
    });
}