type LogoProps = {
  variant?: 'full' | 'mark'
  className?: string
  dark?: boolean
}

export function BulbMark({ className = '', outline = '#0b0b0c' }: { className?: string; outline?: string }) {
  return (
    <svg viewBox="0 0 120 150" className={className} aria-hidden="true">
      <g stroke="#d4af37" strokeWidth="3.5" strokeLinecap="round">
        <line x1="60" y1="4" x2="60" y2="16" />
        <line x1="27" y1="14" x2="35" y2="24" />
        <line x1="93" y1="14" x2="85" y2="24" />
        <line x1="10" y1="46" x2="24" y2="46" />
        <line x1="110" y1="46" x2="96" y2="46" />
        <line x1="16" y1="78" x2="27" y2="72" />
        <line x1="104" y1="78" x2="93" y2="72" />
      </g>
      <path
        d="M60 22c-21 0-35 15-35 33 0 13 7.5 21 14 27.5 4.5 4.5 7 8.5 7 13.5h28c0-5 2.5-9 7-13.5 6.5-6.5 14-14.5 14-27.5 0-18-14-33-35-33z"
        fill="none"
        stroke={outline}
        strokeWidth="4.5"
      />
      <path
        d="M46 47l7-7c1.6-1.6 4.2-1.6 5.8 0 1.4 1.4 1.6 3.6.4 5.2L56 50h8l-3.2-4.8c-1.2-1.6-1-3.8.4-5.2 1.6-1.6 4.2-1.6 5.8 0l7 7"
        fill="none"
        stroke="#d4af37"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="60" y1="50" x2="60" y2="86" stroke="#d4af37" strokeWidth="2.6" strokeLinecap="round" />
      <text x="60" y="80" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight={600} fontSize="15" fill="#d4af37">
        S
      </text>
      <g fill={outline}>
        <rect x="47" y="97" width="26" height="6" rx="2" />
        <rect x="47" y="106" width="26" height="6" rx="2" />
        <rect x="47" y="115" width="26" height="6" rx="2" />
        <path d="M49 124h22c0 6.5-4.9 11-11 11s-11-4.5-11-11z" />
      </g>
    </svg>
  )
}

export default function Logo({ variant = 'full', className = '', dark = false }: LogoProps) {
  const textColor = dark ? 'text-white' : 'text-ink'
  const subColor = dark ? 'text-white/70' : 'text-ink/70'

  if (variant === 'mark') {
    return <BulbMark className={className || 'h-10 w-auto'} />
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <BulbMark className="h-12 w-auto shrink-0 sm:h-14" outline={dark ? '#ffffff' : '#0b0b0c'} />
      <div className="leading-none">
        <div className={`font-serif text-2xl tracking-wide sm:text-3xl ${textColor}`}>
          M<span className="text-gold">&amp;</span>S
        </div>
        <div className={`mt-0.5 text-[0.6rem] font-semibold tracking-[0.35em] sm:text-xs ${subColor}`}>
          ILUMINARIAS
        </div>
      </div>
    </div>
  )
}
