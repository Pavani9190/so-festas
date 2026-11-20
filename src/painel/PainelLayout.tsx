import { useState } from 'react'
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Bell, CalendarDays, ClipboardList, Contact, History, CircleUserRound, SquarePen } from 'lucide-react'
import { useAuth } from '../context/authStore'
import { notificacoes } from '../services/db'
import { useRepo } from '../services/repo'

const itens = [
  { to: 'agenda', nome: 'Agenda', Icone: CalendarDays },
  { to: 'cadastros', nome: 'Cadastros', Icone: Contact },
  { to: 'listas', nome: 'Listas', Icone: ClipboardList },
  { to: 'relatorios', nome: 'Relatórios', Icone: SquarePen },
  { to: 'historico', nome: 'Histórico', Icone: History },
]

export default function PainelLayout() {
  const { logado, sair } = useAuth()
  const nav = useNavigate()
  const notas = useRepo(notificacoes)
  const [menu, setMenu] = useState(false)

  if (!logado) return <Navigate to="/painel/login" replace />
  const naoLidas = notas.filter((n) => !n.lida).length

  return (
    <div className="painel">
      <header className="p-top">
        <div className="p-brand">
          <strong>Só Festas</strong>
          <span>buffet e locação de artigos para festas</span>
        </div>
        <div className="p-tools">
          <button className="icon-btn" onClick={() => nav('/painel')} aria-label={`Notificações${naoLidas ? `, ${naoLidas} não lidas` : ''}`}>
            <Bell size={22} />
            {naoLidas > 0 && <span className="dot" />}
          </button>
          <button className="icon-btn" onClick={() => setMenu((m) => !m)} aria-label="Conta" aria-expanded={menu}>
            <CircleUserRound size={24} />
          </button>
          {menu && (
            <div className="user-menu">
              <button onClick={() => { sair(); nav('/') }}>Sair</button>
            </div>
          )}
        </div>
      </header>
      <nav className="p-side" aria-label="Seções do painel">
        {itens.map(({ to, nome, Icone }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `p-link ${isActive ? 'active' : ''}`} aria-label={nome}>
            <Icone size={26} />
            <span>{nome}</span>
          </NavLink>
        ))}
      </nav>
      <main className="p-main"><Outlet /></main>
    </div>
  )
}
