# LSTC Website - Lone Summit Trading Company

Modern trading strategy platform built with Next.js, Supabase, and Stripe.

## Features

- **Client Portal**: Submit trading preferences with eval/funded modes
- **Google OAuth**: Secure authentication
- **Portfolio Management**: Custom portfolio curation and delivery
- **Subscription Management**: Quarterly billing with Stripe
- **Admin Dashboard**: Manage clients and portfolios

## Tech Stack

- **Frontend**: Next.js 14 (React, TypeScript, Tailwind CSS)
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Payments**: Stripe (quarterly subscriptions)
- **Hosting**: Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Stripe account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lonesummittrading-byte/lstc-website.git
   cd lstc-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

   Fill in your Supabase and Stripe credentials in `.env.local`

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Database Setup

Run the SQL schema in `database/schema.sql` in your Supabase SQL editor to create all required tables.

## Deployment

### Cloudflare Pages

1. Push code to GitHub
2. Connect repository to Cloudflare Pages
3. Configure build settings:
   - **Framework**: Next.js
   - **Build command**: `npm run build`
   - **Output directory**: `.next`
4. Add environment variables in Cloudflare dashboard

## Environment Variables

See `.env.local.example` for required environment variables.

## License

Proprietary - Lone Summit Trading Company
