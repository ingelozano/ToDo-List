document.addEventListener('DOMContentLoaded', function() {
    const newTaskInput = document.getElementById('newTask');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const title = document.querySelector('h1 span');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    title.addEventListener('mouseenter', function() {
        title.classList.remove('fadeInDown');
        void title.offsetWidth; // Reinicia la animación
        title.classList.add('fadeInDown');
    });

    title.addEventListener('animationend', function() {
        title.classList.remove('fadeInDown');
    });

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <button class="complete">Completada</button>
                <button class="delete">Eliminar</button>
            `;
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskList.appendChild(taskItem);
        });
        updateLocalStorage();
    }

    addTaskButton.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            newTaskInput.value = '';
            renderTasks();
        }
    }

    taskList.addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('complete')) {
            const taskItem = target.parentElement;
            const index = [...taskItem.parentElement.children].indexOf(taskItem);
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
        } else if (target.classList.contains('delete')) {
            const taskItem = target.parentElement;
            const index = [...taskItem.parentElement.children].indexOf(taskItem);
            tasks.splice(index, 1);
            renderTasks();
        }
    });

    renderTasks();
});
