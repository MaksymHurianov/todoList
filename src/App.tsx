import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";


import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";






export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    /*let [tasks, setTasks] = useState <Array<TaskType>> (
        [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Rest API", isDone: true},
            {id: v1(), title: "GraphQL", isDone: true}
            ]
    )*/

    let todoListID1 = v1()
    let todoListID2 = v1()


    let [filter, setFilter] =  useState<FilterValuesType>("all")
    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListID1]:[
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Rest API", isDone: true},
            {id: v1(), title: "GraphQL", isDone: true}
        ],
        [todoListID2]:[
            {id: v1(), title: "Books", isDone: false},
            {id: v1(), title: "Butter", isDone: false},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Fish", isDone: true}
        ]
    })

/*    let tasks: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "React", isDone: true},
        {id: 4, title: "Rest API", isDone: true},
        {id: 5, title: "GraphQL", isDone: true},
    ];*/

    function addTask(title: string, todoListID: string){
        let todoListTasks = tasks[todoListID]
        let newTask: TaskType = {id: v1(), title: title, isDone: false};
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    function removeTasks (taskID:string, todoListID: string){
        let todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(t => t.id !== taskID)
        setTasks({...tasks})

    }
/*
    function changeFilter(value: FilterValuesType){
        setFilter(value)
    }*/
    function changeFilter(value: FilterValuesType, todoListID: string){
        let todoList = todoLists.find(tl => tl.id === todoListID)
        if(todoList){
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function  changeStatus(taskID: string, isDone: boolean,todoListID: string){
        let todoListTasks = tasks[todoListID]
        let task = todoListTasks.find(t => t.id === taskID);
        if(task){
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    function removeTodoList(todoListID: string){
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }

    function addTodoList(title:string){
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({
            ...tasks,
            [newTodoListID]:[]
        })
    }

    function changeTaskTitle(taskID: string, title: string,todoListID: string){
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(task => task.id === taskID)
        if(task){
            task.title = title
            setTasks({...tasks})
        }
    }

    function changeTodoListTitle(todoListID:string, title:string){
        const todoList =  todoLists.find(tl => tl.id === todoListID)
        if(todoList){
            todoList.title = title
            setTodoLists([...todoLists])
        }

    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" >
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:"15px"}}>
                     <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={10}>
            {
                todoLists.map(tl => {
                    let tasksForTodolist = tasks[tl.id];
                    if(tl.filter === "active"){
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false)
                    }
                    if(tl.filter === "completed"){
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true)
                    }
                    return(
                        <Grid item={true} key={tl.id}>
                            <Paper style={{padding:"15px"}} elevation={7}>
                    <TodoList

                              id={tl.id}
                              title={tl.title}
                              tasks={tasksForTodolist}
                              filter={tl.filter}
                              addTask={addTask}
                              removeTask={removeTasks}
                              changeFilter={changeFilter }
                              changeStatus={changeStatus}
                              removeTodoList={removeTodoList}
                              changeTaskTitle={changeTaskTitle}
                              changeTodoListTitle={changeTodoListTitle}
                    />
                            </Paper>
                        </Grid>
                    )

                })
            }
                </Grid>
            </Container>

        </div>
    );
}

export default App;

