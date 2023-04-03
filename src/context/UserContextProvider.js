import { useState, useContext, createContext } from "react"
import { auth } from "../utils/firebase/firebase"
import { onAuthStateChanged } from "firebase/auth"
const Context = createContext()

export const UserContextProvider = ({ children }) => {
    const [user,  setUser] = useState({})

    onAuthStateChanged(auth, (currUser) => {
        setUser(currUser)
    })

    return(
        <Context.Provider value={[user, setUser]}>
            { children }
        </Context.Provider>
    )
}

export default function useUserContext() {
    return useContext(Context)
}