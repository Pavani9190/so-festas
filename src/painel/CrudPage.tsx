import { useMemo, useState, type ReactNode } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import FormModal, { type Campo } from '../components/ui/FormModal'
import { registrar, } from '../services/db'
import { useRepo, type Repo } from '../services/repo'

export interface Coluna<T> {
  rotulo: string
  render: (item: T) => ReactNode
}

type Valores = Record<string, string | number>

export default function CrudPage<T extends { id: string }>({ titulo, icone, entidade, repo, campos, colunas, vazio, nomeDe, busca }: {
  titulo: string
  icone: ReactNode
  entidade: string
  repo: Repo<T>
  campos: Campo[]
  colunas: Coluna<T>[]
  vazio: () => Valores
  nomeDe: (item: T) => string
  busca: (item: T) => string
}) {
  const itens = useRepo(repo)
  const [q, setQ] = useState('')
  const [editando, setEditando] = useState<T | 'novo' | null>(null)

  const filtrados = useMemo(() => {
    const t = q.trim().toLowerCase()
    return t ? itens.filter((i) => busca(i).toLowerCase().includes(t)) : itens
  }, [itens, q, busca])

  const salvar = (v: Valores) => {
    if (editando === 'novo') {
      const novo = repo.create(v as unknown as Omit<T, 'id'>)
      registrar('Criou', entidade, nomeDe(novo))
    } else if (editando) {
      repo.update(editando.id, v as unknown as Partial<T>)
      registrar('Editou', entidade, nomeDe({ ...editando, ...(v as unknown as Partial<T>) }))
    }
    setEditando(null)
  }

  const excluir = (item: T) => {
    if (!window.confirm(`Excluir “${nomeDe(item)}”?`)) return
    repo.remove(item.id)
    registrar('Excluiu', entidade, nomeDe(item))
  }

  return (
    <div>
      <h1 className="p-title">{titulo} {icone}</h1>
      <div className="toolbar">
        <input className="search" placeholder="Buscar" aria-label="Buscar" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="pbtn primary" onClick={() => setEditando('novo')}><Plus size={16} /> Novo</button>
      </div>
      <div className="table-wrap">
        {filtrados.length === 0 ? (
          <p className="empty">Nada por aqui ainda. Use “Novo” para cadastrar.</p>
        ) : (
          <table>
            <thead>
              <tr>{colunas.map((c) => <th key={c.rotulo}>{c.rotulo}</th>)}<th /></tr>
            </thead>
            <tbody>
              {filtrados.map((item) => (
                <tr key={item.id}>
                  {colunas.map((c) => <td key={c.rotulo}>{c.render(item)}</td>)}
                  <td className="actions">
                    <button className="icon-btn" onClick={() => setEditando(item)} aria-label={`Editar ${nomeDe(item)}`}><Pencil size={17} /></button>
                    <button className="icon-btn" onClick={() => excluir(item)} aria-label={`Excluir ${nomeDe(item)}`}><Trash2 size={17} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {editando && (
        <FormModal
          titulo={editando === 'novo' ? `Novo cadastro: ${entidade.toLowerCase()}` : `Editar ${entidade.toLowerCase()}`}
          campos={campos}
          inicial={editando === 'novo' ? vazio() : (editando as unknown as Valores)}
          onSalvar={salvar}
          onClose={() => setEditando(null)}
        />
      )}
    </div>
  )
}
