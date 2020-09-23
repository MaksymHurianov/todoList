import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={changeStatus}
                />

                <EditableSpan value={t.title} changeValue={changeTaskTitle}/>
                <button onClick={removeTask}>X</button>
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
                <button onClick={() => {
                    props.removeTodoList(props.id)
                }}>X
                </button>
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
            <ul>
                {tasks}
                {/* <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>

                <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={() => {
                        props.changeFilter("all", props.id)
                    }}>All
                </button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={() => {
                        props.changeFilter("active", props.id)
                    }}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={() => {
                        props.changeFilter("completed", props.id)
                    }}>Completed
                </button>
            </div>
        </div>
    )
}