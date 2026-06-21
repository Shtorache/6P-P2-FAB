import { Link } from 'react-router-dom';

const stats = [
  { title: 'Usuários', description: 'Gerencie perfis e permissões.', badge: '3 itens' },
  { title: 'Carros', description: 'Cadastre e atualize veículos.', badge: '3 itens' },
  { title: 'Motos', description: 'Controle motos com facilidade.', badge: '3 itens' },
  { title: 'Marcas', description: 'Administre marcas de roupa.', badge: '3 itens' }
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-10 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Painel central
              </span>
              <h1 className="mt-6 text-4xl font-semibold text-white">Bem-vindo ao dashboard do P2</h1>
              <p className="mt-4 max-w-2xl text-slate-300 leading-7">
                Utilize a aplicação para acessar rotas protegidas, visualizar e gerenciar dados diretamente no backend.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-3xl bg-slate-950/90 p-5 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Integração</p>
                <p className="mt-3 text-2xl font-semibold text-white">API completa</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Entrega</p>
                <p className="mt-3 text-2xl font-semibold text-white">Docker Compose</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-2 text-slate-400">{item.description}</p>
                </div>
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  {item.badge}
                </span>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <Link
            to="/usuarios"
            className="rounded-[1.75rem] border border-cyan-500/10 bg-cyan-500/10 p-6 text-left transition hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-500/15"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Usuários</p>
            <p className="mt-4 text-2xl font-semibold text-white">Gerenciar usuários</p>
          </Link>
          <Link
            to="/carros"
            className="rounded-[1.75rem] border border-cyan-500/10 bg-cyan-500/10 p-6 text-left transition hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-500/15"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Carros</p>
            <p className="mt-4 text-2xl font-semibold text-white">Gerenciar carros</p>
          </Link>
          <Link
            to="/motos"
            className="rounded-[1.75rem] border border-cyan-500/10 bg-cyan-500/10 p-6 text-left transition hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-500/15"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Motos</p>
            <p className="mt-4 text-2xl font-semibold text-white">Gerenciar motos</p>
          </Link>
          <Link
            to="/marcas-roupa"
            className="rounded-[1.75rem] border border-cyan-500/10 bg-cyan-500/10 p-6 text-left transition hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-500/15"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Marcas</p>
            <p className="mt-4 text-2xl font-semibold text-white">Gerenciar marcas</p>
          </Link>
        </section>
      </div>
    </div>
  );
}
