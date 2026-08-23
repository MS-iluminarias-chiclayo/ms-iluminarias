import { categoryMap, type CategoryId } from '../data/categories'

const PALETTES = [
  'from-[#1a1a1c] via-[#2b2b2e] to-[#3a3a3d]',
  'from-[#3d3420] via-[#4a3f27] to-[#5a4c2c]',
  'from-[#1c2320] via-[#26332d] to-[#31413a]',
  'from-[#221a1a] via-[#2f2323] to-[#3c2c2c]',
  'from-[#1a1c22] via-[#242833] to-[#2e3442]',
  'from-[#231d15] via-[#33291b] to-[#42351f]',
]

type ProductImageProps = {
  category: CategoryId
  className?: string
  iconClassName?: string
}

export default function ProductImage({ category, className = '', palette = 0, iconClassName = '' }: ProductImageProps & { palette?: number }) {
  const cat = categoryMap[category]
  const Icon = cat.icon
  const gradient = PALETTES[palette % PALETTES.length]

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}>
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage:
          'repeating-linear-gradient(45deg, #d4af37 0, #d4af37 1px, transparent 1px, transparent 14px)',
      }} />
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/10 blur-xl" />
      <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-gold/10 blur-xl" />
      <Icon className={`relative text-gold/90 drop-shadow-sm ${iconClassName || 'h-12 w-12'}`} strokeWidth={1.25} />
    </div>
  )
}
