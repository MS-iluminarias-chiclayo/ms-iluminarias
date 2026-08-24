import { Link } from 'react-router-dom'
import { MapPin, MessageCircle, Phone } from 'lucide-react'
import Logo from './Logo'
import { categories } from '../data/categories'
import { siteConfig } from '../lib/site'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-ink text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm text-white/60">{siteConfig.tagline}.</p>
          <div className="mt-5 flex gap-3">
            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 hover:border-gold hover:text-gold">
              <InstagramIcon />
            </a>
            <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 hover:border-gold hover:text-gold">
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-lg text-gold">Categorías</h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={`/catalogo?categoria=${c.id}`} className="hover:text-gold">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg text-gold">Enlaces</h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            <li>
              <Link to="/" className="hover:text-gold">Inicio</Link>
            </li>
            <li>
              <Link to="/catalogo" className="hover:text-gold">Catálogo completo</Link>
            </li>
            <li>
              <Link to="/contacto" className="hover:text-gold">Contacto</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg text-gold">Contacto</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{siteConfig.phoneDisplay}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{siteConfig.address}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
      </div>
    </footer>
  )
}
