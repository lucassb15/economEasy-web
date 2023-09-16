import React, {
  ChangeEvent,
  ReactNode,
  useState,
  ForwardRefRenderFunction,
} from 'react'
import { FieldError } from 'react-hook-form'
import { Eye, EyeSlash } from '@phosphor-icons/react'

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const borderStyle = error
    ? 'border-red-300'
    : isFocused
    ? 'border-blue-400'
    : 'border-gray-300'

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
  }

  return (
    <div>
      <div
        className={`flex items-center rounded-sm transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 border-2 ${borderStyle} w-full`}
      >
        <div
          className={`text-gray-500 px-2 py-3 bg-white border-r-2 transition-all duration-300 ease-in-out dark:bg-gray-800 dark:text-white ${borderStyle} flex items-center justify-center`}
        >
          {icon}
        </div>
        <input
          ref={ref}
          className={`h-full w-full bg-white px-4 py-3 text-gray-600 placeholder-gray-400 focus:outline-none ${
            color || 'text-black dark:text-white'
          }`}
          type={
            type === 'password' && !isPasswordVisible
              ? 'password'
              : type !== 'file'
              ? 'text'
              : 'file'
          }
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          {...rest}
        />
        {type === 'password' && (
          <div
            className="pr-4 py-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <EyeSlash size={24} color="black" />
            ) : (
              <Eye size={24} color="black" />
            )}
          </div>
        )}
      </div>
      {!!error && <span className="text-red-500">{error.message}</span>}
    </div>
  )
}

export const Input = React.forwardRef(InputBase)
