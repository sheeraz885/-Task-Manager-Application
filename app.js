let data = [];
var contextBody = document.getElementsByClassName("contend-text")[0];

function task(e) {
    e.preventDefault();
    addTask();
}

function addTask() {
    const dataInput = document.getElementById("input").value;
    const text = dataInput.trim();
    if (text) {
        data.push({
            task: text,
            complete: false,
        });
    }
    dataRender();
}

function dataRender() {
    contextBody.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        contextBody.innerHTML += `
        <div class="text">
            <p id="task-${i}" class="box ${data[i].complete ? 'completed' : ''}">${data[i].task}</p>
            <input type="text" class="inpEdit" value="${data[i].task}" style="display: none;">
            <div class="icons">
                <button class="edit-btn" onclick="editTask(${i})" style="display: inline-block;">Edit</button>
                <button class="save-btn" onclick="saveTask(${i})" style="display: none;">Save</button>
                <button class="complete-btn" onclick="completeTask(${i})" style="display: inline-block;">Complete</button>
                <button class="delete-btn" onclick="deleteTask(${i})" style="display: inline-block;">Delete</button>
            </div>
        </div>`;
    }
}

function editTask(index) {
    const taskElement = document.getElementById(`task-${index}`);
    const inputElement = taskElement.nextElementSibling;
    const editButton = taskElement.nextElementSibling.nextElementSibling.children[0];
    const saveButton = taskElement.nextElementSibling.nextElementSibling.children[1];
    const completeButton = taskElement.nextElementSibling.nextElementSibling.children[2];
    const deleteButton = taskElement.nextElementSibling.nextElementSibling.children[3];

    // Show save button, hide others
    inputElement.style.display = 'block';
    taskElement.style.display = 'none';
    editButton.style.display = 'none';
    saveButton.style.display = 'inline-block';
    completeButton.style.display = 'none';
    deleteButton.style.display = 'none';
}

function saveTask(index) {
    const taskElement = document.getElementById(`task-${index}`);
    const inputElement = taskElement.nextElementSibling;
    const saveButton = taskElement.nextElementSibling.nextElementSibling.children[1];
    const editButton = taskElement.nextElementSibling.nextElementSibling.children[0];
    const completeButton = taskElement.nextElementSibling.nextElementSibling.children[2];
    const deleteButton = taskElement.nextElementSibling.nextElementSibling.children[3];

    const updatedValue = inputElement.value;
    data[index].task = updatedValue;

    taskElement.innerText = updatedValue;
    inputElement.style.display = 'none';
    taskElement.style.display = 'block';
    editButton.style.display = 'inline-block';
    saveButton.style.display = 'none';
    completeButton.style.display = 'inline-block';
    deleteButton.style.display = 'inline-block';
    dataRender();
}

function completeTask(index) {
   
    data[index].complete = true;
    // Re-render the updated data
    dataRender();
    const taskElement = document.getElementById(`task-${index}`);
    const buttonsContainer = taskElement.nextElementSibling.nextElementSibling; 
    const editButton = buttonsContainer.children[0]; 
    editButton.style.display="none";
    const completeButton = buttonsContainer.children[2]; 
    completeButton.style.display="none";
    
}


function deleteTask(index) {
    data.splice(index, 1);
    dataRender();
}
