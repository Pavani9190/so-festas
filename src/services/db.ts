import { createRepo } from './repo'
import type { Historico, Notificacao } from '../data/types'
import {
  cardapiosSeed,
  clientesSeed,
  eventosSeed,
  funcionariosSeed,
  historicoSeed,
  notificacoesSeed,
} from '../data/seeds'
import type { Cardapio, Cliente, Evento, Funcionario } from '../data/types'

export const funcionarios = createRepo<Funcionario>('funcionarios', funcionariosSeed)
export const clientes = createRepo<Cliente>('clientes', clientesSeed)
export const cardapios = createRepo<Cardapio>('cardapios', cardapiosSeed)
export const eventos = createRepo<Evento>('eventos', eventosSeed)
export const notificacoes = createRepo<Notificacao>('notificacoes', notificacoesSeed)
export const historico = createRepo<Historico>('historico', historicoSeed)

export function registrar(acao: Historico['acao'], entidade: string, descricao: string) {
  historico.create({ quando: new Date().toISOString(), acao, entidade, descricao })
}

export function resetarDados() {
  ;[funcionarios, clientes, cardapios, eventos, notificacoes, historico].forEach((r) => r.reset())
}
