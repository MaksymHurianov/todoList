import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, Checkbox, IconButton} from "@material-ui/core";

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string,todoListID: string) => void
    changeTodoListTitle: (todoListID:string, title:string) => void
}

export function TodoList(props: PropsType) {

    const tasks =
        props.tasks.map(t => {
            const removeTask = () => {
                props.removeTask(t.id, props.id)
            };
            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeStatus(t.id, e.currentTarget.checked, props.id)
            }
            const changeTaskTitle = (value:string)=>{
                props.changeTaskTitle(t.id, value, props.id)
            }
            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <Checkbox
                    color={"primary"}
                    checked={t.isDone}
                    onChange={changeStatus}
                />
               {/* <input type="checkbox"
                       checked={t.isDone}
                       onChange={changeStatus}
                />*/}

                <EditableSpan value={t.title} changeValue={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
                {/*<button onClick={removeTask}>X</button>*/}
            </li>
        })


    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodoListTitle = (title:string) => {
        props.changeTodoListTitle(props.id, title)
    }
   /* let [title, setTitle] = useState<string>("");
    let [error, setError] = useState<string | null>(null)*/

  /*  const addTask = () => {

        if (title.trim()) {
            props.addTask(title.trim(), props.id);
            setTitle("")
        } else {

            setError("Title is required!")
        }

    }*/

   /* const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value)
    }*/
 /*   const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }*/

    return (
        <div>
            <h3>
            <EditableSpan value={props.title} changeValue={changeTodoListTitle}/>
            <IconButton onClick={()=> {props.removeTodoList(props.id)}}>
                <Delete/>
            </IconButton>
             {/*   <button onClick={() => {
                    props.removeTodoList(props.id)
                }}>X
                </button>*/}
            </h3>
            <AddItemForm addItem={addTask}/>
          {/*  <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyUpHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>*/}
            <ul style={{listStyle:"none", paddingLeft:"0" }}>
                {tasks}
                {/* <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>

                <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <Button
                    style={{margin:"0 3px"}}
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === "all" ? "primary" : "default"}
                   // className={props.filter === "all" ? "active-filter" : ""}
                    onClick={() => {
                        props.changeFilter("all", props.id)
                    }}>All
                </Button>
                <Button
                    style={{margin:"0 3px"}}
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === "active" ? "primary" : "default"}
                    // className={props.filter === "active" ? "active-filter" : ""}
                    onClick={() => {
                        props.changeFilter("active", props.id)
                    }}>Active
                </Button>
                <Button
                    style={{margin:"0 3px"}}
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === "completed" ? "primary" : "default"}
                    // className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={() => {
                        props.changeFilter("completed", props.id)
                    }}>Completed
                </Button>
            </div>
        </div>
    )
}