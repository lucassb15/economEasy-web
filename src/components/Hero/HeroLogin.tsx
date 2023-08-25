import { useNavigate } from 'react-router-dom'
import HeroPeople from '../../assets/test.png'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useEffect } from 'react'
import { FormController } from '../form/FormController'

export function HeroLogin() {
  const { isAuthenticated, user } = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && user?.role === 'owner') {
      navigate('/casadocaraio')
    } else if (isAuthenticated && user?.role === 'user') {
      console.log('client')
      navigate('/')
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
