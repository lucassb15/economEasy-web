import { ChangeEvent, FC, ReactNode, useState } from 'react';

// Definição das propriedades para o componente Input
interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  icon?: ReactNode;
}

export const Input: FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  setValue,
  icon,
}) => {
  // Manipula a mudança de valor no input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  //Manipula o focus do input
  const [isFocused, setIsFocused] = useState(false);

  const focusClasses = isFocused ? 'border-red-300' : 'border-gray-300';

  return (
    <div className={`flex items-center border ${focusClasses} rounded-sm`}>
      <div
        className={`text-gray-500 px-2 py-1 bg-white border-r ${focusClasses}`}
      >
        {icon}
      </div>
      <input
        className="flex-grow py-1 px-2 border-none outline-none rounded-r"
        type={type}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};
