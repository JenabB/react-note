import React, { createContext, useReducer, useEffect } from "react"
import AppReducer from "./AppReducer";

//initial state
const initialState = {
    token: localStorage.getItem("token") ? localStorage.getItem("token") : [],
    id: "",
    invoiceId: ""
}

//create context
export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    useEffect(() => {
        localStorage.setItem("token", state.token)
    }, [state])

    //actions

    const loginToken = (token) => {
        dispatch({ type: "LOGIN_TOKEN", payload: token })
    }

    return (
        <GlobalContext.Provider
            value={{
                token: state.token,
                loginToken
            }}>
            {props.children}
        </GlobalContext.Provider>
    )

}


