import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox, TextFields} from "@material-ui/icons";

type AddItemFormPropsType={
    addItem: (title: string) => void
}

function AddItemForm({addItem}: AddItemFormPropsType){
    let [title, setTitle] = useState<string>("");
    let [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value)
    }

    const onAddTaskClick = () => {

        if (title.trim()) {
            addItem(title.trim());
            setTitle("")
        } else {

            setError("Title is required!")
        }

    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onAddTaskClick()
        }
    }

    return (
        <div>
          {/*  <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyUpHandler}
                   className={error ? "error" : ""}
            />*/}
            <TextField
                variant={"outlined"}
                value={title}
                error={!!error}
                label={"Title"}
                helperText={error}
                onChange={onChangeHandler}
                onKeyPress={onKeyUpHandler}

            />
         {/*   <button onClick={onAddTaskClick}>+</button>*/}
           {/* <Button size={"small"} onClick={onAddTaskClick} variant={"contained"} color={"primary"}>x</Button>*/}
            <IconButton color={"primary"} onClick={onAddTaskClick}>
                <AddBox/>
            </IconButton>
            {/*{error && <div className={"error-message"}>{error}</div>}*/}
        </div>
    )
}

export default AddItemForm