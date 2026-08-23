// ⚠️ Algunos datos siguen siendo de ejemplo — reemplázalos por los reales del negocio.
export const siteConfig = {
  name: 'M&S Iluminarias',
  tagline: 'Iluminamos tus espacios, realzamos tu mundo',
  whatsappNumber: '51936483257', // formato: código país + número, sin '+' ni espacios
  phoneDisplay: '+51 936 483 257',
  email: 'contacto@msiluminarias.pe',
  address: 'Av. Ejemplo 123, Lima, Perú',
  hours: 'Lun. a Sáb. 9:00am – 7:00pm',
  instagram: 'https://instagram.com/msiluminarias',
  facebook: 'https://facebook.com/msiluminarias',
  tiktok: 'https://tiktok.com/@msiluminarias',
}

export function formatPEN(amount: number): string {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
  }).format(amount)
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}
