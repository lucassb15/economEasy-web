import BgHero from '../assets/bgHero.gif'
import { FormController } from '../components/formAuthentication/FormController'

export function SignIn() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-start">
      <div className="relative w-full md:w-[60%] h-[40%] md:h-full flex flex-col bg-darkblue select-none">
        <img className="w-full h-full object-cover" src={BgHero} alt="Hero" />
      </div>
      <FormController page="signin" />
    </div>
  )
}
