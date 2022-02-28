import {  FC, FormEvent } from "react"

type InputItemProps = {
    label: string,
    onChange: (text: string) => void,
    type?: string
}

const InputItem:FC<InputItemProps> = ({label, onChange, type='text'}) => {
    const inputId = String(Math.floor((Math.random() * 5000)  * Math.random())) 

    const changeInput = (event: FormEvent<HTMLInputElement>) => {
        if(type === 'checkbox'){
            onChange(String(event.currentTarget.checked))
        }else{
            onChange(event.currentTarget.value)
        }
    }

    return(
        <div className="input-item">
            <label htmlFor={inputId}>{label}</label>
            <input onChange={changeInput} type={type} id={inputId} />
        </div>
    )
}

export default InputItem