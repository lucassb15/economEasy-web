import { BrowserRouter } from 'react-router-dom'
import { Router } from './router/Router'
import { AuthProvider } from './contexts/AuthContext'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeContext from '@contexts/ThemeContext'
import React from 'react'
import { PaletteMode } from '@mui/material'
import { neutral } from 'tailwindcss/colors'

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: neutral,
          divider: 'rgba(0, 0, 0, 0.12)',
          text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
          },
        }
      : {
          // palette values for dark mode
          primary: neutral,
          divider: 'rgba(255, 255, 255, 0.12)',
          button: {
            active: '#fff',
            hover: 'rgba(255, 255, 255, 0.08)',
            selected: 'rgba(255, 255, 255, 0.16)',
          },
          background: {
            default: '#121212',
            paper: '#121212',
          },
          text: {
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
          },
          overrides:
            mode === 'dark'
              ? {
                  MuiInput: {
                    input: {
                      color: 'rgba(0, 0, 0, 0.87)', // Cor que você quer para o texto no modo escuro
                    },
                  },
                  MuiTextField: {
                    input: {
                      color: 'rgba(0, 0, 0, 0.87)', // Cor que você quer para o texto no modo escuro
                    },
                  },
                }
              : {},
        }),
  },
})

export function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ mode, toggleMode }}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
            <Router />
            <Toaster containerClassName="z-50" />
          </AuthProvider>
        </BrowserRouter>
      </ThemeContext.Provider>
    </ThemeProvider>
  )
}
