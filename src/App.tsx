import { BrowserRouter } from 'react-router-dom';
import { Router } from './controllers/Router';

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
