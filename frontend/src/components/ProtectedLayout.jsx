import { Outlet, Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';

export default function ProtectedLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    removeToken();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-slate-950/20">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="text-xl font-semibold tracking-tight text-cyan-300">
            P2 Frontend
          </Link>
          <nav className="flex flex-wrap items-center gap-2">
            <Link
              to="/"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-cyan-500 hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              to="/usuarios"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-cyan-500 hover:text-white"
            >
              Usuários
            </Link>
            <Link
              to="/carros"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-cyan-500 hover:text-white"
            >
              Carros
            </Link>
            <Link
              to="/motos"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-cyan-500 hover:text-white"
            >
              Motos
            </Link>
            <Link
              to="/marcas-roupa"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-cyan-500 hover:text-white"
            >
              Marcas
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-full bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-400"
            >
              Sair
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
}
