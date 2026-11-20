const NUMERO_BUFFET = '551599850-6669' // 55 + DDD + número, só dígitos

export function linkWhatsApp(texto: string) {
  return `https://wa.me/${NUMERO_BUFFET}?text=${encodeURIComponent(texto)}`
}