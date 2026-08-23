# M&S Iluminarias

Sitio web catálogo para vender lámparas, interruptores, focos y tomacorrientes, con carrito de compras y checkout por WhatsApp.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción (carpeta dist/)
npm run preview  # previsualizar el build
npm run lint     # linter
```

## Cómo personalizar el sitio

### 1. Datos de contacto y WhatsApp

Edita `src/lib/site.ts`:

- `whatsappNumber`: número de WhatsApp del negocio (código de país + número, sin `+` ni espacios, ej. `51987654321`).
- `phoneDisplay`, `email`, `address`, `hours`: se muestran en el header, footer y página de contacto.
- `instagram`, `facebook`, `tiktok`: enlaces a redes sociales.

### 2. Productos del catálogo

Edita `src/data/products.ts`. Cada producto tiene:

```ts
{
  id: 'lam-001',
  slug: 'lampara-colgante-industrial-negra', // usado en la URL /producto/:slug
  name: 'Lámpara Colgante Industrial Negra',
  category: 'lamparas', // 'lamparas' | 'interruptores' | 'focos' | 'tomacorrientes'
  price: 89.9,
  oldPrice: 119.9, // opcional, para mostrar descuento
  sku: 'LMP-001',
  badge: 'Oferta', // opcional: 'Nuevo' | 'Oferta' | 'Más vendido'
  description: '...',
  features: ['...'],
  palette: 0, // 0-5, color de fondo del placeholder visual
}
```

Los precios y productos actuales son **de ejemplo** — reemplázalos por tu inventario real.

### 3. Fotos reales de productos

Por ahora cada producto usa un ícono decorativo como marcador visual (`src/components/ProductImage.tsx`), ya que no se contaba con fotografías reales. Para usar fotos reales:

1. Coloca las imágenes en `public/productos/` (ej. `public/productos/lam-001.jpg`).
2. Agrega un campo `image: '/productos/lam-001.jpg'` al producto en `products.ts`.
3. Actualiza `ProductImage.tsx` para mostrar `<img src={image} />` cuando el campo exista, o pide ayuda para hacerlo.

### 4. Categorías

Las 4 categorías (Lámparas, Interruptores, Focos, Tomacorrientes) están definidas en `src/data/categories.ts`. Se puede agregar una categoría nueva ahí y en el tipo `CategoryId`.

## Cómo funciona el carrito y el checkout

El carrito se guarda en `localStorage` del navegador (no requiere backend). Al finalizar el pedido, se genera automáticamente un mensaje de WhatsApp con el detalle de los productos y el total, y se abre `wa.me` con ese mensaje precargado para coordinar el pago y envío directamente con el cliente.

## Stack técnico

- React 19 + TypeScript + Vite
- React Router
- Tailwind CSS v4
- lucide-react (iconos)
