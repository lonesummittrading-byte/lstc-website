import { createClientComponentClient, createServerComponentClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'

// Client-side Supabase client
export const createClient = () =>
  createClientComponentClient<Database>()

// Server-side Supabase client
export const createServerClient = () =>
  createServerComponentClient<Database>({ cookies })

// Admin client with service role key (use server-side only)
export const createAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  return createClientComponentClient<Database>({
    supabaseUrl,
    supabaseKey: supabaseServiceKey,
  })
}
