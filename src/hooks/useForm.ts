import { useState } from "react"


function useForm<T extends object>(defaultState: T){
    const [allState, setAllState] = useState(defaultState)
  
    const updateStateItem = (key: keyof typeof allState, value: string) => {
      setAllState({...allState, [key]: value})
    }

    return{
        allState,
        updateStateItem
    }
}
export default useForm