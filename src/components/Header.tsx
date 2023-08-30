import { SignOut } from '@phosphor-icons/react'
import { useContext } from 'react'

import { AuthContext } from '../contexts/AuthContext'

interface FormHeaderProps {
  title: string
}

export function Header({ title }: FormHeaderProps) {
  const { user, signOut } = useContext(AuthContext)

  function handleSignOut() {
    signOut()
  }

  return (
    <div className="flex h-20 w-full items-center justify-between">
      <div className="flex h-full flex-1 items-center justify-between border-b-2 px-5 md:px-28">
        <span className="font-title text-xl font-semibold">{title}</span>
        {!user ? (
          <span className="font-medium">Entrar</span>
        ) : (
          <div className="flex items-center gap-4">
            <span className="font-medium">{user.name}</span>
            <button onClick={handleSignOut}>
              <SignOut size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
