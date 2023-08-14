import { Route, Routes } from 'react-router-dom';
import { Login } from '../views/login/index';

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}
