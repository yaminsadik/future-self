import { BrowserRouter } from 'react-router-dom';
import Layout from './components/PageLayout.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter> 
  )
} 