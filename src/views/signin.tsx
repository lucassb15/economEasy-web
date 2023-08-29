import { Navigate } from 'react-router-dom'
import { HeroLogin } from '../components/Hero/HeroLogin'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
export function SignIn() {
  const { isAuthenticated } = useContext(AuthContext)
  if (isAuthenticated) {
    return <Navigate to="/home" />
  }
  return <HeroLogin />
}
