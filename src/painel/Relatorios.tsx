import { SquarePen } from 'lucide-react'
import { cardapios, eventos } from '../services/db'
import { useRepo } from '../services/repo'
import { MESES, brl } from '../services/format'

export default function Relatorios() {
  const evs = useRepo(eventos)
  const cards = useRepo(cardapios)
  const ano = new Date().getFullYear()

  const ativos = evs.filter((e) => e.status !== 'Cancelado')
  const estimado = (e: (typeof evs)[number]) => e.convidados * (cards.find((c) => c.id === e.cardapioId)?.precoPorPessoa ?? 0)
  const receita = ativos.filter((e) => e.status === 'Confirmado' || e.status === 'Realizado').reduce((s, e) => s + estimado(e), 0)
  const emAberto = ativos.filter((e) => e.status === 'Orçamento').reduce((s, e) => s + estimado(e), 0)

  const porMes = MESES.map((_, m) => ativos.filter((e) => e.data.startsWith(`${ano}-${String(m + 1).padStart(2, '0')}`)).length)
  const max = Math.max(1, ...porMes)

  return (
    <div>
      <h1 className="p-title">Relatórios <SquarePen size={22} /></h1>
      <div className="stats">
        <div className="stat"><b>{evs.length}</b><span>Eventos cadastrados</span></div>
        <div className="stat"><b>{evs.filter((e) => e.status === 'Confirmado').length}</b><span>Confirmados</span></div>
        <div className="stat"><b>{brl(receita)}</b><span>Estimativa confirmada + realizada</span></div>
        <div className="stat"><b>{brl(emAberto)}</b><span>Estimativa em orçamento</span></div>
      </div>
      <h3 style={{ fontWeight: 400 }}>Eventos por mês em {ano}</h3>
      <div className="bars" role="img" aria-label={`Eventos por mês em ${ano}`}>
        {porMes.map((n, i) => (
          <div className="bar" key={i}>
            {n > 0 && <span>{n}</span>}
            <i style={{ height: `${(n / max) * 80}%` }} />
            <span>{MESES[i].slice(0, 3)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
