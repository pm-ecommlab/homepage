import Image from 'next/image'
import { servicePartners } from '../lib/servicePartners'

export function PartnerLogos() {
  return (
    <section className="mt-10">
      <div className="grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-5">
        {servicePartners.map((p, idx) => (
          <div key={`${p.src}-${idx}`} className="flex justify-center md:justify-start">
            <Image
              src={p.src}
              alt={p.name}
              width={250}
              height={50}
              className="h-8 w-auto opacity-80 grayscale transition hover:opacity-100 dark:invert md:h-9"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

