# M&S Iluminarias

Sitio web catálogo para vender lámparas, interruptores, focos y tomacorrientes, con carrito de compras y checkout por WhatsApp.

## Ver el sitio publicado

El sitio se publica automáticamente en GitHub Pages cada vez que se sube un cambio a este repositorio:

**https://ms-iluminarias-chiclayo.github.io/ms-iluminarias/**

Si el link todavía no carga, es porque falta activar GitHub Pages una sola vez: entra al repositorio en GitHub → **Settings** → **Pages** (menú de la izquierda) → en "Build and deployment", en **Source** elige **GitHub Actions**. Después de eso, cada cambio que se suba se publica solo en 1-2 minutos (puedes ver el progreso en la pestaña **Actions** del repositorio).

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
  id: 'lam-738',
  slug: 'lampara-colgante-led-ola-cromada-50cm', // usado en la URL /producto/:slug
  name: 'Lámpara Colgante LED Ola Cromada 50cm',
  category: 'lamparas', // 'lamparas' | 'interruptores' | 'focos' | 'tomacorrientes'
  price: 179.9,
  oldPrice: 219.9, // opcional, para mostrar descuento
  sku: 'LMP-738',
  badge: 'Oferta', // opcional: 'Nuevo' | 'Oferta' | 'Más vendido'
  description: '...',
  features: ['...'],
  image: '/productos/lam_wave_chrome_738.jpg', // opcional, foto real (ver sección 3)
}
```

**Para editar precios sin instalar nada:** entra al repositorio en GitHub, abre `src/data/products.ts`, haz clic en el ícono de lápiz (editar), busca el producto y cambia el número de `price` (y `oldPrice` si quieres mostrar un precio tachado). Al guardar ("Commit changes") el sitio se reconstruye solo. También puedes agregar productos nuevos copiando el bloque `{ ... }` de otro producto y cambiando sus datos — o simplemente pedírmelo a mí cuando quieras.

Los productos de interruptores y focos siguen siendo de ejemplo (sin foto real todavía) — reemplázalos por tu inventario real cuando tengas los datos y fotos.

### 3. Fotos reales de productos

Los productos de **lámparas** y **tomacorrientes** ya usan fotos reales del catálogo del proveedor, guardadas en `public/productos/`. Los de **interruptores** y **focos** todavía usan un ícono decorativo como marcador visual (`src/components/ProductImage.tsx`) porque aún no se contaba con fotos reales para esas categorías.

Para agregar una foto real a un producto:

1. Coloca la imagen en `public/productos/` (ej. `public/productos/mi-producto.jpg`).
2. Agrega el campo `image: '/productos/mi-producto.jpg'` a ese producto en `products.ts`.

Si no hay campo `image`, el sitio muestra automáticamente el ícono decorativo de la categoría.

### 4. Categorías

Las 4 categorías (Lámparas, Interruptores, Focos, Tomacorrientes) están definidas en `src/data/categories.ts`. Se puede agregar una categoría nueva ahí y en el tipo `CategoryId`.

## Cómo funciona el carrito y el checkout

El carrito se guarda en `localStorage` del navegador (no requiere backend). Al finalizar el pedido, se genera automáticamente un mensaje de WhatsApp con el detalle de los productos y el total, y se abre `wa.me` con ese mensaje precargado para coordinar el pago y envío directamente con el cliente.

## Stack técnico

- React 19 + TypeScript + Vite
- React Router
- Tailwind CSS v4
- lucide-react (iconos)
