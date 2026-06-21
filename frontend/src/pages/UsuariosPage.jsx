import { useEffect, useState } from 'react';
import api from '../services/api';

const initialForm = { nome: '', email: '', senha: '', role: 'USER' };

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsuarios();
  }, []);

  async function loadUsuarios() {
    try {
      const response = await api.get('/usuarios');
      setUsuarios(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar usuários');
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((old) => ({ ...old, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');

    const payload = {
      nome: form.nome,
      email: form.email,
      role: form.role
    };

    if (form.senha?.trim()) {
      payload.senha = form.senha;
    }

    try {
      if (selectedId) {
        await api.put(`/usuarios/${selectedId}`, payload);
        setMessage('Usuário atualizado com sucesso');
      } else {
        await api.post('/usuarios', { ...payload, senha: form.senha });
        setMessage('Usuário criado com sucesso');
      }
      setForm(initialForm);
      setSelectedId(null);
      loadUsuarios();
    } catch (err) {
      setError(err.response?.data?.message || 'Falha ao salvar usuário');
    }
  }

  function handleEdit(usuario) {
    setSelectedId(usuario.id);
    setForm({ nome: usuario.nome, email: usuario.email, senha: '', role: usuario.role || 'USER' });
    setMessage('');
    setError('');
  }

  async function handleDelete(id) {
    if (!window.confirm('Remover usuário?')) return;
    try {
      await api.delete(`/usuarios/${id}`);
      setMessage('Usuário removido com sucesso');
      loadUsuarios();
    } catch (err) {
      setError(err.response?.data?.message || 'Falha ao remover usuário');
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-white">Usuários</h1>
              <p className="mt-2 text-slate-400">Gerencie usuários com controle de acesso e rotas protegidas.</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 px-4 py-3 text-sm font-semibold text-cyan-300">
              Usuários cadastrados: {usuarios.length}
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
          <section className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
            <h2 className="text-xl font-semibold text-white">Formulário</h2>
            <p className="mt-2 text-slate-400">Crie ou atualize um usuário com dados válidos.</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300">Nome</label>
                <input
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">Senha</label>
                <input
                  name="senha"
                  type="password"
                  value={form.senha}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl bg-cyan-600 px-4 py-3 text-white transition hover:bg-cyan-500"
              >
                {selectedId ? 'Atualizar usuário' : 'Criar usuário'}
              </button>
              {selectedId && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(null);
                    setForm(initialForm);
                    setMessage('');
                    setError('');
                  }}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-200 transition hover:bg-slate-800"
                >
                  Cancelar edição
                </button>
              )}
            </form>
          </section>

          <section className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
            <h2 className="text-xl font-semibold text-white">Status</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              {message && <p className="rounded-2xl bg-emerald-500/10 p-4 text-emerald-300">{message}</p>}
              {error && <p className="rounded-2xl bg-rose-500/10 p-4 text-rose-300">{error}</p>}
              <p>Use o formulário para criar usuários ou editar registros existentes.</p>
              <p>Usuários com função ADMIN podem excluir outros registros.</p>
            </div>
          </section>
        </div>

        <section className="overflow-x-auto rounded-[2rem] border border-slate-800 bg-slate-900/90 shadow-2xl shadow-slate-950/20">
          <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
            <thead className="bg-slate-950/90 text-slate-300">
              <tr>
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">Nome</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 text-right font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-950/80">
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="transition hover:bg-slate-800/80">
                  <td className="px-4 py-4 text-slate-200">{usuario.id}</td>
                  <td className="px-4 py-4 text-slate-200">{usuario.nome}</td>
                  <td className="px-4 py-4 text-slate-200">{usuario.email}</td>
                  <td className="px-4 py-4 text-slate-200">{usuario.role}</td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => handleEdit(usuario)}
                      className="mr-3 rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-200 transition hover:bg-cyan-500/20"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(usuario.id)}
                      className="rounded-full bg-rose-500/10 px-3 py-1 text-rose-200 transition hover:bg-rose-500/20"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
