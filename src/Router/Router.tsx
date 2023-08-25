import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { SignIn } from '../views/signin'
import { Register } from '../views/authentication/register'
import { RegisterCompany } from '../views/authentication/company'
export function Router() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/company" element={<RegisterCompany />} />
      <Route path="*" element={<div>Not Found</div>} />
      <Route
        path="/accommodations"
        element={
          <ProtectedRoute>
            <RegisterCompany />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
