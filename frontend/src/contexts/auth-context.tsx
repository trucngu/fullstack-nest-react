import { createContext, FC, ReactNode, useState } from 'react'
import api from '../api'

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

    const login = async (username: string, password: string) => {
        const { accessToken } = await api.login(username, password)

        setUser({
            token: accessToken,
            name: username
        })
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