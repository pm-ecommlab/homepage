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
      remove?: (widgetId: string) => void
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
  const onTokenRef = useRef<Props['onToken']>(onToken)
  const onReadyRef = useRef<Props['onReady']>(onReady)

  useEffect(() => {
    onTokenRef.current = onToken
    onReadyRef.current = onReady
  }, [onReady, onToken])

  useEffect(() => {
    const hostEl = hostRef.current
    if (!hostEl) return
    const host: HTMLDivElement = hostEl

    let cancelled = false

    function tryRender() {
      if (cancelled) return
      if (!window.turnstile) return
      if (widgetIdRef.current) return

      // Important for React StrictMode + re-renders:
      // ensure the host is empty before rendering a widget.
      host.replaceChildren()

      widgetIdRef.current = window.turnstile.render(host as HTMLElement, {
        sitekey: siteKey,
        theme,
        callback: (token) => onTokenRef.current(token),
        'expired-callback': () => onTokenRef.current(''),
        'error-callback': () => onTokenRef.current(''),
      })
      onReadyRef.current?.()
    }

    tryRender()
    const t = window.setInterval(() => {
      tryRender()
      if (widgetIdRef.current) window.clearInterval(t)
    }, 250)
    return () => {
      cancelled = true
      window.clearInterval(t)
      try {
        if (window.turnstile && widgetIdRef.current) {
          // Prefer remove() (prevents DOM piling up); fallback to reset + manual cleanup.
          window.turnstile.remove?.(widgetIdRef.current)
          window.turnstile.reset(widgetIdRef.current)
        }
      } catch {
        // ignore
      }
      widgetIdRef.current = null
      try {
        host.replaceChildren()
      } catch {
        // ignore
      }
    }
  }, [siteKey, theme])

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
      />
      <div className={className}>
        <div ref={hostRef} />
      </div>
    </>
  )
}

