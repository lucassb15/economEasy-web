import { useNavigate } from 'react-router-dom'
// import { HeroLogin } from '../components/Hero/HeroLogin'
import HeroPeople from '../assets/test.png'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
import { Roles } from '../@types/Roles'
import { FormController } from '../components/form/FormController'
export function SignIn() {
  const { isAuthenticated, user } = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && user?.role === Roles.Owner) {
      console.log('company')
      navigate('/company/dashboard')
    } else if (isAuthenticated && user?.role === Roles.Employee) {
      console.log('client')
      navigate('/home')
    }
  }, [isAuthenticated, user, navigate])
  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-start">
      <div className="relative w-full md:w-1/2 h-[40%] md:h-full flex flex-col bg-darkblue select-none">
        <img
          className="w-full h-full object-cover"
          src={HeroPeople}
          alt="Hero"
        />
      </div>
      <FormController page="signin" />
    </div>
  )
}
