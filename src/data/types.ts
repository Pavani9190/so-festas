export type Id = string

export interface Funcionario {
  id: Id
  nome: string
  cargo: string
  tipo: 'Fixo' | 'Freelancer'
  telefone: string
  disponibilidade: string
}

export interface Cliente {
  id: Id
  nome: string
  contato: string
  telefone: string
  email: string
  status: 'Ativo' | 'Pendente'
}

export interface Cardapio {
  id: Id
  nome: string
  tipo: string
  precoPorPessoa: number
  itens: string
}

export type StatusEvento = 'Orçamento' | 'Confirmado' | 'Realizado' | 'Cancelado'

export interface Evento {
  id: Id
  nome: string
  clienteId: Id
  cardapioId: Id
  data: string // AAAA-MM-DD
  local: string
  convidados: number
  status: StatusEvento
  obs: string
}

export type TipoNotificacao = 'disponibilidade' | 'orcamento' | 'cadastro'

export interface Notificacao {
  id: Id
  tipo: TipoNotificacao
  resumo: string
  detalhe: string
  lida: boolean
  criadaEm: string
}

export interface Historico {
  id: Id
  quando: string
  acao: 'Criou' | 'Editou' | 'Excluiu' | 'Recebeu'
  entidade: string
  descricao: string
}
