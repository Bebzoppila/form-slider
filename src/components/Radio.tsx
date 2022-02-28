import { FC, FormEvent, useState } from "react"
import RadioItem from "./RadioItem"
type RadioProps = {
    radioUpdate: (radioText: string) => void,
    options: string[]
}

const Radio: FC<RadioProps> = ({ radioUpdate, options }) => {
    const [inputIsOpen, setInputIsOpen] = useState(false)

    const updateRadioState = (text: string) => {
        radioUpdate(text)
    }

    const radioName = 'name' + Math.random() * 123

    return (
        <div className="radio">
            {
                options.map((elementOpt: string) => 
                <RadioItem key={elementOpt} updateRadioState={updateRadioState} label={elementOpt} name={radioName} />)
            }
            <div className="radio__item">
                <button onClick={() => setInputIsOpen(true)}>Другое</button>
                <div className={inputIsOpen ? ' ' : "radio__item-content--hidden"}>
                    <input onChange={(event: FormEvent<HTMLInputElement>) => updateRadioState(event.currentTarget.value)} type="text" />
                </div>
            </div>
        </div>
    )
}

export default Radio