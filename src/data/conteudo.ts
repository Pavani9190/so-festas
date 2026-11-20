import petiscos from '../assets/petiscos.jpg'
import salao from '../assets/salao.jpg'
import mesaFrios from '../assets/mesa-frios.jpg'
import mesaPosta from '../assets/mesa-posta.jpg'
import mesaJardim from '../assets/mesa-posta-jardim.jpg'
import mesaBuffet from '../assets/mesa-buffet.jpg'

export const galeria = [
  { src: petiscos, alt: 'Petiscos servidos em travessas' },
  { src: salao, alt: 'Salão com taças e mesa posta' },
  { src: mesaFrios, alt: 'Mesa de frios com torta de brie decorada' },
  { src: mesaPosta, alt: 'Mesa posta com guardanapos lilás e flores' },
  { src: mesaJardim, alt: 'Mesa posta ao ar livre com sousplat dourado' },
  { src: mesaBuffet, alt: 'Buffet com frutas, queijos e petiscos' },
]

// Textos de Serviços e Depoimentos ainda não existem no Figma: são provisórios.
// TROCAR pelo conteúdo real do buffet antes de publicar.
export const servicos = [
  { titulo: 'Casamentos', texto: 'Buffet completo e mesa posta para o dia mais importante, do coquetel ao jantar.' },
  { titulo: 'Eventos corporativos', texto: 'Almoços, confraternizações e lançamentos com serviço pontual e discreto.' },
  { titulo: 'Celebrações especiais', texto: 'Aniversários, formaturas e encontros de família com o cuidado de quem cozinha para os seus.' },
]

export const depoimentos = [
  { texto: 'Depoimento de cliente (exemplo). Substituir por um depoimento real.', autor: 'Nome do cliente' },
  { texto: 'Depoimento de cliente (exemplo). Substituir por um depoimento real.', autor: 'Nome do cliente' },
]

export const tiposEvento = ['Casamento', 'Evento corporativo', 'Aniversário', 'Formatura', 'Outro']
