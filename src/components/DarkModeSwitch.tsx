import { IconButton, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      aria-label="Toggle Dark Mode"
      icon={
        colorMode === 'light' ? (
          <MoonIcon boxSize={5} />
        ) : (
          <SunIcon boxSize={5} />
        )
      }
      onClick={toggleColorMode}
      variant="ghost"
      color="gray.100"
    />
  )
}

export default DarkModeSwitch
