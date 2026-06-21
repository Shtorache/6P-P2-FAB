import { useEffect, useState } from 'react';
import api from '../services/api';

const initialForm = { marca: '', modelo: '', ano: '', cor: '', preco: '' };

export default function CarrosPage() {
  const [carros, setCarros] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadCarros();
  }, []);

  async function loadCarros() {
    try {
      const response = await api.get('/carros');
      setCarros(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar carros');
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
      ano: Number(form.ano),
      cor: form.cor || undefined,
      preco: form.preco ? Number(form.preco) : undefined
    };

    try {
      if (selectedId) {
        await api.put(`/carros/${selectedId}`, payload);
        setMessage('Carro atualizado com sucesso');
      } else {
        await api.post('/carros', payload);
        setMessage('Carro criado com sucesso');
      }
      setForm(initialForm);
      setSelectedId(null);
      loadCarros();
    } catch (err) {
      setError(err.response?.data?.message || 'Falha ao salvar carro');
    }
  }

  function handleEdit(carro) {
    setSelectedId(carro.id);
    setForm({
      marca: carro.marca || '',
      modelo: carro.modelo || '',
      ano: carro.ano?.toString() || '',
      cor: carro.cor || '',
      preco: carro.preco?.toString() || ''
    });
    setMessage('');
    setError('');
  }

  async function handleDelete(id) {
    if (!window.confirm('Remover carro?')) return;
    try {
      await api.delete(`/carros/${id}`);
      setMessage('Carro removido com sucesso');
      loadCarros();
    } catch (err) {
      setError(err.response?.data?.message || 'Falha ao remover carro');
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-white">Carros</h1>
              <p className="mt-2 text-slate-400">Cadastre, edite e remova carros com integração total ao backend.</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 px-4 py-3 text-sm font-semibold text-cyan-300">
              Registros: {carros.length}
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
          <section className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
            <h2 className="text-xl font-semibold text-white">Formulário de carro</h2>
            <p className="mt-2 text-slate-400">Preencha os dados e envie para o backend.</p>
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
                <div>
                  <label className="block text-sm font-medium text-slate-300">Cor</label>
                  <input
                    name="cor"
                    value={form.cor}
                    onChange={handleChange}
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
                {selectedId ? 'Atualizar carro' : 'Criar carro'}
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
              <p>Use a lista abaixo para editar ou excluir carros existentes.</p>
              <p>Os dados são enviados diretamente à API com autenticação JWT.</p>
            </div>
          </section>
        </div>

        <section className="overflow-x-auto rounded-[2rem] border border-slate-800 bg-slate-900/90 shadow-2xl shadow-slate-950/20">
          <table className="min-w-full divide-y divide-slate-800 text-sm text-slate-200">
            <thead className="bg-slate-950/90 text-slate-300">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Marca</th>
                <th className="px-4 py-3 text-left font-semibold">Modelo</th>
                <th className="px-4 py-3 text-left font-semibold">Ano</th>
                <th className="px-4 py-3 text-left font-semibold">Cor</th>
                <th className="px-4 py-3 text-left font-semibold">Preço</th>
                <th className="px-4 py-3 text-right font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-950/80">
              {carros.map((carro) => (
                <tr key={carro.id} className="transition hover:bg-slate-900/80">
                  <td className="px-4 py-4">{carro.marca}</td>
                  <td className="px-4 py-4">{carro.modelo}</td>
                  <td className="px-4 py-4">{carro.ano}</td>
                  <td className="px-4 py-4">{carro.cor || '-'}</td>
                  <td className="px-4 py-4">{carro.preco != null ? carro.preco : '-'}</td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => handleEdit(carro)}
                      className="mr-3 rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-200 transition hover:bg-cyan-500/20"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(carro.id)}
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
