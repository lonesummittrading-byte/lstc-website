# LSTC Website - Deployment Guide

## ✅ What's Been Built

Your complete LSTC trading platform is ready! Here's what's included:

### Features
- ✨ Modern homepage with hero section
- 🔐 Google OAuth authentication  
- 📊 Client portal with preference submission (eval/funded modes, sliders, market toggles)
- 💼 Portfolio viewing with Monte Carlo stats
- 💳 Subscription management
- 👨‍💼 Admin dashboard (view clients, upload custom portfolios)
- 🔔 Stripe webhook integration for payments
- 🗄️ Complete Supabase database schema

### Tech Stack
- **Frontend**: Next.js 14 + React + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Payments**: Stripe (quarterly subscriptions)
- **Hosting**: Cloudflare Pages (100% free)

---

## 📋 Step-by-Step Setup

### 1. Set Up Supabase (5 minutes)

1. Go to https://supabase.com and create a free account
2. Create a new project
3. Go to **SQL Editor** and run the entire `database/schema.sql` file
4. Go to **Authentication** → **Providers** → Enable **Google**
   - Add your Google OAuth credentials
   - Set redirect URL: `https://your-site.pages.dev/api/auth/callback`
5. Go to **Settings** → **API** and copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key (keep this private!)

### 2. Set Up Stripe (5 minutes)

1. Go to https://stripe.com and create an account
2. Get your API keys from **Developers** → **API keys**:
   - Publishable key
   - Secret key
3. Create products in **Product Catalog**:
   - **Consultation** (one-time payment)
   - **Strategy Access - Discounted** (quarterly subscription)
   - **Strategy Access - Full Price** (quarterly subscription)
4. Copy the Price IDs for each product
5. Set up webhook:
   - Go to **Developers** → **Webhooks**
   - Add endpoint: `https://your-site.pages.dev/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy the webhook signing secret

### 3. Deploy to Cloudflare Pages (10 minutes)

1. **Sign up for Cloudflare Pages**:
   - Go to https://pages.cloudflare.com
   - Sign up (free, no credit card needed)

2. **Connect GitHub**:
   - Click "Create a project"
   - Connect to GitHub
   - Select the `lstc-website` repository

3. **Configure build settings**:
   ```
   Framework preset: Next.js
   Build command: npm run build
   Build output directory: .next
   Root directory: (leave empty)
   ```

4. **Add environment variables** (click "Environment variables"):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   STRIPE_CONSULTATION_PRICE_ID=price_xxxxx
   STRIPE_STRATEGY_DISCOUNTED_PRICE_ID=price_xxxxx
   STRIPE_STRATEGY_FULL_PRICE_ID=price_xxxxx

   NEXT_PUBLIC_SITE_URL=https://your-site.pages.dev
   ADMIN_EMAIL=lonesummittrading@gmail.com
   ```

5. Click **Save and Deploy**

6. Wait for deployment (2-3 minutes)

7. Your site will be live at: `https://lstc-website.pages.dev`

### 4. Make Yourself Admin (1 minute)

1. Visit your deployed site
2. Sign in with Google
3. Go to Supabase **SQL Editor** and run:
   ```sql
   UPDATE users 
   SET is_admin = TRUE 
   WHERE email = 'your-email@gmail.com';
   ```
4. Refresh the site - you'll now see "ADMIN" in the nav

---

## 🎯 Testing Your Site

### As a Client:
1. Visit site → Sign in with Google
2. Go to "Preferences" → Fill sliders, select markets, save
3. Go to "Portfolio" → (empty until you upload one as admin)
4. Go to "Subscription" → (shows status)

### As Admin:
1. Sign in → You'll see "ADMIN" badge
2. Click "Clients" → See all registered users
3. Click "Upload Portfolio" for a client
4. Fill in Monte Carlo stats, suggested contracts, notes
5. Submit → Client can now see their portfolio

---

## 🔧 Customization

### Changing Colors
Edit `tailwind.config.js` to change the blue theme

### Changing Markets
Edit `lib/utils.ts` → `MARKETS` object

### Changing Slider Increments
Edit `app/portal/preferences/page.tsx` → `step` attributes

### Adding Custom Domain
1. Go to Cloudflare Pages → Your project → Custom domains
2. Add your domain (e.g., lonesummittrading.com)
3. Update DNS records as shown

---

## 🆘 Troubleshooting

**Build fails on Cloudflare**:
- Check environment variables are set correctly
- Make sure Node.js version is 18+ (set in Cloudflare settings)

**OAuth not working**:
- Check Supabase redirect URL matches your deployed URL
- Enable Google provider in Supabase Auth settings

**Database errors**:
- Make sure you ran the entire `database/schema.sql` file
- Check RLS policies are enabled

**Stripe webhooks not firing**:
- Verify webhook URL in Stripe dashboard
- Check webhook signing secret is correct
- Test using Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

---

## 📞 Support

For questions or issues, contact: lonesummittrading@gmail.com

---

## 🚀 What's Next?

Optional enhancements you can add later:
- Email notifications (via SendGrid or Resend)
- File uploads for strategy delivery
- Analytics dashboard for admin
- Client messaging system
- PDF portfolio export

Your site is production-ready as-is! 🎉
