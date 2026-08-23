import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { categories, type CategoryId } from '../data/categories'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

type SortOption = 'relevancia' | 'precio-asc' | 'precio-desc' | 'nombre'

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState<SortOption>('relevancia')

  const activeCategory = searchParams.get('categoria') as CategoryId | null
  const query = searchParams.get('q')?.toLowerCase() ?? ''

  function setCategory(cat: CategoryId | null) {
    const next = new URLSearchParams(searchParams)
    if (cat) next.set('categoria', cat)
    else next.delete('categoria')
    setSearchParams(next)
  }

  const filtered = useMemo(() => {
    let list = products
    if (activeCategory) list = list.filter((p) => p.category === activeCategory)
    if (query) {
      list = list.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query),
      )
    }
    const sorted = [...list]
    if (sort === 'precio-asc') sorted.sort((a, b) => a.price - b.price)
    else if (sort === 'precio-desc') sorted.sort((a, b) => b.price - a.price)
    else if (sort === 'nombre') sorted.sort((a, b) => a.name.localeCompare(b.name))
    return sorted
  }, [activeCategory, query, sort])

  const activeCategoryLabel = activeCategory ? categories.find((c) => c.id === activeCategory)?.label : null

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-semibold text-ink">
          {activeCategoryLabel ?? 'Todo el catálogo'}
        </h1>
        <p className="mt-1 text-ink/60">
          {query ? (
            <>Resultados para "{query}"</>
          ) : (
            'Explora lámparas, interruptores, focos y tomacorrientes al mejor precio.'
          )}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="mb-2 flex items-center gap-2 text-sm font-bold text-ink lg:hidden">
            <SlidersHorizontal className="h-4 w-4" /> Filtros
          </div>
          <div className="flex flex-wrap gap-2 lg:flex-col">
            <button
              type="button"
              onClick={() => setCategory(null)}
              className={`rounded-full px-4 py-2 text-left text-sm font-medium transition lg:rounded-lg ${
                !activeCategory ? 'bg-ink text-gold' : 'bg-porcelain text-ink/70 hover:bg-ink/10'
              }`}
            >
              Todas las categorías
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-left text-sm font-medium transition lg:rounded-lg ${
                  activeCategory === c.id ? 'bg-ink text-gold' : 'bg-porcelain text-ink/70 hover:bg-ink/10'
                }`}
              >
                <c.icon className="h-4 w-4" />
                {c.label}
              </button>
            ))}
          </div>
        </aside>

        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink/60">{filtered.length} productos</p>
            <div className="flex items-center gap-2">
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    const next = new URLSearchParams(searchParams)
                    next.delete('q')
                    setSearchParams(next)
                  }}
                  className="flex items-center gap-1 rounded-full bg-porcelain px-3 py-1.5 text-xs font-medium text-ink/70 hover:bg-ink/10"
                >
                  <X className="h-3 w-3" /> Quitar búsqueda
                </button>
              )}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-full border border-ink/15 bg-white px-3 py-1.5 text-xs font-medium text-ink/80"
              >
                <option value="relevancia">Relevancia</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="nombre">Nombre A-Z</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-ink/20 py-20 text-center text-ink/50">
              No encontramos productos con esos filtros.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
