document.addEventListener('DOMContentLoaded', function() {
    const newTaskInput = document.getElementById('new-task');
    const addButton = document.getElementById('add-button');
    const incompleteTasks = document.getElementById('incomplete-tasks');
    const completeTasks = document.getElementById('completed-tasks');
  
    initializeTaskLists();
  
    addButton.addEventListener('click', addTask);
  
    function createTaskElement(taskText, id, isCompleted) {
        const listItem = document.createElement('li');
        listItem.className = 'mdl-list__item';
  
        if (isCompleted) {
            const span = document.createElement('span');
            span.className = 'mdl-list__item-primary-content';
            span.innerHTML = `<i class="material-icons mdl-list__item-icon">done</i>${taskText}`;
            const deleteButton = createDeleteButton(id, deleteCompletedTask);
  
            listItem.appendChild(span);
            listItem.appendChild(deleteButton);
        } else {
            const label = document.createElement('label');
            label.className = 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect';
            label.setAttribute('for', id);
  
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.id = id;
            checkBox.className = 'mdl-checkbox__input';
            checkBox.addEventListener('change', markAsCompleted);
  
            const span = document.createElement('span');
            span.className = 'mdl-checkbox__label';
            span.textContent = taskText;
  
            const deleteButton = createDeleteButton(id, deleteIncompleteTask);
  
            label.appendChild(checkBox);
            label.appendChild(span);
            listItem.appendChild(label);
            listItem.appendChild(deleteButton);
        }
  
        return listItem;
    }
  
    function createDeleteButton(id, deleteFunction) {
        const deleteButton = document.createElement('button');
        deleteButton.className = 'mdl-button mdl-js-button mdl-js-ripple-effect delete';
        deleteButton.textContent = 'Delete';
        deleteButton.id = id;
        deleteButton.addEventListener('click', deleteFunction);
        return deleteButton;
    }
  
    function markAsCompleted(event) {
        const taskId = event.target.id;
        const taskText = document.querySelector(`label[for="${taskId}"] .mdl-checkbox__label`).textContent;
        const completedTasks = getTasks('completedTasks');
        completedTasks.push(taskText);
        setTasks('completedTasks', completedTasks);
  
        removeTask('incompleteTasks', taskId);
        renderTaskLists();
    }
  
    function getTasks(key) {
        const tasks = localStorage.getItem(key);
        return tasks ? JSON.parse(tasks) : [];
    }
  
    function setTasks(key, tasks) {
        localStorage.setItem(key, JSON.stringify(tasks));
    }
  
    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            const incompleteTasks = getTasks('incompleteTasks');
            incompleteTasks.push(taskText);
            setTasks('incompleteTasks', incompleteTasks);
            renderTaskLists();
            newTaskInput.value = '';
        } else {
            alert('Task cannot be empty');
        }
    }
  
    function renderTasks(taskList, container, isCompleted) {
        container.innerHTML = '';
        taskList.forEach((task, index) => {
            container.appendChild(createTaskElement(task, index, isCompleted));
        });
    }
  
    function renderTaskLists() {
        renderTasks(getTasks('incompleteTasks'), incompleteTasks, false);
        renderTasks(getTasks('completedTasks'), completeTasks, true);
    }
  
    function removeTask(key, id) {
        const tasks = getTasks(key);
        tasks.splice(id, 1);
        setTasks(key, tasks);
    }
  
    function deleteIncompleteTask(event) {
        const taskId = event.target.id;
        removeTask('incompleteTasks', taskId);
        renderTaskLists();
    }
  
    function deleteCompletedTask(event) {
        const taskId = event.target.id;
        removeTask('completedTasks', taskId);
        renderTaskLists();
    }
  
    function initializeTaskLists() {
        renderTaskLists();
    }
});
