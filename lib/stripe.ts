import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

// Stripe product IDs (you'll set these after creating products in Stripe Dashboard)
export const STRIPE_PRODUCTS = {
  CONSULTATION: process.env.STRIPE_CONSULTATION_PRICE_ID || 'price_consultation',
  STRATEGY_DISCOUNTED: process.env.STRIPE_STRATEGY_DISCOUNTED_PRICE_ID || 'price_strategy_discounted',
  STRATEGY_FULL_PRICE: process.env.STRIPE_STRATEGY_FULL_PRICE_ID || 'price_strategy_full',
}
