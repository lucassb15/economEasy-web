import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { SignIn } from '../views/signin'
import { RegisterUser } from '../views/authentication/user'
import { RegisterCompany } from '../views/authentication/company'
import { AccessDenied } from '../views/acessDenied'
export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register/user" element={<RegisterUser />} />
      <Route path="/register/company" element={<RegisterCompany />} />
      <Route path="*" element={<div>Not Found</div>} />
      <Route
        path="/accommodations"
        element={
          <ProtectedRoute>
            <AccessDenied />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
