import { Link } from 'react-router-dom'
import { Briefcase, Contact, PartyPopper, ScrollText, Users } from 'lucide-react'
import CrudPage from './CrudPage'
import { camposCardapio, camposCliente, camposEvento, camposFuncionario, eventoVazio } from './config'
import { cardapios, clientes, eventos, funcionarios } from '../services/db'
import { useRepo } from '../services/repo'
import { brl, dataBR } from '../services/format'

export function CadastrosHub() {
  const cards = [
    { to: 'funcionarios', nome: 'Funcionários', Icone: Briefcase },
    { to: 'clientes', nome: 'Clientes', Icone: Users },
    { to: 'cardapios', nome: 'Cardápios', Icone: ScrollText },
    { to: 'eventos', nome: 'Eventos', Icone: PartyPopper },
  ]
  return (
    <div style={{ paddingTop: '5rem' }}>
      <h1 className="p-title">Cadastros <Contact size={22} /></h1>
      <div className="hub">
        {cards.map(({ to, nome, Icone }) => (
          <Link key={to} to={to}><Icone size={28} />{nome}</Link>
        ))}
      </div>
    </div>
  )
}

export function Funcionarios() {
  return (
    <CrudPage
      titulo="Funcionários" icone={<Briefcase size={22} />} entidade="Funcionário"
      repo={funcionarios} campos={camposFuncionario}
      vazio={() => ({ nome: '', cargo: '', tipo: 'Fixo', telefone: '', disponibilidade: '' })}
      nomeDe={(f) => f.nome} busca={(f) => `${f.nome} ${f.cargo}`}
      colunas={[
        { rotulo: 'Nome', render: (f) => f.nome },
        { rotulo: 'Cargo', render: (f) => f.cargo },
        { rotulo: 'Vínculo', render: (f) => f.tipo },
        { rotulo: 'Telefone', render: (f) => f.telefone },
        { rotulo: 'Disponibilidade', render: (f) => f.disponibilidade },
      ]}
    />
  )
}

export function Clientes() {
  return (
    <CrudPage
      titulo="Clientes" icone={<Users size={22} />} entidade="Cliente"
      repo={clientes} campos={camposCliente}
      vazio={() => ({ nome: '', contato: '', telefone: '', email: '', status: 'Pendente' })}
      nomeDe={(c) => c.nome} busca={(c) => `${c.nome} ${c.contato} ${c.email}`}
      colunas={[
        { rotulo: 'Nome', render: (c) => c.nome },
        { rotulo: 'Contato', render: (c) => c.contato },
        { rotulo: 'Telefone', render: (c) => c.telefone },
        { rotulo: 'E-mail', render: (c) => c.email },
        { rotulo: 'Cadastro', render: (c) => <span className={`tag ${c.status}`}>{c.status}</span> },
      ]}
    />
  )
}

export function Cardapios() {
  return (
    <CrudPage
      titulo="Cardápios" icone={<ScrollText size={22} />} entidade="Cardápio"
      repo={cardapios} campos={camposCardapio}
      vazio={() => ({ nome: '', tipo: '', precoPorPessoa: 0, itens: '' })}
      nomeDe={(c) => c.nome} busca={(c) => `${c.nome} ${c.tipo} ${c.itens}`}
      colunas={[
        { rotulo: 'Nome', render: (c) => c.nome },
        { rotulo: 'Tipo', render: (c) => c.tipo },
        { rotulo: 'Por pessoa', render: (c) => brl(c.precoPorPessoa) },
        { rotulo: 'Itens', render: (c) => c.itens },
      ]}
    />
  )
}

export function Eventos() {
  useRepo(clientes)
  return (
    <CrudPage
      titulo="Eventos" icone={<PartyPopper size={22} />} entidade="Evento"
      repo={eventos} campos={camposEvento} vazio={eventoVazio}
      nomeDe={(e) => e.nome}
      busca={(e) => `${e.nome} ${e.local} ${clientes.get(e.clienteId)?.nome ?? ''}`}
      colunas={[
        { rotulo: 'Evento', render: (e) => e.nome },
        { rotulo: 'Cliente', render: (e) => clientes.get(e.clienteId)?.nome ?? '—' },
        { rotulo: 'Data', render: (e) => dataBR(e.data) },
        { rotulo: 'Local', render: (e) => e.local },
        { rotulo: 'Convidados', render: (e) => e.convidados },
        { rotulo: 'Status', render: (e) => <span className={`tag ${e.status}`}>{e.status}</span> },
      ]}
    />
  )
}
