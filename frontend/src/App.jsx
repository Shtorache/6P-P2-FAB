import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UsuariosPage from './pages/UsuariosPage';
import CarrosPage from './pages/CarrosPage';
import MotosPage from './pages/MotosPage';
import MarcasRoupaPage from './pages/MarcasRoupaPage';
import ProtectedLayout from './components/ProtectedLayout';
import { getToken } from './utils/auth';

function PrivateRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <PrivateRoute>
              <ProtectedLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="usuarios" element={<UsuariosPage />} />
          <Route path="carros" element={<CarrosPage />} />
          <Route path="motos" element={<MotosPage />} />
          <Route path="marcas-roupa" element={<MarcasRoupaPage />} />
        </Route>
      </Routes>
    </div>
  );
}
