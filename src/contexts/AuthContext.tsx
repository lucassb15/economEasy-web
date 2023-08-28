import jwtDecode from 'jwt-decode'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-hot-toast'
import colors from 'tailwindcss/colors'
import { XCircle } from '@phosphor-icons/react'

import { api } from '../api/api'

import { Roles } from '../@types/Roles'

interface signInCredentials {
  email: string
  password: string
}

interface UserProps {
  id: string
  name: string
  email: string
  role: Roles
}

interface RegisterUserProps {
  name: string
}

interface RegisterCompanyProps {
  companyName: string
}

interface AuthContextProps {
  isAuthenticated: boolean
  loading: boolean
  user: UserProps | null
  error: null | string
  signIn: (data: signInCredentials) => Promise<void>
  registerUser: (data: RegisterUserProps) => Promise<void>
  registerCompany: (data: RegisterCompanyProps) => Promise<void>
  signOut: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null)
  const isAuthenticated = !!user
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const { 'fidelese.token': token } = parseCookies()

    async function getUserData() {
      try {
        if (token) {
          const user: UserProps = jwtDecode(token)

          setUser(user)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getUserData()

    setLoading(false)

    // setTimeout(() => {
    // setLoading(false)
    // }, 5000)
  }, [])

  async function signIn({ email, password }: signInCredentials) {
    await api
      .post('/signin', {
        email,
        password,
      })
      .then((response) => {
        const { accessToken } = response.data

        setCookie(undefined, 'fidelese.token', accessToken, {
          maxAge: 60 * 60 * 60 * 7, // 7 days
          path: '/',
        })

        const userLogged: UserProps = jwtDecode(accessToken)

        setUser(userLogged)

        api.defaults.headers.Authorization = `Bearer ${accessToken}`

        if (userLogged.role === Roles.Owner) {
          navigate('/company/dashboard')
        } else {
          navigate('/')
        }
      })
      .catch((error) => {
        console.error(error)
        toast.error(error.response.data, {
          position: 'top-right',
          style: {
            backgroundColor: colors.red[500],
            color: colors.white,
            fontSize: 16,
            fontWeight: 500,
            padding: 16,
          },
          icon: <XCircle size={54} weight="fill" className="text-gray-50" />,
        })
        console.log(error.response.data.message)
        setError(error.response.data.message)
      })
  }

  async function registerUser(data: RegisterUserProps) {
    api
      .post('/register/user', data)
      .then((response) => {
        const { accessToken } = response.data

        setCookie(undefined, 'fidelese.token', accessToken, {
          maxAge: 60 * 60 * 60 * 7, // 7 days
          path: '/',
        })

        const userRegistered: UserProps = jwtDecode(accessToken)

        setUser(userRegistered)

        api.defaults.headers.Authorization = `Bearer ${accessToken}`

        if (userRegistered.role === Roles.Owner) {
          navigate('/company/dashboard')
        } else {
          navigate('/')
        }
      })
      .catch((error) => {
        console.error(error)
        toast.error(error.response.data.message, {
          position: 'top-right',
          style: {
            backgroundColor: colors.red[500],
            color: colors.white,
            fontSize: 16,
            fontWeight: 500,
            padding: 16,
          },
          icon: <XCircle size={54} weight="fill" className="text-gray-50" />,
        })
        setError(error.response.data.message)
      })
  }

  async function registerCompany(data: RegisterCompanyProps) {
    api
      .post('/register/company', data)
      .then(() => {
        toast.success('Empresa registrada com sucesso!', {
          // ... (outros parâmetros do toast se necessário)
        })
      })
      .catch((error) => {
        console.error(error)
        toast.error('Ops! Ocorreu um erro inesperado ao registrar a empresa.', {
          position: 'top-right',
          style: {
            backgroundColor: colors.red[500],
            color: colors.white,
            fontSize: 16,
            fontWeight: 500,
            padding: 16,
          },
          icon: <XCircle size={54} weight="fill" className="text-gray-50" />,
        })
        setError(error.response.data.message)
      })
  }

  async function signOut() {
    try {
      destroyCookie(null, 'fidelese.token')
      setUser(null)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        isAuthenticated,
        signIn,
        registerUser,
        registerCompany,
        signOut,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
