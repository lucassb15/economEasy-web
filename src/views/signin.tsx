import { useNavigate } from 'react-router-dom'
import BgHero from '../assets/bgHero.gif'
import { FormController } from '../components/formAuthentication/FormController'
import { AuthContext } from '@contexts/AuthContext'
import { useContext, useEffect } from 'react'
import { Roles } from '../@types/Roles'

export function SignIn() {
  const { isAuthenticated, user } = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && user?.role === Roles.Owner) {
      navigate('/company/dashboard')
    } else if (isAuthenticated && user?.role === Roles.Customer) {
      navigate('/home')
    } else if (isAuthenticated && user?.role === Roles.Employee) {
      navigate('/employee')
    }
  }, [isAuthenticated, user, navigate])

  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-start">
      <div className="relative w-full md:w-[60%] h-[40%] md:h-full flex flex-col bg-darkblue select-none">
        <img className="w-full h-full object-cover" src={BgHero} alt="Hero" />
      </div>
      <FormController page="signin" />
    </div>
  )
}
