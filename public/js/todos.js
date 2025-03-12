const API_URL = `http://${window.location.hostname}:5000/todos`;

async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        tasks = await response.json();
        renderTasks();
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

document.getElementById("taskInput").addEventListener("keydown", async function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        await addTask();
    }
});

async function addTask() {
    const taskInput = document.getElementById("taskInput");
    if (taskInput.value.trim() === "") return;

    const newTask = { context: taskInput.value, isCompleted: false };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        });

        if (response.ok) {
            taskInput.value = "";
            fetchTasks();
        }
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

async function toggleTask(id, isCompleted) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isCompleted: !isCompleted })
        });
        fetchTasks();
    } catch (error) {
        console.error("Error updating task:", error);
    }
}

async function deleteTask(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchTasks();
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

async function deleteDoneTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        for (const task of tasks) {
            if (task.isCompleted) {
                await deleteTask(task.id);
            }
        }
        fetchTasks();
    } catch (error) {
        console.error("Error deleting done tasks:", error);
    }
}

async function deleteAllTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        for (const task of tasks) {
            await deleteTask(task.id);
        }
        fetchTasks();
    } catch (error) {
        console.error("Error deleting all tasks:", error);
    }
}

function filterTasks(filter) {
    renderTasks(filter);
}

function openEditModal(id, currentText) {
    const listItem = document.querySelector(`[data-task-id="${id}"]`);
    
    if (!listItem) return;

    const existingEditBox = document.querySelector(".edit-box");
    if (existingEditBox) existingEditBox.remove();

    listItem.querySelectorAll(".task-actions").forEach(el => el.style.display = "none");

    const editBox = document.createElement("form");
    editBox.className = "edit-box";
    editBox.innerHTML = `
        <textarea class="form-control form-control-sm" id="editInput" style="resize: none; height: 80px;">${currentText}</textarea>
        <div class="d-flex mt-2">
            <button type="submit" class="btn btn-success btn-sm flex-fill me-1">💾 Save</button>
            <button type="button" class="btn btn-secondary btn-sm flex-fill" onclick="cancelEdit('${id}')">❌ Cancel</button>
        </div>
    `;

    editBox.addEventListener("submit", function (event) {
        event.preventDefault(); 
        saveEdit(id);
    });

    listItem.appendChild(editBox);
    document.getElementById("editInput").focus();
}



function saveEdit(id) {
    const newText = document.getElementById("editInput").value.trim();
    if (newText === "") return;

    updateTask(id, newText);
    restoreTaskItem(id);
}

function cancelEdit(id) {
    restoreTaskItem(id);
}

function restoreTaskItem(id) {
    const listItem = document.querySelector(`[data-task-id="${id}"]`);
    if (!listItem) return;
    const editBox = listItem.querySelector(".edit-box");
    if (editBox) editBox.remove();
    listItem.querySelectorAll(".task-actions").forEach(el => el.style.display = "inline");
}




async function updateTask(id, newText) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ context: newText })
        });
        fetchTasks();
    } catch (error) {
        console.error("Error updating task:", error);
    }
}

function renderTasks(filter = "all") {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        if (filter === "done" && !task.isCompleted) return;
        if (filter === "todo" && task.isCompleted) return;

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.setAttribute("data-task-id", task.id); 

        const taskText = document.createElement("span");
        taskText.innerHTML = task.isCompleted ? `<s>${task.context}</s>` : task.context;

        const actions = document.createElement("div");
        actions.className = "task-actions";
        actions.innerHTML =
            `
                <input type="checkbox" ${task.isCompleted ? "checked" : ""} onclick="toggleTask('${task.id}', ${task.isCompleted})" class="me-2">
                <button class="btn btn-warning btn-sm me-2" onclick="openEditModal('${task.id}', '${task.context}')">✏️</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask('${task.id}')">🗑️</button>
            `;

        li.appendChild(taskText);
        li.appendChild(actions);
        taskList.appendChild(li);
    });
}


fetchTasks();
