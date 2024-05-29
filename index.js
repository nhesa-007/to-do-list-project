let todo=JSON.parse(localStorage.getItem("todo"))||[];
const todoInput = document.getElementById("todoin");
const todoList = document.getElementById("todolist");
const todoCount = document.getElementById("todoCount");
const addButton=document.querySelector(".btn");
const delButton=document.getElementById("deletebtn");

document.addEventListener("DOMContentLoaded",function(){
    addButton.addEventListener("click",add);
    todoInput.addEventListener("keydown",function(event){
        if(event.key==="Enter"){
            event.preventDefault();
            add();
        }
    });
    delButton.addEventListener("click",del);
    display();
});

function add(){
    const newtask= todoInput.value.trim();
    if(newtask!==""){
        todo.push({
            text:newtask,
            disabled:false
        });
        savelocal();
        todoInput.value="";
        display();
    }
}

function del(){
    todo=[];
    savelocal();
    display();

}

function display(){
    todoList.innerHTML="";
    todo.forEach((item,index)=>{
        const p=document.createElement("p");
        p.innerHTML=`
        <div class="todo-container">
        <input type="checkbox" class="todo-checkbox"
        id="input-${index}" ${item.disabled?"checked":""}>
        
        <p id="todo-${index}" class="${
            item.disabled?"strike" :""}" onclick="editTask(${index})">${item.text}</p>
        `;
        p.querySelector(".todo-checkbox").addEventListener("change",()=>{
            toggle(index);
        });
        todoList.appendChild(p);
    })
    todoCount.textContent=todo.length;
}

function editTask(index){
    const todoitem=document.getElementById(`todo-${index}`);
    const existingtext=todo[index].text;
    const inputele=document.createElement("input");

    inputele.value=existingtext;
    todoitem.replaceWith(inputele);
    inputele.focus();

    inputele.addEventListener("blur",function(){
        const update=inputele.value.trim();
        if(update){
            todo[index].text=update;
            savelocal();
        }
        display();
    });
    inputele.addEventListener("keydown",function(event){
        if(event.key==="Enter"){
            const update=inputele.value.trim();
        if(update){
            todo[index].text=update;
            savelocal();
        }
        display();  
}
});
}

function toggle(index){
    todo[index].disabled=!todo[index].disabled;
    savelocal();
    display();
}

function savelocal(){
    localStorage.setItem("todo",JSON.stringify(todo)); 
}