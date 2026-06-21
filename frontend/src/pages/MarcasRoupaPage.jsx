import { useEffect, useState } from 'react';
import api from '../services/api';

const initialForm = { nome: '', paisOrigem: '', categoria: '', anoFundacao: '' };

export default function MarcasRoupaPage() {
  const [marcas, setMarcas] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadMarcas();
  }, []);

  async function loadMarcas() {
    try {
      const response = await api.get('/marcas-roupa');
      setMarcas(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar marcas de roupa');
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
      paisOrigem: form.paisOrigem || undefined,
      categoria: form.categoria || undefined,
      anoFundacao: form.anoFundacao ? Number(form.anoFundacao) : undefined
    };

    try {
      if (selectedId) {
        await api.put(`/marcas-roupa/${selectedId}`, payload);
        setMessage('Marca atualizada com sucesso');
      } else {
        await api.post('/marcas-roupa', payload);
        setMessage('Marca criada com sucesso');
      }
      setForm(initialForm);
      setSelectedId(null);
      loadMarcas();
    } catch (err) {
      setError(err.response?.data?.message || 'Falha ao salvar marca');
    }
  }

  function handleEdit(marca) {
    setSelectedId(marca.id);
    setForm({
      nome: marca.nome || '',
      paisOrigem: marca.paisOrigem || '',
      categoria: marca.categoria || '',
      anoFundacao: marca.anoFundacao?.toString() || ''
    });
    setMessage('');
    setError('');
  }

  async function handleDelete(id) {
    if (!window.confirm('Remover marca?')) return;
    try {
      await api.delete(`/marcas-roupa/${id}`);
      setMessage('Marca removida com sucesso');
      loadMarcas();
    } catch (err) {
      setError(err.response?.data?.message || 'Falha ao remover marca');
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-white">Marcas de Roupa</h1>
              <p className="mt-2 text-slate-400">Gerencie marcas de roupa com cadastro e edição seguros.</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 px-4 py-3 text-sm font-semibold text-cyan-300">
              Registros: {marcas.length}
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
          <section className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
            <h2 className="text-xl font-semibold text-white">Formulário de marca</h2>
            <p className="mt-2 text-slate-400">Preencha os campos e salve sua marca de roupa.</p>
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
                <label className="block text-sm font-medium text-slate-300">País de Origem</label>
                <input
                  name="paisOrigem"
                  value={form.paisOrigem}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-300">Categoria</label>
                  <input
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Ano Fundação</label>
                  <input
                    name="anoFundacao"
                    type="number"
                    value={form.anoFundacao}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl bg-cyan-600 px-4 py-3 text-white transition hover:bg-cyan-500"
              >
                {selectedId ? 'Atualizar marca' : 'Criar marca'}
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
              <p>Marcas são criadas e atualizadas em tempo real via API.</p>
              <p>A tabela abaixo mostra todos os registros atuais.</p>
            </div>
          </section>
        </div>

        <section className="overflow-x-auto rounded-[2rem] border border-slate-800 bg-slate-900/90 shadow-2xl shadow-slate-950/20">
          <table className="min-w-full divide-y divide-slate-800 text-sm text-slate-200">
            <thead className="bg-slate-950/90 text-slate-300">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Nome</th>
                <th className="px-4 py-3 text-left font-semibold">País de Origem</th>
                <th className="px-4 py-3 text-left font-semibold">Categoria</th>
                <th className="px-4 py-3 text-left font-semibold">Ano Fundação</th>
                <th className="px-4 py-3 text-right font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-950/80">
              {marcas.map((marca) => (
                <tr key={marca.id} className="transition hover:bg-slate-900/80">
                  <td className="px-4 py-4">{marca.nome}</td>
                  <td className="px-4 py-4">{marca.paisOrigem || '-'}</td>
                  <td className="px-4 py-4">{marca.categoria || '-'}</td>
                  <td className="px-4 py-4">{marca.anoFundacao || '-'}</td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => handleEdit(marca)}
                      className="mr-3 rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-200 transition hover:bg-cyan-500/20"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(marca.id)}
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
