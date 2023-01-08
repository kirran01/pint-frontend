import { useState, useEffect, createContext } from "react";
import axios from "axios";
const AuthContext = createContext()

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState()
    const [isLoading, setIsLoading] = useState()
    const [user, setUser] = useState()

    const authenticateUser = () => {
        const storedToken = localStorage.getItem('authToken')
        if (storedToken) {
            axios.get('http://localhost:3000/auth/verify', { headers: { Authorization: `Bearer ${storedToken}` } })
                .then(res => {
                    const user = res.data
                    setIsLoggedIn(true)
                    setIsLoading(false)
                    setUser(user)
                })
                .catch(err => {
                    setIsLoggedIn(false)
                    setIsLoading(false)
                    setUser(null)
                })
        } else {
            setIsLoggedIn(false)
            setIsLoading(false)
            setUser(null)
        }
    }
    const storeToken = (token) => {
        localStorage.setItem('authToken', token)
    }
    const removeToken = () => {
        localStorage.removeItem('authToken')
    }
    const logOut = () => {
        removeToken()
        authenticateUser()
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOut }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthProviderWrapper }

