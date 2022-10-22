import React, { useEffect } from 'react'
import { AuthContext } from '../contexts/auth-context'

export const useAuth = () => {
  return React.useContext(AuthContext)
}
