//Vamos agregar el evento del formulario
document.getElementById('formTask').addEventListener('submit',SaveTask);

function SaveTask(e){
    //Puedo imprimir su valor
    //console.log(document.getElementById('TitleTask').value);

    //we save the data in const for to be able to use them
    let title = document.getElementById('TitleTask').value;
    let Description = document.getElementById('DescriptionTask').value;

    //we build an object
    const task = {
        title,//title = title,
        Description //Description = Description
    };
    //we print in console
    //console.log(task);

    //we set the localStorege.setItem
    //localStorage.setItem('tasks',JSON.stringify(task));
    //console.log(JSON.parse( localStorage.getItem('tasks',JSON.stringify(task))))
    if(localStorage.getItem('tasks') === null){
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }else{
     let tasks = JSON.parse(localStorage.getItem('tasks'));
     tasks.push(task);
     localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    getTask();
    document.getElementById('formTask').reset();
    e.preventDefault();//Prevenimos el comportamiento por defecto
}

function getTask(){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('Tasks');

    tasksView.innerHTML = " ";

    for(let i = 0; i < tasks.length; i++){
        let title = tasks[i].title;
        let Description = tasks[i].Description;

        tasksView.innerHTML += `<div class="card mb-3">
        <div class="card-body">
        <p>${title} - ${Description}</p>
        <a class="btn btn-danger" onclick="DeleteTask('${title}')" >Delete</a>
        </div>
    </div>`
    }
}
function DeleteTask(title){
    //console.log(title);
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].title == title){
            tasks.splice(i,1);
        }
    }
    localStorage.setItem('tasks',JSON.stringify(tasks));
    getTask();
}
getTask()