import { MessageCircle } from 'lucide-react'
import { buildWhatsAppUrl } from '../lib/site'

export default function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppUrl('Hola M&S Iluminarias! Quisiera más información sobre sus productos.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
