import { useState } from 'react'
import { Bell } from 'lucide-react'
import { notificacoes } from '../services/db'
import { useRepo } from '../services/repo'
import { dataHoraBR } from '../services/format'

export default function Home() {
  const lista = useRepo(notificacoes)
  const [aberta, setAberta] = useState<string | null>(null)
  const ordenadas = [...lista].sort((a, b) => b.criadaEm.localeCompare(a.criadaEm))

  const abrir = (id: string) => {
    setAberta((a) => (a === id ? null : id))
    notificacoes.update(id, { lida: true })
  }

  return (
    <div className="p-center" style={{ paddingTop: '4rem' }}>
      <h1 className="p-title" style={{ fontSize: '2rem' }}>Bem-vindo</h1>
      <h2 className="p-title" style={{ fontSize: '1.5rem' }}>Notificações <Bell size={22} /></h2>
      <div className="panel-card" style={{ maxWidth: 620, margin: '0 auto' }}>
        {ordenadas.length === 0 && <p className="empty">Nenhuma notificação por enquanto.</p>}
        {ordenadas.map((n) => (
          <div key={n.id}>
            <button className={`note ${n.lida ? '' : 'unread'}`} onClick={() => abrir(n.id)} aria-expanded={aberta === n.id}>
              <span className={`led ${n.tipo}`} aria-hidden />
              <span className="txt">{n.resumo}</span>
            </button>
            {aberta === n.id && (
              <div className="note-detail">
                {n.detalhe}
                <div className="row"><small style={{ color: 'var(--p-muted)' }}>{dataHoraBR(n.criadaEm)}</small></div>
                <div className="row">
                  <button className="pbtn danger" onClick={() => { notificacoes.remove(n.id); setAberta(null) }}>Descartar</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
