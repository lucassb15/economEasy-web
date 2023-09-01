// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as React from 'react'
import ThemeContext from '@contexts/ThemeContext'
import IconButton from '@mui/material/IconButton'
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles'
import { Sun, Moon } from '@phosphor-icons/react'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function MyApp() {
  const theme = useTheme()
  const { toggleMode } = React.useContext(ThemeContext)

  return (
    <div
      className="gap-4 space-x-1 rounded transition duration-200 hover:bg-blue-500 text-white hover:text-white cursor-pointer"
      onClick={toggleMode}
    >
      <IconButton sx={{ ml: 1 }} color="inherit">
        {theme.palette.mode === 'dark' ? (
          <Moon color="white" weight="bold" />
        ) : (
          <Sun color="white" weight="bold" />
        )}
      </IconButton>
      <span className="">
        {' '}
        {capitalizeFirstLetter(theme.palette.mode)} mode{' '}
      </span>
    </div>
  )
}

export default function ToggleColorMode() {
  const { mode } = React.useContext(ThemeContext)

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  )

  return (
    <ThemeProvider theme={theme}>
      <MyApp />
    </ThemeProvider>
  )
}
