import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

export default function Modal({ titulo, onClose, children }: { titulo: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="modal-back" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={titulo}>
        <h2>
          {titulo}
          <button className="icon-btn" onClick={onClose} aria-label="Fechar"><X size={20} /></button>
        </h2>
        {children}
      </div>
    </div>
  )
}
