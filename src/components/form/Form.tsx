import { useState } from 'react';
import axios from 'axios';
import { Input } from './Input';
import { Envelope, LockKey } from '@phosphor-icons/react';

interface FormProps {
  FormTitle: string;
  FormSubtitle: string;
  SubmitText: string;
}

export function Form({ FormTitle, FormSubtitle, SubmitText }: FormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post('Rota do backend, Colocar depois', {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('authToken', token);

      // Criar redirect para Home
    } catch (error) {
      console.error('Erro no login:', error);
      // Escolher a lib de mostrar erro depois
    }
  };

  return (
    <div className="flex flex-col h-full p-20 justify-between items-center w-1/2">
      <div className="text-xl font-semibold">
        <h2>Insirir a logo</h2>
      </div>
      <div className="w-full flex flex-col">
        <h3 className="text-2x1 font-semibold mb-4">{FormTitle}</h3>
        <p className="text-sm mb-2">{FormSubtitle}</p>
      </div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <Input
          icon={<Envelope size={24} weight="thin" />}
          type="email"
          placeholder="E-mail"
          value={email}
          setValue={setEmail}
        />
        <Input
          icon={<LockKey size={24} weight="thin" />}
          type="password"
          placeholder="Senha"
          value={password}
          setValue={setPassword}
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
        >
          {SubmitText}
        </button>
      </form>
    </div>
  );
}
