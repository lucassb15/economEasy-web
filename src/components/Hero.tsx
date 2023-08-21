import HeroImage from '../assets/Hero.jpg';
import { Form } from './form/Form';

export function Hero() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-start">
      <div className="relative w-full md:w-1/2 h-[40%] md:h-full flex flex-col">
        <div className="absolute top-[20%] md:top-[25%] left-[10%] md:left-[5%] right-[10%] md:right-[5%] flex flex-col">
          <h1 className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-extrabold my-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos, quaerat!
          </h1>
        </div>
        <img className="w-full h-full object-cover" src={HeroImage} alt="Hero" />
      </div>
      <Form
        FormTitle='Login'
        FormSubtitle='Bem-vindo! Por favor insira suas informações'
        SubmitText='Entrar'
      />
    </div>
  );
}
