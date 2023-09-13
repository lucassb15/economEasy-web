import { Button as ChakraButton } from '@chakra-ui/react'

interface ButtonProps {
  ButtonTitle?: string
  icon?: JSX.Element
  onClick?: () => void
}

export function ButtonHeader({ ButtonTitle, icon, onClick }: ButtonProps) {
  return (
    <ChakraButton
      type="submit"
      onClick={onClick}
      bg="#0E2A56"
      color="white"
      _hover={{ bg: '#0E2A56' }}
      _dark={{
        _hover: { bg: '#133873' },
      }}
      py={2}
      px={4}
      borderRadius="md"
      alignItems="center"
      gap={1}
    >
      {icon && icon}
      {ButtonTitle && <span>{ButtonTitle}</span>}
    </ChakraButton>
  )
}
