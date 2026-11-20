import type { Campo } from '../components/ui/FormModal'
import { cardapios, clientes } from '../services/db'
import type { StatusEvento } from '../data/types'

export const statusEvento: StatusEvento[] = ['Orçamento', 'Confirmado', 'Realizado', 'Cancelado']

export const camposFuncionario: Campo[] = [
  { nome: 'nome', rotulo: 'Nome', obrigatorio: true },
  { nome: 'cargo', rotulo: 'Cargo', obrigatorio: true },
  { nome: 'tipo', rotulo: 'Vínculo', tipo: 'select', opcoes: () => ['Fixo', 'Freelancer'].map((x) => ({ valor: x, rotulo: x })) },
  { nome: 'telefone', rotulo: 'Telefone', tipo: 'tel' },
  { nome: 'disponibilidade', rotulo: 'Disponibilidade' },
]

export const camposCliente: Campo[] = [
  { nome: 'nome', rotulo: 'Nome / empresa', obrigatorio: true },
  { nome: 'contato', rotulo: 'Pessoa de contato' },
  { nome: 'telefone', rotulo: 'Telefone', tipo: 'tel' },
  { nome: 'email', rotulo: 'E-mail', tipo: 'email' },
  { nome: 'status', rotulo: 'Cadastro', tipo: 'select', opcoes: () => ['Ativo', 'Pendente'].map((x) => ({ valor: x, rotulo: x })) },
]

export const camposCardapio: Campo[] = [
  { nome: 'nome', rotulo: 'Nome do cardápio', obrigatorio: true },
  { nome: 'tipo', rotulo: 'Tipo (jantar, coquetel...)' },
  { nome: 'precoPorPessoa', rotulo: 'Preço por pessoa (R$)', tipo: 'number', obrigatorio: true },
  { nome: 'itens', rotulo: 'Itens', tipo: 'textarea' },
]

export const camposEvento: Campo[] = [
  { nome: 'nome', rotulo: 'Nome do evento', obrigatorio: true },
  { nome: 'clienteId', rotulo: 'Cliente', tipo: 'select', obrigatorio: true, opcoes: () => clientes.list().map((c) => ({ valor: c.id, rotulo: c.nome })) },
  { nome: 'cardapioId', rotulo: 'Cardápio', tipo: 'select', obrigatorio: true, opcoes: () => cardapios.list().map((c) => ({ valor: c.id, rotulo: c.nome })) },
  { nome: 'data', rotulo: 'Data', tipo: 'date', obrigatorio: true },
  { nome: 'local', rotulo: 'Local' },
  { nome: 'convidados', rotulo: 'Convidados', tipo: 'number' },
  { nome: 'status', rotulo: 'Status', tipo: 'select', opcoes: () => statusEvento.map((s) => ({ valor: s, rotulo: s })) },
  { nome: 'obs', rotulo: 'Observações', tipo: 'textarea' },
]

export const eventoVazio = () => ({
  nome: '',
  clienteId: clientes.list()[0]?.id ?? '',
  cardapioId: cardapios.list()[0]?.id ?? '',
  data: '',
  local: '',
  convidados: 0,
  status: 'Orçamento',
  obs: '',
})
