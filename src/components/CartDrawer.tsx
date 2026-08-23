import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { buildWhatsAppUrl, formatPEN } from '../lib/site'
import ProductImage from './ProductImage'

function buildOrderMessage(items: ReturnType<typeof useCart>['items'], total: number) {
  const lines = items.map(
    (item) => `• ${item.quantity}x ${item.product.name} (${item.product.sku}) — ${formatPEN(item.product.price * item.quantity)}`,
  )
  return [
    'Hola M&S Iluminarias! Quisiera hacer el siguiente pedido:',
    '',
    ...lines,
    '',
    `Total: ${formatPEN(total)}`,
  ].join('\n')
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, setQuantity, totalPrice, clearCart } = useCart()

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-ink/50 transition-opacity ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-ink">
            <ShoppingBag className="h-5 w-5 text-gold-deep" /> Tu carrito
          </h2>
          <button type="button" onClick={closeCart} aria-label="Cerrar carrito" className="p-1 text-ink/60 hover:text-ink">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-12 w-12 text-ink/20" />
            <p className="text-ink/60">Tu carrito está vacío.</p>
            <Link
              to="/catalogo"
              onClick={closeCart}
              className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-gold hover:bg-gold hover:text-ink"
            >
              Ver catálogo
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-4">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="flex gap-3">
                    <ProductImage
                      category={product.category}
                      palette={product.palette}
                      image={product.image}
                      alt={product.name}
                      className="h-16 w-16 shrink-0 rounded-lg"
                      iconClassName="h-6 w-6"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link to={`/producto/${product.slug}`} onClick={closeCart} className="line-clamp-2 text-sm font-medium text-ink hover:text-gold-deep">
                          {product.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          aria-label={`Quitar ${product.name}`}
                          className="shrink-0 p-1 text-ink/40 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-ink/15">
                          <button
                            type="button"
                            onClick={() => setQuantity(product.id, quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center text-ink/70 hover:text-ink"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-4 text-center text-sm">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity(product.id, quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center text-ink/70 hover:text-ink"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-ink">{formatPEN(product.price * quantity)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={clearCart} className="mt-4 text-xs font-medium text-ink/40 underline hover:text-red-600">
                Vaciar carrito
              </button>
            </div>

            <div className="border-t border-ink/10 px-5 py-4">
              <div className="mb-3 flex items-center justify-between text-base font-semibold text-ink">
                <span>Total</span>
                <span>{formatPEN(totalPrice)}</span>
              </div>
              <a
                href={buildWhatsAppUrl(buildOrderMessage(items, totalPrice))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:brightness-95"
              >
                Finalizar pedido por WhatsApp
              </a>
              <p className="mt-2 text-center text-xs text-ink/50">
                Coordinamos contigo el pago y el envío por WhatsApp.
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
