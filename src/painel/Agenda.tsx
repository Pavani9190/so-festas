import { useMemo, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import Modal from '../components/ui/Modal'
import FormModal from '../components/ui/FormModal'
import { camposEvento, eventoVazio } from './config'
import { clientes, eventos, registrar } from '../services/db'
import { useRepo } from '../services/repo'
import { MESES, hojeISO } from '../services/format'
import type { Evento } from '../data/types'

const SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const p2 = (n: number) => String(n).padStart(2, '0')

export default function Agenda() {
  const todos = useRepo(eventos)
  useRepo(clientes)
  const [ano, setAno] = useState(new Date().getFullYear())
  const [dia, setDia] = useState<string | null>(null)
  const [novo, setNovo] = useState<string | null>(null)
  const hoje = hojeISO()

  const porData = useMemo(() => {
    const m = new Map<string, Evento[]>()
    todos.forEach((e) => m.set(e.data, [...(m.get(e.data) ?? []), e]))
    return m
  }, [todos])

  const salvar = (v: Record<string, string | number>) => {
    const criado = eventos.create(v as unknown as Omit<Evento, 'id'>)
    registrar('Criou', 'Evento', criado.nome)
    setNovo(null)
    setDia(criado.data)
  }

  const doDia = dia ? porData.get(dia) ?? [] : []

  return (
    <div>
      <h1 className="p-title">Agenda <CalendarDays size={22} /></h1>
      <div className="year-bar">
        <button className="icon-btn" onClick={() => setAno((a) => a - 1)} aria-label="Ano anterior"><ChevronLeft /></button>
        <strong style={{ fontSize: '1.2rem', fontWeight: 500 }}>{ano}</strong>
        <button className="icon-btn" onClick={() => setAno((a) => a + 1)} aria-label="Próximo ano"><ChevronRight /></button>
      </div>
      <div className="year-grid">
        {MESES.map((nome, m) => {
          const primeiro = new Date(ano, m, 1).getDay()
          const total = new Date(ano, m + 1, 0).getDate()
          return (
            <section className="month" key={nome}>
              <h3>{nome}</h3>
              <div className="month-grid">
                {SEMANA.map((d, i) => <span className="wd" key={i}>{d}</span>)}
                {Array.from({ length: primeiro }, (_, i) => <span key={`v${i}`} />)}
                {Array.from({ length: total }, (_, i) => {
                  const iso = `${ano}-${p2(m + 1)}-${p2(i + 1)}`
                  const evs = (porData.get(iso) ?? []).filter((e) => e.status !== 'Cancelado')
                  return (
                    <button
                      key={iso}
                      className={`day ${evs.length ? 'has' : ''} ${iso === hoje ? 'today' : ''}`}
                      onClick={() => setDia(iso)}
                      aria-label={`${i + 1} de ${nome}${evs.length ? `, ${evs.length} evento(s)` : ''}`}
                    >
                      {i + 1}
                    </button>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      {dia && !novo && (
        <Modal titulo={dia.split('-').reverse().join('/')} onClose={() => setDia(null)}>
          {doDia.length === 0 && <p className="empty" style={{ padding: '1rem 0' }}>Nenhum evento neste dia.</p>}
          {doDia.map((e) => (
            <div className="ev-line" key={e.id}>
              <div>
                <strong style={{ fontWeight: 500 }}>{e.nome}</strong>
                <div style={{ color: 'var(--p-muted)', fontSize: '.85rem' }}>
                  {clientes.get(e.clienteId)?.nome ?? 'Cliente removido'} · {e.local || 'Local a definir'} · {e.convidados} convidados
                </div>
              </div>
              <span className={`tag ${e.status}`}>{e.status}</span>
            </div>
          ))}
          <div className="modal-actions">
            <button className="pbtn primary" onClick={() => setNovo(dia)}><Plus size={16} /> Novo evento neste dia</button>
          </div>
        </Modal>
      )}
      {novo && (
        <FormModal
          titulo="Novo evento"
          campos={camposEvento}
          inicial={{ ...eventoVazio(), data: novo }}
          onSalvar={salvar}
          onClose={() => setNovo(null)}
        />
      )}
    </div>
  )
}
