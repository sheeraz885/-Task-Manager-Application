//content body 
var contextBody = document.getElementsByClassName("contend-text")[0];


// Constructor for creating a task object
function ListData(itemValue) {
    this.listText = itemValue;
    this.id = Math.floor((Math.random() * 1000 + Number((new Date().getTime().toString()).slice(-4))));
    this.complete = false;
}


// task function to save info to localStorage
function saveData() {
    localStorage.setItem('todo_items', JSON.stringify(todoData));
}


// ReadData Function to read tasks from localStorage
function readData() {
    return JSON.parse(localStorage.getItem('todo_items'));
}


//  use condition for previous data existing or not, then use empty array
var todoData = (readData()) ? [...readData()] : [];


// function to render the tasks on the interface
function dataRender() {
    contextBody.innerHTML = ""; 
    for (let i = 0; i < todoData.length; i++) { 
        contextBody.innerHTML += `
        <div class="text">
            <p id="task-${i}" class="box ${todoData[i].complete ? 'completed' : ''}">${todoData[i].listText}</p>
            <input type="text" class="inpEdit" value="${todoData[i].listText}" style="display: none;">
            <div class="icons">
                <button class="edit-btn" onclick="editTask(${i})" style="display: inline-block;">Edit</button>
                <button class="save-btn" onclick="saveTask(${i})" style="display: none;">Save</button>
                <button class="complete-btn" onclick="completeTask(${i})" style="display: inline-block;">Complete</button>
                <button class="delete-btn" onclick="deleteTask(${i})" style="display: inline-block;">Delete</button>
            </div>
        </div>`;
    }
}


// Add task function
function task(e) {
    e.preventDefault();
    addTask();
}



// Add a task to the todoData array
function addTask() {
    var dataInput = document.getElementById("input").value;
    var text = dataInput;
    if (text) {
        var newTask = new ListData(text);
        
        // Add the new task to the todoData array
        todoData = [...todoData, newTask];
        
        saveData();
        dataRender();``
    }
}



// Edit a task
function editTask(index) {
    var taskElement = document.getElementById(`task-${index}`);
    var inputElement = taskElement.nextElementSibling;
    var editButton = taskElement.nextElementSibling.nextElementSibling.children[0];
    var saveButton = taskElement.nextElementSibling.nextElementSibling.children[1];
    var completeButton = taskElement.nextElementSibling.nextElementSibling.children[2];
    var deleteButton = taskElement.nextElementSibling.nextElementSibling.children[3];

    // Showing save button, hide other buttons
    inputElement.style.display = 'block';
    taskElement.style.display = 'none';
    editButton.style.display = 'none';
    saveButton.style.display = 'inline-block';
    completeButton.style.display = 'none';
    deleteButton.style.display = 'none';
}



// Save the updated task
function saveTask(index) {
    var taskElement = document.getElementById(`task-${index}`);
    var inputElement = taskElement.nextElementSibling;
    var saveButton = taskElement.nextElementSibling.nextElementSibling.children[1];
    var editButton = taskElement.nextElementSibling.nextElementSibling.children[0];
    var completeButton = taskElement.nextElementSibling.nextElementSibling.children[2];
    var deleteButton = taskElement.nextElementSibling.nextElementSibling.children[3];

    var updatedValue = inputElement.value;
    todoData[index].listText = updatedValue;
    
    saveData();
    dataRender();
    
    taskElement.innerText = updatedValue;
    inputElement.style.display = 'none';
    taskElement.style.display = 'block';
    editButton.style.display = 'inline-block';
    saveButton.style.display = 'none';
    completeButton.style.display = 'inline-block';
    deleteButton.style.display = 'inline-block';
}



// Mark a task as complete
function completeTask(index) {
    todoData[index].complete = true;
    saveData();
    dataRender();

    var taskElement = document.getElementById(`task-${index}`);
    var buttonsContainer = taskElement.nextElementSibling.nextElementSibling; 
    var editButton = buttonsContainer.children[0]; 
    editButton.style.display = "none";
    var completeButton = buttonsContainer.children[2]; 
    completeButton.style.display = "none";
}



// function Delete task
function deleteTask(index) {
    todoData.splice(index, 1);
    saveData();
    dataRender();
}



dataRender();
