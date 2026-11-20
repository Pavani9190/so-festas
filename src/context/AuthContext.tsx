import { useState, type ReactNode } from 'react'
import { AuthContext } from './authStore'

// Login simulado. Usuário: admin / senha: festas123
// Trocar por autenticação real (token) quando houver API.
const USUARIO = 'admin'
const SENHA = 'festas123'
const KEY = 'sofestas:sessao'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [logado, setLogado] = useState(() => {
    try {
      return sessionStorage.getItem(KEY) === '1'
    } catch {
      return false
    }
  })

  const entrar = (usuario: string, senha: string) => {
    const ok = usuario.trim() === USUARIO && senha === SENHA
    if (ok) {
      try {
        sessionStorage.setItem(KEY, '1')
      } catch {
        /* ignora */
      }
      setLogado(true)
    }
    return ok
  }

  const sair = () => {
    try {
      sessionStorage.removeItem(KEY)
    } catch {
      /* ignora */
    }
    setLogado(false)
  }

  return <AuthContext.Provider value={{ logado, entrar, sair }}>{children}</AuthContext.Provider>
}
