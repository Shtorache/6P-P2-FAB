import { useEffect, useState } from 'react';
import api from '../services/api';

const initialForm = { marca: '', modelo: '', cilindradas: '', ano: '', preco: '' };

export default function MotosPage() {
  const [motos, setMotos] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadMotos();
  }, []);

  async function loadMotos() {
    try {
      const response = await api.get('/motos');
      setMotos(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar motos');
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
      marca: form.marca,
      modelo: form.modelo,
      cilindradas: Number(form.cilindradas),
      ano: Number(form.ano),
      preco: form.preco ? Number(form.preco) : undefined
    };

    try {
      if (selectedId) {
        await api.put(`/motos/${selectedId}`, payload);
        setMessage('Moto atualizada com sucesso');
      } else {
        await api.post('/motos', payload);
        setMessage('Moto criada com sucesso');
      }
      setForm(initialForm);
      setSelectedId(null);
      loadMotos();
    } catch (err) {
      setError(err.response?.data?.message || 'Falha ao salvar moto');
    }
  }

  function handleEdit(moto) {
    setSelectedId(moto._id || moto.id);
    setForm({
      marca: moto.marca || '',
      modelo: moto.modelo || '',
      cilindradas: moto.cilindradas?.toString() || '',
      ano: moto.ano?.toString() || '',
      preco: moto.preco?.toString() || ''
    });
    setMessage('');
    setError('');
  }

  async function handleDelete(id) {
    if (!window.confirm('Remover moto?')) return;
    try {
      await api.delete(`/motos/${id}`);
      setMessage('Moto removida com sucesso');
      loadMotos();
    } catch (err) {
      setError(err.response?.data?.message || 'Falha ao remover moto');
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-white">Motos</h1>
              <p className="mt-2 text-slate-400">Cadastre, edite e remova motos com integração direta à API.</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 px-4 py-3 text-sm font-semibold text-cyan-300">
              Registros: {motos.length}
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
          <section className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
            <h2 className="text-xl font-semibold text-white">Formulário de moto</h2>
            <p className="mt-2 text-slate-400">Preencha os dados e envie ou edite registros existentes.</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300">Marca</label>
                <input
                  name="marca"
                  value={form.marca}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">Modelo</label>
                <input
                  name="modelo"
                  value={form.modelo}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-300">Cilindradas</label>
                  <input
                    name="cilindradas"
                    type="number"
                    value={form.cilindradas}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Ano</label>
                  <input
                    name="ano"
                    type="number"
                    value={form.ano}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">Preço</label>
                <input
                  name="preco"
                  type="number"
                  value={form.preco}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl bg-cyan-600 px-4 py-3 text-white transition hover:bg-cyan-500"
              >
                {selectedId ? 'Atualizar moto' : 'Criar moto'}
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
            <div className="mt-4 space-y-3 text-slate-300 text-sm">
              {message && <p className="rounded-2xl bg-emerald-500/10 p-4 text-emerald-300">{message}</p>}
              {error && <p className="rounded-2xl bg-rose-500/10 p-4 text-rose-300">{error}</p>}
              <p>Registro e edição de motos com autenticação JWT.</p>
              <p>Use a tabela para abrir o modo edição ou deletar um registro.</p>
            </div>
          </section>
        </div>

        <section className="overflow-x-auto rounded-[2rem] border border-slate-800 bg-slate-900/90 shadow-2xl shadow-slate-950/20">
          <table className="min-w-full divide-y divide-slate-800 text-sm text-slate-200">
            <thead className="bg-slate-950/90 text-slate-300">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Marca</th>
                <th className="px-4 py-3 text-left font-semibold">Modelo</th>
                <th className="px-4 py-3 text-left font-semibold">Cilindradas</th>
                <th className="px-4 py-3 text-left font-semibold">Ano</th>
                <th className="px-4 py-3 text-left font-semibold">Preço</th>
                <th className="px-4 py-3 text-right font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-950/80">
              {motos.map((moto) => (
                <tr key={moto._id || moto.id} className="transition hover:bg-slate-900/80">
                  <td className="px-4 py-4">{moto.marca}</td>
                  <td className="px-4 py-4">{moto.modelo}</td>
                  <td className="px-4 py-4">{moto.cilindradas}</td>
                  <td className="px-4 py-4">{moto.ano}</td>
                  <td className="px-4 py-4">{moto.preco != null ? moto.preco : '-'}</td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => handleEdit(moto)}
                      className="mr-3 rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-200 transition hover:bg-cyan-500/20"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(moto._id || moto.id)}
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
