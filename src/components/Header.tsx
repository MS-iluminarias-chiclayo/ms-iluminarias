import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import Logo from './Logo'
import { categories } from '../data/categories'
import { useCart } from '../context/CartContext'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { totalCount, openCart } = useCart()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/catalogo?q=${encodeURIComponent(q)}` : '/catalogo')
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur">
      <div className="border-b border-ink/10 bg-ink py-1.5 text-center text-xs tracking-wide text-gold-soft">
        Envíos a todo el Perú · Precios más accesibles que la competencia
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <button
          type="button"
          className="p-2 text-ink lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link to="/" className="shrink-0" onClick={() => setMenuOpen(false)}>
          <Logo />
        </Link>

        <nav className="ml-6 hidden items-center gap-6 lg:flex">
          <Link to="/" className="text-sm font-semibold text-ink/80 hover:text-gold-deep">
            Inicio
          </Link>
          <Link to="/catalogo" className="text-sm font-semibold text-ink/80 hover:text-gold-deep">
            Todo el catálogo
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/catalogo?categoria=${c.id}`}
              className="text-sm font-semibold text-ink/80 hover:text-gold-deep"
            >
              {c.label}
            </Link>
          ))}
          <Link to="/contacto" className="text-sm font-semibold text-ink/80 hover:text-gold-deep">
            Contacto
          </Link>
        </nav>

        <form onSubmit={handleSearch} className="ml-auto hidden max-w-xs flex-1 items-center gap-2 rounded-full border border-ink/15 bg-white px-3 py-1.5 md:flex">
          <Search className="h-4 w-4 text-ink/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40"
          />
        </form>

        <button
          type="button"
          onClick={openCart}
          className="relative ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-gold transition hover:bg-gold hover:text-ink md:ml-0"
          aria-label="Ver carrito"
        >
          <ShoppingBag className="h-5 w-5" />
          {totalCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[0.65rem] font-bold text-ink">
              {totalCount}
            </span>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-ink/10 bg-cream px-4 pb-4 lg:hidden">
          <form onSubmit={handleSearch} className="my-3 flex items-center gap-2 rounded-full border border-ink/15 bg-white px-3 py-2">
            <Search className="h-4 w-4 text-ink/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40"
            />
          </form>
          <nav className="flex flex-col gap-1 pb-2">
            <Link to="/" className="rounded-lg px-2 py-2 text-sm font-semibold text-ink/80 hover:bg-ink/5" onClick={() => setMenuOpen(false)}>
              Inicio
            </Link>
            <Link to="/catalogo" className="rounded-lg px-2 py-2 text-sm font-semibold text-ink/80 hover:bg-ink/5" onClick={() => setMenuOpen(false)}>
              Todo el catálogo
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/catalogo?categoria=${c.id}`}
                className="rounded-lg px-2 py-2 text-sm font-semibold text-ink/80 hover:bg-ink/5"
                onClick={() => setMenuOpen(false)}
              >
                {c.label}
              </Link>
            ))}
            <Link to="/contacto" className="rounded-lg px-2 py-2 text-sm font-semibold text-ink/80 hover:bg-ink/5" onClick={() => setMenuOpen(false)}>
              Contacto
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
