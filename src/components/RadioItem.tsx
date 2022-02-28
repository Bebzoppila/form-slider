import { FC } from "react"

type RadioItemType = {
    name:string,
    label:string,
    updateRadioState: (text:string) => void
}

const RadioItem:FC<RadioItemType> = ({name, label, updateRadioState}) => {
    const radioId = String(Math.floor((Math.random() * 5000)  * Math.random())) 

    return(
        <div className="radio__item">
        <input onInput={() => updateRadioState(label)} value={label} name={name} id={radioId} type="radio" />
        <label htmlFor={radioId}>{label}</label>
    </div>
    )
}

export default RadioItem