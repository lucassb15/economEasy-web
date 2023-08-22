import { Route, Routes } from 'react-router-dom';
import { Login } from '../views/login/index';
import { Register } from '../views/register/index'
import { RegisterCompany } from '../views/company';
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
