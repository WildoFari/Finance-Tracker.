import './App.css';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import BudgetAlerts from './components/BudgetAlerts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Ingresos from './pages/Ingresos';
import Egresos from './pages/Egresos';
import Graficos from './pages/Graficos';
import Inversiones from './pages/Inversiones';
import Presupuestos from './pages/Presupuestos';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <BudgetAlerts />
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/ingresos" element={<Ingresos />} />
        <Route path="/egresos" element={<Egresos />} />
        <Route path="/graficos" element={<Graficos />} />
        <Route path="/Inversiones" element={<Inversiones />} />
        <Route path="/presupuestos" element={<Presupuestos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;