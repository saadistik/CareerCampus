import heroImage from '../assets/images/hero-graphic.png'

/**
 * User-supplied ribbon asset, background removed (unpremultiplied against
 * white, not a blend-mode trick — a real transparent cutout). Shown at its
 * full aspect ratio so nothing is cropped.
 */
export function HeroGraphic({ className = '' }: { className?: string }) {
  return <img src={heroImage} alt="" aria-hidden="true" className={className} />
}
