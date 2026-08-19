interface LogoProps {
  size?: number
  className?: string
  monochrome?: boolean
}

/**
 * Brand mark: an open ring reading as a "C" (CareerCompass) whose sweep
 * breaks into a needle tip, like a compass bearing that resolves into a
 * direction rather than a closed loop.
 */
export function Logo({ size = 28, className = '', monochrome = false }: LogoProps) {
  const ringColor = monochrome ? 'currentColor' : '#0A2540'
  const tipColor = monochrome ? 'currentColor' : '#635BFF'
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} role="img" aria-label="CareerCompass">
      <circle
        cx="20"
        cy="20"
        r="14"
        fill="none"
        stroke={ringColor}
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeDasharray="66 22"
      />
      <path d="M 19 7.5 L 30 1.5 L 23.5 11.5 Z" fill={tipColor} />
    </svg>
  )
}
