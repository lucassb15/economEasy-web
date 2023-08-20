import HeroImage from '../assets/Hero.jpg';
import { Form } from './form/Form';

export function Hero() {
  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative md:w-1/2 md:h-full h-[30%] w-full flex flex-col">
        <div className="absolute top-[25%] md:left-[5%] md:right-[5%] left-[20%] flex flex-col">
          <h1 className="md:text-2xl text-lg text-gray-200 font-extrabold my-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos, quaerat!
          </h1>
        </div>
        <img className="w-full h-full object-cover" src={HeroImage} alt="" />
      </div>
      <Form
      FormTitle='Login'
      FormSubtitle='Bem-vindo! Por favor insira suas informações'
      SubmitText='Entrar'
      />
    </div>
  );
}
