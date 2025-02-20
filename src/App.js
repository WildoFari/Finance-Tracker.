import './App.css';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Ingresos from './pages/Ingresos';
import Egresos from './pages/Egresos';
import Graficos from './pages/Graficos';
import Inversiones from './pages/Inversiones';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/ingresos" element={<Ingresos />} />
        <Route path="/egresos" element={<Egresos />} />
        <Route path="/graficos" element={<Graficos />} />
        <Route path="/Inversiones" element={<Inversiones />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;