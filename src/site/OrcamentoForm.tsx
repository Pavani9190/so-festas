import { useState, type FormEvent } from 'react'
import { notificacoes, registrar } from '../services/db'
import { linkWhatsApp } from '../services/whatsapp'
import { tiposEvento } from '../data/conteudo'

const vazio = { nome: '', email: '', telefone: '', tipo: tiposEvento[0], data: '', convidados: '', mensagem: '' }

export default function OrcamentoForm() {
  const [f, setF] = useState(vazio)
  const [erro, setErro] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [linkZap, setLinkZap] = useState('')

  const set = (campo: keyof typeof vazio, valor: string) => setF((s) => ({ ...s, [campo]: valor }))

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    if (!f.nome.trim() || (!f.email.trim() && !f.telefone.trim())) {
      setErro('Informe seu nome e um e-mail ou telefone para retornarmos o contato.')
      return
    }
    setErro('')
    const linhas = [
      `Nome: ${f.nome}`,
      f.email && `E-mail: ${f.email}`,
      f.telefone && `Telefone: ${f.telefone}`,
      `Tipo de evento: ${f.tipo}`,
      f.data && `Data prevista: ${f.data.split('-').reverse().join('/')}`,
      f.convidados && `Convidados: ${f.convidados}`,
      f.mensagem && `\n${f.mensagem}`,
    ].filter(Boolean)
    notificacoes.create({
      tipo: 'orcamento',
      lida: false,
      criadaEm: new Date().toISOString(),
      resumo: `Pedido de orçamento de ${f.nome} (${f.tipo})`,
      detalhe: linhas.join('\n'),
    })
    registrar('Recebeu', 'Orçamento', `Pedido de ${f.nome}`)

    const link = linkWhatsApp('Olá! Gostaria de solicitar um orçamento.\n\n' + linhas.join('\n'))
    setLinkZap(link)
    window.open(link, '_blank', 'noopener,noreferrer')

    setEnviado(true)
    setF(vazio)
  }

  if (enviado) {
    return (
      <div className="form-ok" role="status">
        Recebemos seu pedido. Se o WhatsApp não abriu, clique abaixo para enviar a mensagem.
        <div style={{ marginTop: '1rem', display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
          <a className="btn btn-gold" href={linkZap} target="_blank" rel="noopener noreferrer">Abrir WhatsApp</a>
          <button className="btn btn-ghost" onClick={() => setEnviado(false)}>Enviar outro pedido</button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} className="form-grid" noValidate>
      <div className="site-field full">
        <label htmlFor="o-nome">Nome</label>
        <input id="o-nome" value={f.nome} onChange={(e) => set('nome', e.target.value)} autoComplete="name" />
      </div>
      <div className="site-field">
        <label htmlFor="o-email">E-mail</label>
        <input id="o-email" type="email" value={f.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" />
      </div>
      <div className="site-field">
        <label htmlFor="o-tel">Telefone</label>
        <input id="o-tel" type="tel" value={f.telefone} onChange={(e) => set('telefone', e.target.value)} autoComplete="tel" />
      </div>
      <div className="site-field">
        <label htmlFor="o-tipo">Tipo de evento</label>
        <select id="o-tipo" value={f.tipo} onChange={(e) => set('tipo', e.target.value)}>
          {tiposEvento.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="site-field">
        <label htmlFor="o-data">Data prevista</label>
        <input id="o-data" type="date" value={f.data} onChange={(e) => set('data', e.target.value)} />
      </div>
      <div className="site-field full">
        <label htmlFor="o-conv">Número de convidados</label>
        <input id="o-conv" type="number" min={1} value={f.convidados} onChange={(e) => set('convidados', e.target.value)} />
      </div>
      <div className="site-field full">
        <label htmlFor="o-msg">Conte um pouco sobre o evento</label>
        <textarea id="o-msg" value={f.mensagem} onChange={(e) => set('mensagem', e.target.value)} />
      </div>
      <div className="full">
        {erro && <p className="form-error" role="alert">{erro}</p>}
        <button type="submit" className="btn btn-gold">Solicitar orçamento</button>
      </div>
    </form>
  )
}