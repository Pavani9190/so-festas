const NUMERO_BUFFET = '5515997114341' // 55 + DDD + número, só dígitos

export function linkWhatsApp(texto: string) {
  return `https://wa.me/${NUMERO_BUFFET}?text=${encodeURIComponent(texto)}`
}