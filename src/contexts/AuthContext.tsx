import jwtDecode from 'jwt-decode'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-hot-toast'
import colors from 'tailwindcss/colors'
import { XCircle } from '@phosphor-icons/react'

import { api } from '../api/api'

import { Roles } from '../@types/Roles'

interface AxiosError {
  response: {
    data: {
      message: string
    }
  }
}

interface signInCredentials {
  email: string
  password: string
}

interface UserProps {
  id: string
  name: string
  email: string
  role: Roles
  companyId?: string
  isEmployee?: boolean
  logo?: FileList
  isActive?: boolean
}

interface RegisterUserProps {
  companyId?: string
  email: string
  name: string
  password: string
  confirmPassword: string
  isEmployee: boolean
}

interface RegisterCompanyProps {
  email: string
  name: string
  password: string
  confirmPassword: string
  logo: FileList
}

interface AuthContextProps {
  isAuthenticated: boolean
  loading: boolean
  user: UserProps | null
  employees: UserProps[]
  error: null | string
  signIn: (data: signInCredentials) => Promise<void>
  registerUser: (data: RegisterUserProps) => Promise<void>
  registerCompany: (data: RegisterCompanyProps) => Promise<void>
  fetchEmployees: () => Promise<void>
  signOut: () => void
  updateUser: (updatedUser: Partial<UserProps>) => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null)
  const isAuthenticated = !!user
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [employees, setEmployees] = useState<UserProps[]>([])

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
      .then(async (response) => {
        const { accessToken } = response.data

        setCookie(undefined, 'fidelese.token', accessToken, {
          maxAge: 60 * 60 * 60 * 7, // 7 days
          path: '/',
        })

        const userLogged: UserProps = jwtDecode(accessToken)
        const companyId = userLogged.companyId
        console.log('companyId:', companyId) // Adicione esta linha

        setUser(userLogged)

        api.defaults.headers.Authorization = `Bearer ${accessToken}`

        // Verifica se a conta está inativa após o login
        if (!userLogged?.isActive) {
          const confirmActivation = window.confirm(
            'Sua conta está inativa. Deseja ativá-la agora?',
          )

          if (confirmActivation) {
            // Atualiza o estado do usuário
            setUser((prevUser) => ({
              ...prevUser!,
              isActive: true,
            }))
            console.log('Updated User:', user)
            const companyId = userLogged.id
            console.log('companyId:', companyId) // Adicione esta linha
            await api.put('/enable/company', { companyId })
          }
        }

        if (userLogged.role === Roles.Owner) {
          navigate('/company/dashboard')
        } else if (userLogged.role === Roles.Employee) {
          navigate('/employee') // Navigate employee
        } else {
          navigate('/home') // Para o papel "User" e qualquer outro caso
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
          icon: (
            <XCircle
              size={54}
              weight="fill"
              className="text-gray-50 cursor-pointer"
            />
          ),
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

        if (data.isEmployee) {
          toast.success('Funcionário cadastrado com sucesso!')
          setTimeout(() => window.location.reload(), 1000)
        } else {
          toast.success('Usuário cadastrado com sucesso!')
          setTimeout(() => window.location.reload(), 1000)
        }
        // Somente defina o novo token se nenhum usuário estiver atualmente autenticado
        if (!user) {
          setCookie(undefined, 'fidelese.token', accessToken, {
            maxAge: 60 * 60 * 60 * 7, // 7 days
            path: '/',
          })

          try {
            const userRegistered: UserProps = jwtDecode(accessToken)

            setUser(userRegistered)

            api.defaults.headers.Authorization = `Bearer ${accessToken}`
          } catch (error) {
            console.error('Erro ao decodificar o token', error)
          }
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
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('confirmPassword', data.confirmPassword)
    if (data.logo.length > 0) {
      formData.append('logo', data.logo[0]) // Adicionando o primeiro arquivo do FileList
    }

    api
      .post('/register/company', formData)
      .then(() => {
        toast.success('Empresa registrada com sucesso!')
        setTimeout(() => window.location.reload(), 1000)
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

  const companyId = user?.id
  async function fetchEmployees() {
    try {
      const response = await api.get(`/company/${companyId}/employees`)

      if (response.data) {
        setEmployees(
          Array.isArray(response.data) ? response.data : [response.data],
        )
      }
    } catch (error) {
      console.error(error)
      toast.error('Erro ao buscar funcionários.', {
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
      setError(
        (error as AxiosError).response?.data?.message || 'Erro desconhecido',
      )
    }
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

  const updateUser = (updatedUser: Partial<UserProps>) => {
    setUser((prevUser) => ({
      ...prevUser!,
      ...updatedUser,
    }))
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
        fetchEmployees,
        signOut,
        error,
        employees,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
