import { createServerClient } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export default async function AdminClientsPage() {
  const supabase = createServerClient()

  // Get all clients with their preferences and payment info
  const { data: clients } = await supabase
    .from('users')
    .select(`
      id,
      email,
      created_at,
      client_preferences (*),
      payments (
        consultation_paid,
        subscription_status,
        subscription_tier
      )
    `)
    .eq('is_admin', false)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Client Management</h1>
          <p className="text-gray-400">View and manage all clients</p>
        </div>
        <div className="text-sm text-gray-500">
          Total clients: {clients?.length || 0}
        </div>
      </div>

      <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Preferences</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Consultation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Subscription</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {clients?.map((client) => (
              <tr key={client.id} className="hover:bg-slate-800/50">
                <td className="px-6 py-4 text-sm text-white">{client.email}</td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {formatDate(client.created_at)}
                </td>
                <td className="px-6 py-4 text-sm">
                  {client.client_preferences && client.client_preferences.length > 0 ? (
                    <span className="text-green-400">✓ Submitted</span>
                  ) : (
                    <span className="text-gray-500">Not yet</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  {client.payments?.[0]?.consultation_paid ? (
                    <span className="text-green-400">✓ Paid</span>
                  ) : (
                    <span className="text-gray-500">Not paid</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  {client.payments?.[0]?.subscription_status === 'active' ? (
                    <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded text-xs">
                      Active ({client.payments[0].subscription_tier})
                    </span>
                  ) : (
                    <span className="text-gray-500">Inactive</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  <Link
                    href={`/admin/portfolio/${client.id}`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Upload Portfolio →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
