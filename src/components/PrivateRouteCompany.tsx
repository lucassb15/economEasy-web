import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'
import { AccessDenied } from '../views/acessDenied'
import { Roles } from '../@types/Roles'
import { Spinner } from '@chakra-ui/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PrivateRouteCompany({ children }: any) {
  const { isAuthenticated, user, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <Spinner size="xl" />
      </div>
    )
  }
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (isAuthenticated && user?.role !== Roles.Owner) {
    return <AccessDenied />
  }

  return children
}
