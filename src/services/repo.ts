import { useSyncExternalStore } from 'react'

// Camada de dados simulada (localStorage).
// Quando o backend existir, é aqui que a troca acontece: mesma interface, chamadas HTTP no lugar.

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)

export function createRepo<T extends { id: string }>(key: string, seed: T[]) {
  const storageKey = `sofestas:${key}`
  const load = (): T[] => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) return JSON.parse(raw) as T[]
    } catch {
      /* storage indisponível: segue com os dados de exemplo */
    }
    return seed
  }

  let cache: T[] = load()
  const listeners = new Set<() => void>()
  const commit = (next: T[]) => {
    cache = next
    try {
      localStorage.setItem(storageKey, JSON.stringify(cache))
    } catch {
      /* ignora falha de gravação */
    }
    listeners.forEach((l) => l())
  }

  return {
    list: () => cache,
    get: (id: string) => cache.find((i) => i.id === id),
    create(data: Omit<T, 'id'>): T {
      const item = { ...data, id: uid() } as T
      commit([item, ...cache])
      return item
    },
    update(id: string, patch: Partial<T>) {
      commit(cache.map((i) => (i.id === id ? { ...i, ...patch } : i)))
    },
    remove(id: string) {
      commit(cache.filter((i) => i.id !== id))
    },
    reset() {
      commit(seed)
    },
    subscribe(listener: () => void) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}

export type Repo<T extends { id: string }> = ReturnType<typeof createRepo<T>>

export function useRepo<T extends { id: string }>(repo: Repo<T>): T[] {
  return useSyncExternalStore(repo.subscribe, repo.list)
}
