import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react'
import { getProductBySlug, getRelatedProducts } from '../data/products'
import { categoryMap } from '../data/categories'
import { buildWhatsAppUrl, formatPEN } from '../lib/site'
import { useCart } from '../context/CartContext'
import ProductImage from '../components/ProductImage'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = slug ? getProductBySlug(slug) : undefined
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  if (!product) return <Navigate to="/catalogo" replace />

  const related = getRelatedProducts(product)
  const category = categoryMap[product.category]

  const whatsappMessage = `Hola! Estoy interesado en: ${product.name} (${product.sku}) — ${formatPEN(product.price)}. ¿Está disponible?`

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-xs text-ink/50">
        <Link to="/" className="hover:text-gold-deep">Inicio</Link> {' / '}
        <Link to="/catalogo" className="hover:text-gold-deep">Catálogo</Link> {' / '}
        <Link to={`/catalogo?categoria=${product.category}`} className="hover:text-gold-deep">{category.label}</Link> {' / '}
        <span className="text-ink/70">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <ProductImage
          category={product.category}
          palette={product.palette}
          image={product.image}
          alt={product.name}
          className="aspect-square w-full rounded-2xl"
          iconClassName="h-28 w-28"
        />

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-deep">{category.label}</p>
          <h1 className="mt-1 font-serif text-3xl font-semibold text-ink">{product.name}</h1>
          <p className="mt-1 text-xs text-ink/40">SKU: {product.sku}</p>

          <div className="mt-4 flex items-center gap-3">
            {product.oldPrice && (
              <span className="text-lg text-ink/40 line-through">{formatPEN(product.oldPrice)}</span>
            )}
            <span className="text-3xl font-bold text-ink">{formatPEN(product.price)}</span>
            {product.badge && (
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-ink">{product.badge}</span>
            )}
          </div>

          <p className="mt-5 leading-relaxed text-ink/70">{product.description}</p>

          <ul className="mt-5 grid gap-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-ink/70">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" /> {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 rounded-full border border-ink/15 px-2 py-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-8 w-8 items-center justify-center text-ink/70 hover:text-ink"
                aria-label="Disminuir cantidad"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center font-medium">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-8 w-8 items-center justify-center text-ink/70 hover:text-ink"
                aria-label="Aumentar cantidad"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => addItem(product, quantity)}
              className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-ink"
            >
              <ShoppingBag className="h-4 w-4" /> Agregar al carrito
            </button>

            <a
              href={buildWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:brightness-95"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 font-serif text-2xl font-semibold text-ink">También te puede interesar</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
