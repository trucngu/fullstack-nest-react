import { createContext, FC, ReactNode, useState } from 'react'
import api from '../api'
import constants from '../constants'

interface Auth {
    isAuthenticated: boolean
    setIsAuthenticated: (isAuthenticated: boolean) => void
    login: (username: string, password: string) => Promise<any>
    logout: () => void
}

export const AuthContext = createContext<Auth>(null!)

type Props = {
    children?: ReactNode
}

export const AuthProvider: FC<Props> = ({
    children
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const login = async (username: string, password: string) => {
        const { accessToken } = await api.login(username, password)
        if (accessToken) {
            localStorage.setItem(constants.jwt, accessToken)
            setIsAuthenticated(true)
        }
    }

    const logout = () => {
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}