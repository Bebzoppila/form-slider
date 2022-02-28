const defaultState = { 
    city: '', age: 0, educationName: '', 
    educationStart: '', educationEnd: '', 
    educationNow: false, fullName: '', 
    phone: '', firmName: '',
    firmStart: '', firmEnd: '',
    firmNow: false,
}

const cityOptions = ['Москва', 'Питер', 'Ростов']

const ageOptions = ['16', '17', '18']

type inputItemType = {
    label: string,
    key: keyof typeof defaultState,
    type: string
}

const inputEducations: inputItemType[] = [
    {
        label: 'Название учебного заведения',
        key: 'educationName',
        type: 'text'
    },
    {
        label: 'Дата поступления',
        key: 'educationStart',
        type: 'date'
    },
    {
        label: 'Дата окончания обучения',
        key: 'educationEnd',
        type: 'date'
    },
    {
        label: 'По настоящее время',
        key: 'educationNow',
        type: 'checkbox'
    },
]

const inputFirm: inputItemType[] = [
    {
        label: 'Название места работы',
        key: 'firmName',
        type: 'text'
    },
    {
        label: 'Год начала работы',
        key: 'firmStart',
        type: 'date'
    },
    {
        label: 'Название места работы',
        key: 'firmEnd',
        type: 'date'
    },
    {
        label: 'По настоящее время',
        key: 'firmNow',
        type: 'checkbox'
    },
]

export { defaultState, cityOptions, ageOptions, inputEducations, inputFirm } 