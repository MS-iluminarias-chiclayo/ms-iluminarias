import { Link } from 'react-router-dom'
import { ArrowRight, BadgePercent, ShieldCheck, Truck, Wrench } from 'lucide-react'
import { categories } from '../data/categories'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { BulbMark } from '../components/Logo'

const featured = products.filter((p) => p.badge).slice(0, 8)

const perks = [
  {
    icon: BadgePercent,
    title: 'Precios más accesibles',
    text: 'Comparamos el mercado para ofrecerte siempre el mejor precio.',
  },
  {
    icon: Truck,
    title: 'Envíos a todo el Perú',
    text: 'Coordinamos el envío a tu domicilio o punto de recojo.',
  },
  {
    icon: ShieldCheck,
    title: 'Productos garantizados',
    text: 'Calidad verificada en cada lámpara, foco y accesorio eléctrico.',
  },
  {
    icon: Wrench,
    title: 'Asesoría personalizada',
    text: 'Te ayudamos a elegir el producto ideal para tu espacio.',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #d4af37 0, #d4af37 1px, transparent 1px, transparent 22px)',
        }} />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div className="relative">
            <p className="mb-3 inline-block rounded-full border border-gold/30 px-3 py-1 text-xs font-semibold tracking-widest text-gold-soft">
              LÁMPARAS · INTERRUPTORES · FOCOS · TOMACORRIENTES
            </p>
            <h1 className="text-balance font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Ilumina tu hogar <span className="gold-gradient-text">sin pagar de más</span>
            </h1>
            <p className="mt-5 max-w-md text-white/70">
              Todo el catálogo de iluminación y accesorios eléctricos que necesitas, en un solo lugar y a los
              precios más accesibles del mercado.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink transition hover:bg-gold-soft"
              >
                Ver catálogo completo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold hover:text-gold"
              >
                Hablar con un asesor
              </Link>
            </div>
          </div>
          <div className="relative mx-auto hidden md:block">
            <div className="absolute inset-0 rounded-full bg-gold/10 blur-3xl" />
            <BulbMark className="relative h-72 w-72 drop-shadow-2xl" outline="#ffffff" />
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-b border-ink/10 bg-porcelain">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
          {perks.map((perk) => (
            <div key={perk.title} className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
              <perk.icon className="h-7 w-7 text-gold-deep" strokeWidth={1.5} />
              <h3 className="text-sm font-bold text-ink">{perk.title}</h3>
              <p className="text-xs text-ink/60">{perk.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-ink">Explora por categoría</h2>
            <p className="mt-1 text-ink/60">Encuentra justo lo que necesitas en segundos.</p>
          </div>
          <Link to="/catalogo" className="hidden text-sm font-semibold text-gold-deep hover:underline sm:block">
            Ver todo →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/catalogo?categoria=${c.id}`}
              className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-ink/10 bg-ink px-4 py-8 text-center transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/10 blur-xl transition group-hover:bg-gold/20" />
              <c.icon className="relative h-9 w-9 text-gold" strokeWidth={1.3} />
              <span className="relative font-serif text-lg text-white">{c.label}</span>
              <span className="relative text-xs text-white/50">{c.description}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-ink">Destacados y ofertas</h2>
            <p className="mt-1 text-ink/60">Los productos favoritos de nuestros clientes.</p>
          </div>
          <Link to="/catalogo" className="hidden text-sm font-semibold text-gold-deep hover:underline sm:block">
            Ver todo →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-br from-ink via-ink-soft to-ink px-6 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="font-serif text-2xl font-semibold text-white">¿No encuentras lo que buscas?</h3>
            <p className="mt-1 text-white/60">Escríbenos y te ayudamos a encontrar el producto ideal.</p>
          </div>
          <Link
            to="/contacto"
            className="shrink-0 rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink transition hover:bg-gold-soft"
          >
            Contáctanos ahora
          </Link>
        </div>
      </section>
    </div>
  )
}
