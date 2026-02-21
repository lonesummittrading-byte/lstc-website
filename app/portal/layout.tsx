import { createServerClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <nav className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link href="/portal/preferences" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-white">
                Preferences
              </Link>
              <Link href="/portal/portfolio" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-white">
                Portfolio
              </Link>
              <Link href="/portal/subscription" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-white">
                Subscription
              </Link>
            </div>
            <div className="flex items-center">
              <form action="/api/auth/signout" method="post">
                <button type="submit" className="text-sm text-gray-400 hover:text-white">
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}
