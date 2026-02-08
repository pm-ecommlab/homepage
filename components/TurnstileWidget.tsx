import Script from 'next/script'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        params: {
          sitekey: string
          theme?: 'light' | 'dark' | 'auto'
          callback?: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: () => void
        },
      ) => string
      reset: (widgetId?: string) => void
    }
  }
}

type Props = {
  siteKey: string
  theme?: 'light' | 'dark' | 'auto'
  onToken: (token: string) => void
  onReady?: () => void
  className?: string
}

export function TurnstileWidget({ siteKey, theme = 'auto', onToken, onReady, className }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const widgetIdRef = useRef<string | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let cancelled = false

    function tryRender() {
      if (cancelled) return
      if (!window.turnstile) return
      if (widgetIdRef.current) return

      widgetIdRef.current = window.turnstile.render(host as HTMLElement, {
        sitekey: siteKey,
        theme,
        callback: (token) => onToken(token),
        'expired-callback': () => onToken(''),
        'error-callback': () => onToken(''),
      })
      onReady?.()
    }

    tryRender()
    const t = window.setInterval(tryRender, 250)
    return () => {
      cancelled = true
      window.clearInterval(t)
      try {
        if (window.turnstile && widgetIdRef.current) window.turnstile.reset(widgetIdRef.current)
      } catch {
        // ignore
      }
      widgetIdRef.current = null
    }
  }, [onReady, onToken, siteKey, theme])

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" />
      <div className={className}>
        <div ref={hostRef} />
      </div>
    </>
  )
}

