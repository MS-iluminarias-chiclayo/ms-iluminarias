import { useState } from 'react'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { buildWhatsAppUrl, siteConfig } from '../lib/site'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  const message = [
    `Hola M&S Iluminarias, soy ${form.name || '[nombre]'}.`,
    form.message || '[Escribe aquí tu consulta]',
    form.phone ? `Mi número de contacto: ${form.phone}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="mb-10 text-center">
        <h1 className="font-serif text-4xl font-semibold text-ink">Hablemos</h1>
        <p className="mt-2 text-ink/60">¿Tienes dudas sobre algún producto? Escríbenos y te respondemos al toque.</p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-serif text-xl font-semibold text-ink">Envíanos un mensaje</h2>
          <form
            className="mt-5 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
            }}
          >
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink/70">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-gold"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-ink/70">
                Teléfono (opcional)
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-gold"
                placeholder="+51 999 999 999"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink/70">
                Mensaje
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-gold"
                placeholder="Cuéntanos qué necesitas..."
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:brightness-95"
            >
              <MessageCircle className="h-4 w-4" /> Enviar por WhatsApp
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl bg-ink p-6 text-white sm:p-8">
            <h2 className="font-serif text-xl font-semibold text-gold">Información de contacto</h2>
            <ul className="mt-5 flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span>{siteConfig.phoneDisplay}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span>{siteConfig.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span>{siteConfig.hours}</span>
              </li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl border border-ink/10">
            <iframe
              title="Ubicación M&S Iluminarias"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-77.05%2C-12.10%2C-77.00%2C-12.05&layer=mapnik"
              className="h-64 w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
