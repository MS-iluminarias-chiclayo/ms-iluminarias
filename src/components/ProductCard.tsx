import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import type { Product } from '../data/products'
import { formatPEN } from '../lib/site'
import { useCart } from '../context/CartContext'
import ProductImage from './ProductImage'

const badgeStyles: Record<NonNullable<Product['badge']>, string> = {
  Nuevo: 'bg-emerald-800 text-emerald-50',
  Oferta: 'bg-gold text-ink',
  'Más vendido': 'bg-ink text-gold',
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/producto/${product.slug}`} className="relative block aspect-square overflow-hidden">
        <ProductImage
          category={product.category}
          palette={product.palette}
          className="h-full w-full transition duration-500 group-hover:scale-105"
          iconClassName="h-16 w-16"
        />
        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide ${badgeStyles[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-gold-deep">
          {product.category === 'lamparas' && 'Lámparas'}
          {product.category === 'interruptores' && 'Interruptores'}
          {product.category === 'focos' && 'Focos'}
          {product.category === 'tomacorrientes' && 'Tomacorrientes'}
        </p>
        <Link to={`/producto/${product.slug}`} className="line-clamp-2 min-h-[2.6rem] font-medium leading-snug text-ink hover:text-gold-deep">
          {product.name}
        </Link>
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            {product.oldPrice && (
              <span className="mr-1.5 text-xs text-ink/40 line-through">{formatPEN(product.oldPrice)}</span>
            )}
            <span className="text-lg font-bold text-ink">{formatPEN(product.price)}</span>
          </div>
          <button
            type="button"
            onClick={() => addItem(product)}
            aria-label={`Agregar ${product.name} al carrito`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-gold transition hover:bg-gold hover:text-ink"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
