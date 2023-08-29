import { Navigate } from 'react-router-dom'
import { useContext, ReactNode } from 'react'
import { AuthContext } from '../contexts/AuthContext'

import colors from 'tailwindcss/colors'
import { toast } from 'react-hot-toast'
import { XCircle } from '@phosphor-icons/react'

interface PrivateRouteProps {
  children: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) {
    toast.error('Faça login antes de acessar a pagina', {
      id: 'not-authenticated',
      position: 'top-right',
      duration: 10000,
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
          onClick={() => toast.dismiss()}
        />
      ),
    })
    return <Navigate to="/signin" replace />
  }

  return children
}
