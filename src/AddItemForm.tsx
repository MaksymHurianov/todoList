import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

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
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyUpHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={onAddTaskClick}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}

export default AddItemForm