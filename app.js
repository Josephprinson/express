const express = require("express");
const morgan = require("morgan");

const app = new express();
app.use(morgan('dev'));
app.use(express.json());

//in memory storege
let tasks = [];
//route to get all task
app.get('/',(req,res)=>{
    res.json(tasks);

})
//route to create a new task
app.post('/tasks',(req,res)=>{
    const task = req.body
    tasks.push(task);
    res.send({message:"task added",tasks})
})
//route to get a task by id
app.get('/tasks/:id',(req,res) =>{
    const id = req.params.id;
    const task = tasks.find(tasks=>tasks.id===id)
    if(!task){
    res.send("task not found");
    }else{
        res.json(task)
    }
})

app.delete('/tasks/:id',(req,res)=>{
    const id =req.params.id
   const index=tasks.find((task)=>task.id===id)
    if(index===-1){
        res.send("it is not present")

    }else{
        tasks.splice(index,1);
        res.send("Task Deleted")
        
    }
})
//app.put("/update/:id",(req,res)=>{
   // console.log("req.body");
   //tasks.splice(0,1,req.body);
  //  res.send({message:"updated",tasks})
//})

app.put ('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    const updatedTask = req.body;
    const index = tasks.findIndex((task)=>task.id===id);
    if(index===-1){
        res.send("task not send");
    }else{
        tasks.splice(index,1,updatedTask);
        res.json(tasks)
    }
})

app.listen(4005,(req,res)=>{
    console.log("port is working");
})
