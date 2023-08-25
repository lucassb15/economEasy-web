import HeroPeople from '../../assets/test.png';
import { FormRegisterCompany } from '../form/FormRegisterCompany';

export function HeroRegisterCompany() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-start">
      <div className="relative w-full md:w-1/2 h-[40%] md:h-full flex flex-col bg-darkblue select-none">
        <img
          className="w-full h-full object-cover"
          src={HeroPeople}
          alt="Hero"
        />
      </div>
      <FormRegisterCompany
        FormTitle="Cadastro Empresa"
        FormSubtitle="Por favor insira suas informações"
        SubmitText="Cadastrar"
      />
    </div>
  );
}
