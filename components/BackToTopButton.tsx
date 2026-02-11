import { useEffect, useState } from 'react'

type Props = {
  /**
   * Ab welcher Scroll-Position (px) der Button sichtbar wird.
   */
  showAfter?: number
}

export function BackToTopButton({ showAfter = 700 }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      const y =
        typeof window.scrollY === 'number'
          ? window.scrollY
          : document.documentElement.scrollTop || document.body.scrollTop || 0
      setVisible(y > showAfter)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [showAfter])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-900 shadow-lg backdrop-blur transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-50 dark:hover:bg-zinc-950"
      aria-label="Nach oben scrollen"
      title="Nach oben"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M12 4.5a1 1 0 0 1 .7.29l6.5 6.5a1 1 0 0 1-1.4 1.42L13 8.91V19a1 1 0 1 1-2 0V8.91l-4.8 4.8a1 1 0 1 1-1.4-1.42l6.5-6.5a1 1 0 0 1 .7-.29Z"
        />
      </svg>
    </button>
  )
}

