var newTask = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasks = document.getElementById("incomplete-tasks");
var completeTasks = document.getElementById("completed-tasks");

showIncomplete();
showComplete();

function createNewTaskElement(str, id) {
    var listItem = document.createElement("li");
    var label = document.createElement("label");
    var checkBox = document.createElement("input");
    var span = document.createElement("span");
    var deleteButton = document.createElement("button");

    label.className = "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect";
    label.setAttribute("for", id);
    checkBox.type = "checkbox";
    checkBox.id = id;
    checkBox.setAttribute("onclick", "completed(this)");
    checkBox.className = "mdl-checkbox__input";
    span.className = "mdl-checkbox__label";
    span.id = "text-" + id;
    span.innerText = str;
    deleteButton.className = "mdl-button mdl-js-button mdl-js-ripple-effect delete";
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("onclick", "deleteIncomplete(this)");
    deleteButton.id = id;

    label.appendChild(checkBox);
    label.appendChild(span);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);

    return listItem;
}

function completedTaskElement(str, id) {
    var listItem = document.createElement("li");
    var span = document.createElement("span");
    var icon = document.createElement("i");
    var deleteButton = document.createElement("button");

    listItem.className = "mdl-list__item";
    span.className = "mdl-list__item-primary-content";
    icon.className = "material-icons mdl-list__item-icon";
    icon.innerText = "done";
    span.appendChild(icon);
    span.appendChild(document.createTextNode(str));
    deleteButton.className = "mdl-button mdl-js-button mdl-js-ripple-effect delete";
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("onclick", "deleteComplete(this)");
    deleteButton.id = id;

    listItem.appendChild(span);
    listItem.appendChild(deleteButton);

    return listItem;
}

function completed(element) {
    var id = element.getAttribute('id');
    var complete = getCompletedData();
    var str = document.getElementById("text-" + id).innerText;

    complete.push(str);
    localStorage.setItem('complete', JSON.stringify(complete));
    completeTasks.appendChild(completedTaskElement(str, complete.length - 1));
    var data = getData();
    data.splice(id - 1, 1);
    localStorage.setItem('todo', JSON.stringify(data));
    incompleteTasks.innerHTML = "";
    showIncomplete();
    componentHandler.upgradeDom();
}

function getData() {
    var data = localStorage.getItem('todo');
    return data ? JSON.parse(data) : [];
}

function getCompletedData() {
    var data = localStorage.getItem('complete');
    return data ? JSON.parse(data) : [];
}

function addTask() {
    var data = getData();
    var task = newTask.value;
    if (task != "") {
        data.push(task);
        localStorage.setItem('todo', JSON.stringify(data));
        add(task, data.length);
        newTask.value = "";
        componentHandler.upgradeDom();
    }
    return false;
}

function add(str, id) {
    incompleteTasks.appendChild(createNewTaskElement(str, id));
    componentHandler.upgradeDom();
}

function showIncomplete() {
    var data = getData();
    for (var i = 0; i < data.length; i++) {
        incompleteTasks.appendChild(createNewTaskElement(data[i], i + 1));
    }
    componentHandler.upgradeDom();
}

function showComplete() {
    var complete = getCompletedData();
    for (var i = 0; i < complete.length; i++) {
        completeTasks.appendChild(completedTaskElement(complete[i], i + 1));
    }
    componentHandler.upgradeDom();
}

function deleteIncomplete(button) {
    var id = button.getAttribute('id');
    var data = getData();
    data.splice(id - 1, 1);
    localStorage.setItem('todo', JSON.stringify(data));
    incompleteTasks.innerHTML = "";
    showIncomplete();
    componentHandler.upgradeDom();
    return false;
}

function deleteComplete(button) {
    var id = button.getAttribute('id');
    var data = getCompletedData();
    data.splice(id - 1, 1);
    localStorage.setItem('complete', JSON.stringify(data));
    completeTasks.innerHTML = "";
    showComplete();
    componentHandler.upgradeDom();
    return false;
}

addButton.addEventListener("click", addTask);
