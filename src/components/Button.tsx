interface ButtonProps {
  ButtonTitle?: string
  icon?: JSX.Element
  onClick?: () => void
}

export function Button({ ButtonTitle, icon, onClick }: ButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="bg-darkblue hover:bg-darkblue-hover text-white font-bold text-sm md:text-base py-2 md:py-3 px-4 rounded shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {icon && icon}
      {ButtonTitle}
    </button>
  )
}
