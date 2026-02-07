import Image from 'next/image'
import { strategicPartners } from '../lib/strategicPartners'

type Props = {
  className?: string
}

export function LogoCarousel({ className }: Props) {
  // Duplicate list for seamless loop
  const items = [...strategicPartners, ...strategicPartners]

  return (
    <div
      className={[
        'relative overflow-hidden',
        // soft edges like the original carousel
        'before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-10 before:bg-gradient-to-r before:from-white before:to-transparent',
        'after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-10 after:bg-gradient-to-l after:from-white after:to-transparent',
        'dark:before:from-zinc-950 dark:after:from-zinc-950',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className="flex w-max items-center gap-10 py-4 [animation:logo-marquee_26s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:[animation:none]"
        aria-label="Partner Logos"
      >
        {items.map((p, idx) => (
          <div key={`${p.src}-${idx}`} className="flex items-center">
            <Image
              src={p.src}
              alt={p.name}
              width={240}
              height={120}
              className="h-8 w-auto opacity-80 grayscale transition hover:opacity-100 dark:invert md:h-10"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes logo-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}

