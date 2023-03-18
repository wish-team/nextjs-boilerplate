export const availableLocales = {
  fa: {
    key: 'fa',
    label: 'فارسی',
    direction: 'rtl',
    fontFamily: ['"Peyda"'],
  },
  en: {
    key: 'en',
    label: 'English',
    direction: 'ltr',
    fontFamily: ['"Ridley"', '"Rotunda"'],
  },
  de: {
    key: 'de',
    label: 'Dutch',
    direction: 'ltr',
    fontFamily: ['"Ridley"', '"Rotunda"'],
  },
} as const

export type AvailableLocales = keyof typeof availableLocales
