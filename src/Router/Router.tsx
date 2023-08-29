import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { SignIn } from '../views/signin'
import { RegisterUser } from '../views/authentication/user'
import { RegisterCompany } from '../views/authentication/company'
import { Home } from '../views/userView/user'
import { Dashboard } from '../views/companyView/owner'
import { PrivateRoute } from '../components/PrivateRoute'
export function Router() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register/user" element={<RegisterUser />} />
      <Route path="/register/company" element={<RegisterCompany />} />
      <Route path="*" element={<div>Not Found</div>} />
      <Route
        path="/company/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
