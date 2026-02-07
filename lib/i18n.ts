export const appLocales = ['de', 'en'] as const
export type AppLocale = (typeof appLocales)[number]

export function normalizeLocale(locale?: string): AppLocale {
  return locale === 'en' ? 'en' : 'de'
}

export function tr(locale: AppLocale, de: string, en: string) {
  return locale === 'en' ? en : de
}

