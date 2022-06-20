var formEl = document.querySelector("#task-form");
// this variable listens for the submit button to be clicked at the bottom, then targets whatever in the html doc has the id of task-form
var tasksToDoEl = document.querySelector("#tasks-to-do");
// this variable edits whatever in the html has an id of tasks-to-do
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var tasks = [

];


var taskFormHandler = function() {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // this variable targets an input button, with a name of task-name and looks only for the value of the input
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // this variable gets the calue of the selevct dropdown's picked option element in the html. Then updates the selector element with a name of task type with the value of the variable

    // validating the input
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    
    formEl.reset();
    // package up data as an object
    var isEdit = formEl.hasAttribute("data-task-id");
    

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
      // this send sthe data we just saved to a local variable taskdataObj to the createTaskEl funvtion as well as calling the variable within createTaskEl = function(taskdataObj)
        createTaskEl(taskDataObj);
        // this will now only get called if isEdit if false
    }
  };


 
    // divinding long functions into mini functions helps make the code easier to read and edit

  var createTaskEl = function(taskDataObj) {
    // this dynamically ads a li element to the html that has an id of task-item, its content is equal to the taskNameInput variable, and appends to the tasksToDoEl variable above which in turn goes to the task-to-do html id
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    // creates list item ^^

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);


    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div. this dynamically creates an h3 for the task name and a span element for the task type within each div each time the function is called
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    // now taskdataobj is looking specifically for the name and type of the passed in variable


    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    // increase task counter for next unique id
    taskIdCounter++;
  };

  var createTaskActions = function(taskId) {
    // this dynamically creates a div element in the html with a class name of task-actions
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "tasks-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
      
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;

  };




var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        console.log("edit", targetEl);
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
      } else if (targetEl.matches(".delete-btn")) {
        console.log("delete", targetEl);
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
      }
};

var deleteTask = function(taskId) {
    // this creates the taskSelected variable to target the html task item element that has a data-task-id equal to the arguement passed in from taskId
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
        updatedTaskArr.push(tasks[i]);
    }
    }

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
  };

var editTask = function(taskId) {
    console.log("editing task #" + taskId);
    
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    // write values of taskname and taskType to form to be edited
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    // set data attribute to the form with a value of the task's id so it knows which one is being edited
    formEl.setAttribute("data-task-id", taskId);
    // update form's button to reflect editing a task rather than creating a new one
    formEl.querySelector("#save-task").textContent = "Save Task";
}  ;

var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through the tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    alert("Task Updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
  };



  var taskStatusChangeHandler = function(event) {
      // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    // update task's in tasks array
    for (var i = 0; i < taskButtonHandler.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
            // this is changing a tasks status that is already in the tasks array
        }
    }
  };

// Create a new task

 formEl.addEventListener("submit", taskFormHandler);
// this listens for a submit button to be click, then runs the taskFormHandler function
// pageContentEl.addEventListener("click", taskButtonHandler);
// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

// for changing the status
// pageContentEl.addEventListener("change", taskStatusChangeHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);


