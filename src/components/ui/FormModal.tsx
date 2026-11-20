import { useState, type FormEvent } from 'react'
import Modal from './Modal'

export interface Campo {
  nome: string
  rotulo: string
  tipo?: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'email' | 'tel'
  opcoes?: () => { valor: string; rotulo: string }[]
  obrigatorio?: boolean
}

type Valores = Record<string, string | number>

export default function FormModal({ titulo, campos, inicial, onSalvar, onClose }: {
  titulo: string
  campos: Campo[]
  inicial: Valores
  onSalvar: (v: Valores) => void
  onClose: () => void
}) {
  const [v, setV] = useState<Valores>(inicial)
  const [erro, setErro] = useState('')

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    const falta = campos.find((c) => c.obrigatorio && String(v[c.nome] ?? '').trim() === '')
    if (falta) return setErro(`Preencha o campo “${falta.rotulo}”.`)
    onSalvar(v)
  }

  return (
    <Modal titulo={titulo} onClose={onClose}>
      <form onSubmit={enviar} noValidate>
        {campos.map((c) => {
          const id = `f-${c.nome}`
          const valor = v[c.nome] ?? ''
          const onChange = (val: string) => setV((s) => ({ ...s, [c.nome]: c.tipo === 'number' ? Number(val) : val }))
          return (
            <div className="pfield" key={c.nome}>
              <label htmlFor={id}>{c.rotulo}{c.obrigatorio ? ' *' : ''}</label>
              {c.tipo === 'select' ? (
                <select id={id} value={valor} onChange={(e) => onChange(e.target.value)}>
                  {(c.opcoes?.() ?? []).map((o) => <option key={o.valor} value={o.valor}>{o.rotulo}</option>)}
                </select>
              ) : c.tipo === 'textarea' ? (
                <textarea id={id} value={valor} onChange={(e) => onChange(e.target.value)} />
              ) : (
                <input id={id} type={c.tipo ?? 'text'} value={valor} min={c.tipo === 'number' ? 0 : undefined} onChange={(e) => onChange(e.target.value)} />
              )}
            </div>
          )
        })}
        {erro && <p className="form-error" role="alert" style={{ color: '#ff9a9a' }}>{erro}</p>}
        <div className="modal-actions">
          <button type="button" className="pbtn" onClick={onClose}>Cancelar</button>
          <button type="submit" className="pbtn primary">Salvar</button>
        </div>
      </form>
    </Modal>
  )
}
