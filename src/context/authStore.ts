import { createContext, useContext } from 'react'

export interface AuthValue {
  logado: boolean
  entrar: (usuario: string, senha: string) => boolean
  sair: () => void
}

export const AuthContext = createContext<AuthValue | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth precisa estar dentro de AuthProvider')
  return ctx
}
