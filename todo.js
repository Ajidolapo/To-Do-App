const todoValue = document.getElementById("task");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("todo-list");
// const addUpdate = document.getElementById("add");
let todo = JSON.parse(localStorage.getItem("todo-list"));

if(!todo) {
    todo=[];
}

     function addTask() {
        if(todoValue.value === "") {
            setAlertMessage("Please enter your to-do task!");
            todoValue.focus();
            return;
        }
        else {
            let available = false;
            todo.forEach((element) => {
                if(element.item == todoValue.value) {
                    available = true;
                }
            });
            if(available) {
                setAlertMessage("This task is already present in the list!");
                return;
            }
            let li = document.createElement("li");
           const todoItem = `<div title="Hit Double Click and Complete" ondblclick="CompleteTask(this)">${todoValue.value}</div><div>
           <img class="edit-btn" onclick="EditTask(this)" src="edit.png" />
            <img class="todo-btns" onclick="DeleteTask(this)" src="delete.png" /></div>`; 
            li.innerHTML = todoItem;
            listItems.appendChild(li);

            
             let itemList = {item:todoValue.value, status:false};
            todo.push(itemList);
            setLocalStorage();
        }
        todoValue.value="";
        setAlertMessage("Task added successfully.");

     }


        
     function EditTask(e) {
        if (
            e.parentElement.parentElement.querySelector("div").style.textDecoration ===""
          ) {
            todoValue.value = e.parentElement.parentElement.querySelector("div").innerText;
            updateText = e.parentElement.parentElement.querySelector("div");
            addUpdate.setAttribute("onclick", "EditOnClick()");
            addUpdate.setAttribute("src", "refresh.png");
            todoValue.focus();
          }
        }
        
        function EditOnClick() {
          let available = false;
          todo.forEach((element) => {
            if (element.item == todoValue.value) {
              available = true;
            }
          });
        
          if (available) {
            setAlertMessage("This item already present in the list!");
            return;
          }
        
          todo.forEach((element) => {
            if (element.item == updateText.innerText.trim()) {
              element.item = todoValue.value;
            }
          });
          setLocalStorage();
        
          updateText.innerText = todoValue.value;
          addUpdate.setAttribute("onclick", "addTask()");
          addUpdate.setAttribute("src", "add.png");
          todoValue.value = "";
          setAlertMessage("Task updated successfully!");
      
       }
     

     function CompleteTask(e) {
        if(e.parentElement.querySelector("div").style.textDecoration ==="") {
            const img = document.createElement("img");
            img.src = "check-mark.png";
            img.className = "checked-todo";
            e.parentElement.querySelector("div").style.textDecoration = "line-through";
            e.parentElement.querySelector("div").style.opacity = "50%";
            e.parentElement.querySelector("div").style.display = "inline flex";
            e.parentElement.querySelector("div").style.justifyContent = "center";
            e.parentElement.querySelector("div").appendChild(img);
            e.parentElement.querySelector(".edit-btn").remove();

            todo.forEach((element) => {
                if(e.parentElement.querySelector("div").innerText.trim() == element.item) {
                    element.status = true;
                }
            });
            setLocalStorage();
            setAlertMessage("Task completed successfully!");
            pendingTasks();
        }
     }

     function DeleteTask(e) {
         const deleted = e.parentElement.parentElement.querySelector("div").innerText;

         if(confirm(`Are you sure you want to delete this task?`)){
              todoValue.focus();

             todo.forEach((element, index) => {
                  if (element.item == deleted.trim()) {
                      todo.splice(index, 1);
                  }
             });

            setTimeout(() => {
                 e.parentElement.parentElement.remove();
             }, 1000);

             setLocalStorage();
         }
     
     }

     function ReadToDoItems() {
        todo.forEach((element) => {
          let li = document.createElement("li");
          let style = "";
          if (element.status) {
            style = "style='text-decoration: line-through'";
          }
          const todoItems = `<div ${style} title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${
            element.item
          }
          ${
            style === ""
              ? ""
              : '<img class="checked-todo" src="check-mark.png" />'
          }</div><div>
          ${
            style === ""
              ? '<img class="edit-btn" onclick="UpdateToDoItems(this)" src="edit.png" />'
              : ""
          }
          <img class="todo-btns" onclick="DeleteToDoItems(this)" src="delete.png" /></div></div>`;
          li.innerHTML = todoItems;
          listItems.appendChild(li);
        });
      }
      ReadToDoItems();

    function setLocalStorage() {
       localStorage.setItem("todo-list",JSON.stringify(todo));
  }
       function setAlertMessage(message) {
       todoAlert.removeAttribute("class");
       todoAlert.innerText = message;
        setTimeout(() => {
            todoAlert.classList.add("toggleMe");
        }, 1000);
     }

     function DeleteAll() {
        if(confirm(`Are you sure you want to delete all tasks?`)) {
            todoValue.focus();

        localStorage.clear();
        todo = [];
        listItems.innerHTML = "";
        setAlertMessage("All tasks have been deleted.")
        }
     }

