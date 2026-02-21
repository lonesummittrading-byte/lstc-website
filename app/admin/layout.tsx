import { createServerClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminLayout({
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

  // Check if user is admin
  const { data: user } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', session.user.id)
    .single()

  if (!user?.is_admin) {
    redirect('/portal/preferences')
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <nav className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-blue-500 font-bold text-lg">ADMIN</span>
              <div className="flex space-x-8 ml-8">
                <Link href="/admin/clients" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-white">
                  Clients
                </Link>
                <Link href="/portal/preferences" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-white">
                  Back to Portal
                </Link>
              </div>
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
