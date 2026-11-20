import type { Cardapio, Cliente, Evento, Funcionario, Historico, Notificacao } from './types'

// Dados de exemplo. Trocar pela API quando o backend existir.

export const funcionariosSeed: Funcionario[] = [
  { id: 'f1', nome: 'Jack', cargo: 'Garçom', tipo: 'Freelancer', telefone: '(15) 99999-0001', disponibilidade: '20/07 - 22/07' },
  { id: 'f2', nome: 'Marta Alves', cargo: 'Cozinheira', tipo: 'Fixo', telefone: '(15) 99999-0002', disponibilidade: 'Segunda a sábado' },
  { id: 'f3', nome: 'Rafael Gomes', cargo: 'Maître', tipo: 'Fixo', telefone: '(15) 99999-0003', disponibilidade: 'Fins de semana' },
]

export const clientesSeed: Cliente[] = [
  { id: 'c1', nome: 'Quem investe consegue', contato: 'Equipe de eventos', telefone: '(15) 98888-0001', email: 'contato@quem-investe.example', status: 'Ativo' },
  { id: 'c2', nome: 'Let’s go flowers', contato: 'Responsável pela loja', telefone: '(15) 98888-0002', email: 'contato@letsgoflowers.example', status: 'Pendente' },
  { id: 'c3', nome: 'Família Souza', contato: 'Helena Souza', telefone: '(15) 98888-0003', email: 'helena@email.example', status: 'Ativo' },
]

export const cardapiosSeed: Cardapio[] = [
  { id: 'm1', nome: 'Jantar completo', tipo: 'Jantar', precoPorPessoa: 145, itens: 'Entradas, prato principal, sobremesa e bebidas não alcoólicas' },
  { id: 'm2', nome: 'Coquetel', tipo: 'Coquetel', precoPorPessoa: 85, itens: 'Salgados quentes, mesa de frios e petiscos' },
  { id: 'm3', nome: 'Almoço executivo', tipo: 'Corporativo', precoPorPessoa: 62, itens: 'Prato do dia, salada, sobremesa e suco' },
]

export const eventosSeed: Evento[] = [
  { id: 'e1', nome: 'Casamento Helena e Pedro', clienteId: 'c3', cardapioId: 'm1', data: '2026-11-28', local: 'Salão Jardim', convidados: 120, status: 'Confirmado', obs: 'Mesa posta lilás, decoração com flores do campo.' },
  { id: 'e2', nome: 'Confraternização anual', clienteId: 'c1', cardapioId: 'm2', data: '2026-12-12', local: 'Sede do cliente', convidados: 80, status: 'Orçamento', obs: '' },
  { id: 'e3', nome: 'Almoço de lançamento', clienteId: 'c1', cardapioId: 'm3', data: '2026-11-05', local: 'Hotel Central', convidados: 45, status: 'Realizado', obs: '' },
  { id: 'e4', nome: 'Aniversário de 60 anos', clienteId: 'c3', cardapioId: 'm2', data: '2027-01-16', local: 'Chácara Boa Vista', convidados: 60, status: 'Confirmado', obs: '' },
]

export const notificacoesSeed: Notificacao[] = [
  {
    id: 'n1', tipo: 'disponibilidade', lida: false, criadaEm: '2026-11-10T09:00:00',
    resumo: 'Jack está disponível para o evento do dia 28 de novembro',
    detalhe: 'Nome: Jack\nEvento: Casamento Helena e Pedro\nData do evento: 28/11\nDisponibilidade: 28/11\nCargo: Freelancer garçom',
  },
  {
    id: 'n2', tipo: 'orcamento', lida: false, criadaEm: '2026-11-11T14:30:00',
    resumo: 'Olá, somos da “Quem investe consegue”, teremos um evento em setembro',
    detalhe: 'Olá, somos da “Quem investe consegue”, teremos um evento no mês de setembro e gostaríamos de contratar o buffet Só Festas. Esperamos contato para agendarmos.\n\nAtenciosamente.',
  },
  {
    id: 'n3', tipo: 'cadastro', lida: false, criadaEm: '2026-11-12T08:15:00',
    resumo: 'O cadastro do cliente “Let’s go flowers” ainda está pendente',
    detalhe: 'O cadastro do cliente “Let’s go flowers” ainda está pendente. Finalize o cadastro para futuras negociações.',
  },
]

export const historicoSeed: Historico[] = [
  { id: 'h1', quando: '2026-11-05T18:00:00', acao: 'Editou', entidade: 'Evento', descricao: 'Almoço de lançamento marcado como Realizado' },
  { id: 'h2', quando: '2026-11-02T10:20:00', acao: 'Criou', entidade: 'Evento', descricao: 'Casamento Helena e Pedro' },
]
