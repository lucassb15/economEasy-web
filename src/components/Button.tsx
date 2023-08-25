import { useState } from 'react'
import { Navigate } from 'react-router-dom'

interface ButtonProps {
  ButtonTitle: string
  to: string
}

export function Button({ ButtonTitle, to }: ButtonProps) {
  const [shouldNavigate, setShouldNavigate] = useState(false)

  const handleClick = () => {
    setShouldNavigate(true)
  }

  if (shouldNavigate) {
    return <Navigate to={to} />
  }

  return (
    <button
      type="submit"
      onClick={handleClick}
      className="bg-darkblue hover:bg-darkblue-hover text-white font-bold text-sm md:text-base py-2 md:py-3 px-4 rounded shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {ButtonTitle}
    </button>
  )
}
