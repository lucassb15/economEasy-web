import { Route, Routes } from 'react-router-dom';
import { Login } from '../views/authentication/login/index';
import { Register } from '../views/authentication/register'
import { RegisterCompany } from '../views/authentication/company';
export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/company" element={<RegisterCompany />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}
