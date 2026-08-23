import type { LucideIcon } from 'lucide-react'
import { Lightbulb, Plug, ToggleLeft, Lamp } from 'lucide-react'

export type CategoryId = 'lamparas' | 'interruptores' | 'focos' | 'tomacorrientes'

export type Category = {
  id: CategoryId
  label: string
  singular: string
  description: string
  icon: LucideIcon
}

export const categories: Category[] = [
  {
    id: 'lamparas',
    label: 'Lámparas',
    singular: 'Lámpara',
    description: 'Colgantes, de mesa, de pie y arañas para cada ambiente.',
    icon: Lamp,
  },
  {
    id: 'interruptores',
    label: 'Interruptores',
    singular: 'Interruptor',
    description: 'Simples, dobles, dimmer, táctiles y wifi.',
    icon: ToggleLeft,
  },
  {
    id: 'focos',
    label: 'Focos',
    singular: 'Foco',
    description: 'LED, ahorradores, inteligentes y decorativos.',
    icon: Lightbulb,
  },
  {
    id: 'tomacorrientes',
    label: 'Tomacorrientes',
    singular: 'Tomacorriente',
    description: 'Dobles, con USB, exteriores e inteligentes.',
    icon: Plug,
  },
]

export const categoryMap: Record<CategoryId, Category> = categories.reduce(
  (acc, c) => ({ ...acc, [c.id]: c }),
  {} as Record<CategoryId, Category>,
)
