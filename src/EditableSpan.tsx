import React, {ChangeEvent, useState} from "react"
type EditableSpanPropsType = {
    value: string
    changeValue: (value:string) => void
}
function EditableSpan(props: EditableSpanPropsType){

    let[editMode, setEditMode] = useState<boolean>(false)
    let[title,setTitle] = useState<string>(props.value)

    const activatedEditMode = () => {
        setEditMode(true)
    }
    const deActivatedEditMode = () => {
        setEditMode(false)
        props.changeValue(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ?<input
            value={title}
            onBlur={deActivatedEditMode}
            autoFocus={true}
            onChange={onChangeHandler}
        />
        :<span onDoubleClick={activatedEditMode}>{props.value}</span>
}

export default EditableSpan