import { ClipboardList } from 'lucide-react'
import { clientes, eventos, notificacoes } from '../services/db'
import { useRepo } from '../services/repo'
import { dataBR, hojeISO } from '../services/format'

export default function Listas() {
  const evs = useRepo(eventos)
  const cls = useRepo(clientes)
  const notas = useRepo(notificacoes)
  const hoje = hojeISO()

  const proximos = evs.filter((e) => e.data >= hoje && e.status !== 'Cancelado').sort((a, b) => a.data.localeCompare(b.data))
  const orcamentos = notas.filter((n) => n.tipo === 'orcamento')
  const pendentes = cls.filter((c) => c.status === 'Pendente')

  return (
    <div>
      <h1 className="p-title">Listas <ClipboardList size={22} /></h1>
      <div className="sections">
        <section>
          <h3>Próximos eventos</h3>
          <div className="panel-card">
            {proximos.length === 0 && <p className="empty">Nenhum evento futuro.</p>}
            {proximos.map((e) => (
              <div className="line" key={e.id}><span>{e.nome}</span><small>{dataBR(e.data)} · {e.status}</small></div>
            ))}
          </div>
        </section>
        <section>
          <h3>Pedidos de orçamento</h3>
          <div className="panel-card">
            {orcamentos.length === 0 && <p className="empty">Nenhum pedido recebido.</p>}
            {orcamentos.map((n) => (
              <div className="line" key={n.id}><span>{n.resumo}</span><small>{n.lida ? 'Lido' : 'Novo'}</small></div>
            ))}
          </div>
        </section>
        <section>
          <h3>Cadastros pendentes</h3>
          <div className="panel-card">
            {pendentes.length === 0 && <p className="empty">Nenhum cadastro pendente.</p>}
            {pendentes.map((c) => (
              <div className="line" key={c.id}><span>{c.nome}</span><small>{c.contato}</small></div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
