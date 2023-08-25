import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router/Router'
import { AuthProvider } from './contexts/AuthContext'
import { Toaster } from 'react-hot-toast'

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  )
}
