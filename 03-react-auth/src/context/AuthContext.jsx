import { createContext, useState, useEffect, useContext } from 'react'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

// Creo el contexto
const AuthContext = createContext()

const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false) // ¿Estoy autenticado?
  const [userPayload, setUserPayload] = useState(null) // JWT payload decodificado
  const login = (token) => {
    // Guardar el token en el local storage
    window.localStorage.setItem('token', token)
    // Decodificar el token
    const decoded = jwt_decode(token)
    setUserPayload(decoded)
    setIsAuth(true)
  }

  const logout = () => {
    // Eliminar el token del local storage
    window.localStorage.removeItem('token')
    setUserPayload(null)
    setIsAuth(false)
  }

  useEffect(() => {
    // recuperar el token si existe en el local storage, si no existe devolvera null
    const token = window.localStorage.getItem('token')
    login(token)
  }, [])

  const values = {
    login,
    logout,
    userPayload,
    isAuth
  }

  return (
    <AuthContext.Provider value={values} {...props} />
  )
}

const useAuthContext = () => {
  const context = useContext(AuthContext)
  return context
}

export {
  AuthContext,
  AuthProvider,
  useAuthContext
}
