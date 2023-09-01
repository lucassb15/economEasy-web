// ThemeContext.tsx
import * as React from 'react'

const ThemeContext = React.createContext({
  mode: 'light',
  toggleMode: () => {},
})

export default ThemeContext
