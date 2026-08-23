import { Link } from 'react-router-dom'
import { BulbMark } from '../components/Logo'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <BulbMark className="h-20 w-20 opacity-40" />
      <h1 className="mt-4 font-serif text-3xl font-semibold text-ink">Página no encontrada</h1>
      <p className="mt-2 text-ink/60">El producto o la página que buscas ya no está disponible.</p>
      <Link
        to="/catalogo"
        className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-bold text-gold hover:bg-gold hover:text-ink"
      >
        Ir al catálogo
      </Link>
    </div>
  )
}
