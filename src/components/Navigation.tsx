import { useState, useRef, useEffect } from 'react';
import { List, PiggyBank } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

interface NavigationProps {
  menuItems: {
    label: string;
    link: string;
  }[];
}

export function Navigation({ menuItems }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // Adicionando essa função para lidar com o evento de resize
  const handleResize = () => {
    if (window.innerWidth > 1024) {
      setIsOpen(false); // Fechar o menu ao redimensionar para desktop
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="bg-[#42008C] text-white">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center -space-y-2 select-none">
            <PiggyBank size={28} color="#DDFF21" weight="fill" />
            <h1 className="text-2xl font-bold">ECONOMEASY</h1>
          </div>

          <div className={`lg:hidden ${isOpen ? 'hidden' : ''}`}>
            <button
              onClick={() => setIsOpen(true)}
              className="focus:outline-none focus:ring-0"
            >
              <List size={28} />
            </button>
          </div>

          <ul
            ref={menuRef}
            className={`transition-all duration-300 ${
              isOpen ? 'block' : 'hidden'
            } lg:flex flex-col lg:flex-row items-center`}
          >
            {menuItems.map((item) => (
              <li key={item.link} className="lg:mx-4 mt-4 lg:mt-0 font-medium">
                <Link to={item.link} className="hover:text-neongreen-hover">
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="lg:mx-4 mt-4 lg:mt-0 font-medium">
              <Link to="/login" className="hover:text-neongreen-hover">
                Entrar
              </Link>
            </li>
            <li className="mt-4 lg:mt-0">
              <div
                className="w-10 h-10 bg-gray-400 rounded-full"
                title="Foto do usuário"
              ></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
