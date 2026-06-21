import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { setToken } from '../utils/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', { email, senha });
      setToken(response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Falha ao autenticar');
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] border border-cyan-500/10 bg-slate-900/80 p-10 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            Painel de Administração
          </span>
          <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white">Acesse o sistema com segurança</h1>
          <p className="mt-4 max-w-xl text-slate-300 leading-7">
            Faça login para gerenciar usuários, carros, motos e marcas de roupa com integração completa ao backend.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Autenticação</p>
              <p className="mt-3 text-2xl font-semibold text-white">JWT seguro</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Backend</p>
              <p className="mt-3 text-2xl font-semibold text-white">API integrada</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Docker</p>
              <p className="mt-3 text-2xl font-semibold text-white">Deploy pronto</p>
            </div>
          </div>
        </section>
        <div className="rounded-[2rem] bg-white p-10 shadow-2xl shadow-slate-950/10">
          <h1 className="text-3xl font-semibold text-slate-900 mb-4">Login</h1>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Senha</label>
              <input
                type="password"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-2xl bg-cyan-600 px-4 py-3 text-white transition hover:bg-cyan-500"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
