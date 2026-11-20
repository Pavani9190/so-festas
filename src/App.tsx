import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import SitePage from './site/SitePage'
import Login from './painel/Login'
import PainelLayout from './painel/PainelLayout'
import Home from './painel/Home'
import Agenda from './painel/Agenda'
import { Cardapios, CadastrosHub, Clientes, Eventos, Funcionarios } from './painel/Cadastros'
import Listas from './painel/Listas'
import Relatorios from './painel/Relatorios'
import Historico from './painel/Historico'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SitePage />} />
          <Route path="/painel/login" element={<Login />} />
          <Route path="/painel" element={<PainelLayout />}>
            <Route index element={<Home />} />
            <Route path="agenda" element={<Agenda />} />
            <Route path="cadastros" element={<CadastrosHub />} />
            <Route path="cadastros/funcionarios" element={<Funcionarios />} />
            <Route path="cadastros/clientes" element={<Clientes />} />
            <Route path="cadastros/cardapios" element={<Cardapios />} />
            <Route path="cadastros/eventos" element={<Eventos />} />
            <Route path="listas" element={<Listas />} />
            <Route path="relatorios" element={<Relatorios />} />
            <Route path="historico" element={<Historico />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
