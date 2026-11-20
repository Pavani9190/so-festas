import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  ['Quem somos', '#quem-somos'],
  ['Galeria', '#galeria'],
  ['Serviços', '#servicos'],
  ['Depoimentos', '#depoimentos'],
  ['Contato', '#contato'],
]

export default function SiteHeader() {
  const [aberto, setAberto] = useState(false)
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="#topo" className="site-logo">Só Festas</a>
        <nav className={`site-nav ${aberto ? 'open' : ''}`} aria-label="Principal">
          {links.map(([nome, href]) => (
            <a key={href} href={href} onClick={() => setAberto(false)}>{nome}</a>
          ))}
        </nav>
        <a href="#contato" className="btn btn-outline">Solicitar orçamento</a>
        <button className="menu-toggle" onClick={() => setAberto((v) => !v)} aria-label={aberto ? 'Fechar menu' : 'Abrir menu'} aria-expanded={aberto}>
          {aberto ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}
