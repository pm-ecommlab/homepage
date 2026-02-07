import Link from 'next/link'
import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  href: string
  variant?: 'primary' | 'secondary'
  external?: boolean
}>

export function ButtonLink({
  href,
  variant = 'primary',
  external = false,
  children,
}: Props) {
  const base =
    'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950'
  const styles =
    variant === 'primary'
      ? 'bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:ring-zinc-900 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus-visible:ring-white'
      : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus-visible:ring-zinc-300 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-700'

  if (external) {
    return (
      <a className={`${base} ${styles}`} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }

  return (
    <Link className={`${base} ${styles}`} href={href}>
      {children}
    </Link>
  )
}

