import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import { useAuth } from '../context/authStore'

export default function Login() {
  const { logado, entrar } = useAuth()
  const nav = useNavigate()
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [ver, setVer] = useState(false)
  const [erro, setErro] = useState(false)

  if (logado) return <Navigate to="/painel" replace />

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    if (entrar(usuario, senha)) nav('/painel')
    else setErro(true)
  }

  return (
    <div className="login">
      <div className="ring a" aria-hidden />
      <div className="ring b" aria-hidden />
      <div className="login-box">
        <h1>Só Festas</h1>
        <form className="login-card" onSubmit={enviar}>
          <h2>BEM VINDO!</h2>
          <label className="l-input">
            <User size={22} aria-hidden />
            <input placeholder="Usuário" aria-label="Usuário" value={usuario} onChange={(e) => setUsuario(e.target.value)} autoComplete="username" />
          </label>
          <label className="l-input">
            <Lock size={22} aria-hidden />
            <input placeholder="Senha" aria-label="Senha" type={ver ? 'text' : 'password'} value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="current-password" />
            <button type="button" onClick={() => setVer((v) => !v)} aria-label={ver ? 'Ocultar senha' : 'Mostrar senha'}>
              {ver ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </label>
          {erro && <p className="l-error" role="alert">Usuário ou senha incorretos.</p>}
          <button className="l-btn" type="submit">entrar</button>
          <p className="l-hint">Acesso de demonstração: admin / festas123</p>
        </form>
      </div>
    </div>
  )
}
