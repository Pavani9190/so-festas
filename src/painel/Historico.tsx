import { History } from 'lucide-react'
import { historico, resetarDados } from '../services/db'
import { useRepo } from '../services/repo'
import { dataHoraBR } from '../services/format'

export default function Historico() {
  const lista = useRepo(historico)
  const ordenada = [...lista].sort((a, b) => b.quando.localeCompare(a.quando))

  return (
    <div className="p-center">
      <h1 className="p-title">Histórico <History size={22} /></h1>
      <div className="panel-card">
        {ordenada.length === 0 && <p className="empty">Nenhuma atividade registrada.</p>}
        {ordenada.map((h) => (
          <div className="line" key={h.id}>
            <span>{h.acao} {h.entidade.toLowerCase()}: {h.descricao}</span>
            <small>{dataHoraBR(h.quando)}</small>
          </div>
        ))}
      </div>
      <div className="toolbar" style={{ marginTop: '2rem', justifyContent: 'center' }}>
        <button
          className="pbtn danger"
          onClick={() => window.confirm('Voltar todos os dados para os exemplos iniciais?') && resetarDados()}
        >
          Restaurar dados de exemplo
        </button>
      </div>
    </div>
  )
}
