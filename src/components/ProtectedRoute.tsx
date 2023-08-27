import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'
import { AccessDenied } from '../views/acessDenied'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProtectedRoute({ children }: any) {
  const { isAuthenticated, user, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        Carregando...
      </div>
    )
  }
  // Teste
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isAuthenticated || (isAuthenticated && user?.role !== 'administrator')) {
    return <AccessDenied />
  }

  return children
}
