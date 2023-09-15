import { Route, Routes } from 'react-router-dom'
import { PrivateRouteCompany } from '../components/PrivateRouteCompany'
import { PrivateRouteUser } from '../components/PrivateRouteUser'
import { SignIn } from '../views/signin'
import { RegisterUser } from '../views/authentication/user'
import { RegisterCompany } from '../views/authentication/company'
import { Home } from '../views/userView/user'
import { Dashboard } from '../views/companyView/company/dashboard'
import { Ads } from '../views/companyView/company/ads'
import { Cards } from '../views/companyView/company/cards'
import { RegisterEmployee } from '../views/companyView/company/employee'
import { PrivateRouteEmployee } from '@components/PrivateRouteEmployee'
import { Employee } from '../views/employeeView/employee'
import { NotFound } from '@components/NotFound'
export function Router() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <PrivateRouteUser>
            <Home />
          </PrivateRouteUser>
        }
      />

      <Route
        path="/company/dashboard"
        element={
          <PrivateRouteCompany>
            <Dashboard />
          </PrivateRouteCompany>
        }
      />

      <Route
        path="/company/ads"
        element={
          <PrivateRouteCompany>
            <Ads />
          </PrivateRouteCompany>
        }
      />

      <Route
        path="/company/cards"
        element={
          <PrivateRouteCompany>
            <Cards />
          </PrivateRouteCompany>
        }
      />

      <Route
        path="/company/employee"
        element={
          <PrivateRouteCompany>
            <RegisterEmployee />
          </PrivateRouteCompany>
        }
      />

      <Route
        path="/employee"
        element={
          <PrivateRouteEmployee>
            <Employee />
          </PrivateRouteEmployee>
        }
      />

      <Route path="/signin" element={<SignIn />} />
      <Route path="/register/user" element={<RegisterUser />} />
      <Route path="/register/company" element={<RegisterCompany />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
