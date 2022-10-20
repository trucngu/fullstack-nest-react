import React, { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/use-auth'

type Props = {
    children: ReactNode
}
export const ProtectedRoute: FC<Props> = ({
    children
}) => {

    const auth = useAuth()
    const location = useLocation()

    if (!auth.user) {
        return <Navigate to="login" state={{ from: location }} replace />
    }

    return (
        <>
            {children}
        </>
    )
}