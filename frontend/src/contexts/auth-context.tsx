import { createContext, FC, ReactNode, useEffect, useState } from 'react'
import api from '../api'
import constants from '../constants'
import jwtDecode from 'jwt-decode'

interface User {
    token: string
    name: string
}

interface Auth {
    user?: User
    login: (username: string, password: string) => void
    logout: () => void
}

export const AuthContext = createContext<Auth>(null!)

type Props = {
    children?: ReactNode
}

export const AuthProvider: FC<Props> = ({
    children
}) => {
    const [user, setUser] = useState<User>(null!)

    useEffect(() => {
        (async () => {
            const profile = await api.getProfile()
            console.log(profile)
        })()
    }, [])

    const login = async (username: string, password: string) => {
        const { accessToken } = await api.login(username, password)
        if (accessToken) {
            localStorage.setItem(constants.jwt, accessToken)
            const profile = await api.getProfile()
            console.log(profile)
            setUser({
                token: accessToken,
                name: username
            })
        }
    }

    const logout = () => {
        setUser(null!)
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}