import React, {
  ChangeEvent,
  ReactNode,
  useState,
  ForwardRefRenderFunction,
} from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps {
  type?: string
  placeholder?: string
  value?: string
  setValue?: (value: string) => void
  icon?: ReactNode
  error?: FieldError
  disabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  color?: string
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    type = 'text',
    placeholder,
    value,
    setValue,
    icon,
    error,
    disabled,
    color,
    ...rest
  },
  ref,
) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue?.(e.target.value)
  }
  const [isFocused, setIsFocused] = useState(false)
  return (
    <div>
      <div
        className={`flex items-center border rounded-sm transition-colors duration-300 ${
          isFocused ? 'border-blue-300 ring-1' : 'border-gray-300'
        } bg-white dark:bg-gray-800`}
      >
        <div
          className={`text-gray-500 px-2 py-2 bg-white border-r transition-colors duration-300 dark:bg-gray-800 dark:text-white ${
            isFocused ? 'border-blue-300' : 'border-gray-300'
          }`}
        >
          {icon}
        </div>
        <input
          ref={ref}
          className={`flex-grow py-2 px-2 border-none outline-none rounded-r ${
            color || 'text-black dark:text-white'
          }`}
          type={type}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          {...rest}
        />
      </div>
      {!!error && <span className="text-red-500">{error.message}</span>}
    </div>
  )
}

export const Input = React.forwardRef(InputBase)
