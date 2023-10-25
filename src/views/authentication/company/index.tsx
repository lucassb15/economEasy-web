import { FormController } from '@components/formAuthentication/FormController'
import BgHero from '../../../assets/bgHero.gif'

export function RegisterCompany() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-start">
      <div className="relative w-full md:w-1/2 h-[40%] md:h-full flex flex-col bg-darkblue select-none">
        <img className="w-full h-full object-cover" src={BgHero} alt="Hero" />
      </div>
      <FormController page="register/company" />
    </div>
  )
}
