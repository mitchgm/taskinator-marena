var formEl = document.querySelector("#task-form");
// this variable listens for the submit button to be clicked at the bottom, then targets whatever in the html doc has the id of task-form
var tasksToDoEl = document.querySelector("#tasks-to-do");
// this variable edits whatever in the html has an id of tasks-to-do


var taskFormHandler = function() {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // this variable targets an input button, with a name of task-name and looks only for the value of the input
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // this variable gets the calue of the selevct dropdown's picked option element in the html. Then updates the selector element with a name of task type with the value of the variable
    
    // package up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  // this send sthe data we just saved to a local variable taskdataObj to the createTaskEl funvtion as well as calling the variable within createTaskEl = function(taskdataObj)
  createTaskEl(taskDataObj);

    
  };

    // divinding long functions into mini functions helps make the code easier to read and edit

  var createTaskEl = function(taskDataObj) {
    // this dynamically ads a li element to the html that has an id of task-item, its content is equal to the taskNameInput variable, and appends to the tasksToDoEl variable above which in turn goes to the task-to-do html id
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    // creates list item ^^


    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div. this dynamically creates an h3 for the task name and a span element for the task type within each div each time the function is called
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    // now taskdataobj is looking specifically for the name and type of the passed in variable


    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
  }


 formEl.addEventListener("submit", taskFormHandler);
// this listens for a submit button to be click, then runs the taskFormHandler function




