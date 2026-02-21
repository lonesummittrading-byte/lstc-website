import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export const MARKETS = {
  // Indices
  NQ: { name: 'NASDAQ (NQ)', type: 'index', hasMicro: true },
  MNQ: { name: 'Micro NASDAQ (MNQ)', type: 'index', isMicro: true },
  ES: { name: 'S&P 500 (ES)', type: 'index', hasMicro: true },
  MES: { name: 'Micro S&P 500 (MES)', type: 'index', isMicro: true },

  // Metals
  GC: { name: 'Gold (GC)', type: 'metal', hasMicro: true },
  MGC: { name: 'Micro Gold (MGC)', type: 'metal', isMicro: true },
  SI: { name: 'Silver (SI)', type: 'metal', hasMicro: false },
  HG: { name: 'Copper (HG)', type: 'metal', hasMicro: false },

  // Currencies
  '6A': { name: 'Australian Dollar (6A)', type: 'currency', hasMicro: false },
  '6B': { name: 'British Pound (6B)', type: 'currency', hasMicro: false },
  '6C': { name: 'Canadian Dollar (6C)', type: 'currency', hasMicro: false },
  '6E': { name: 'Euro (6E)', type: 'currency', hasMicro: false },

  // Crypto
  BTC: { name: 'Bitcoin (BTC)', type: 'crypto', hasMicro: true },
  MBT: { name: 'Micro Bitcoin (MBT)', type: 'crypto', isMicro: true },
  ETH: { name: 'Ethereum (ETH)', type: 'crypto', hasMicro: true },
  MET: { name: 'Micro Ethereum (MET)', type: 'crypto', isMicro: true },
} as const

export type MarketSymbol = keyof typeof MARKETS
