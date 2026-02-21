import { createServerClient } from '@/lib/supabase'
import { formatCurrency, formatDate } from '@/lib/utils'

export default async function SubscriptionPage() {
  const supabase = createServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: payment } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Subscription</h1>
      <p className="text-gray-400 mb-8">Manage your subscription and billing</p>

      <div className="space-y-6">
        {/* Consultation Status */}
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
          <h2 className="text-xl font-semibold text-white mb-4">Consultation</h2>
          {payment?.consultation_paid ? (
            <div className="flex items-center gap-3">
              <span className="text-green-400 text-2xl">✓</span>
              <div>
                <p className="text-white font-medium">Paid</p>
                <p className="text-sm text-gray-400">
                  {formatDate(payment.consultation_paid_at!)}
                </p>
              </div>
            </div>
          ) : (
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
              Pay for Consultation
            </button>
          )}
        </div>

        {/* Strategy Subscription */}
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
          <h2 className="text-xl font-semibold text-white mb-4">Strategy Access</h2>
          {payment?.subscription_status === 'active' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-sm font-medium">
                  Active
                </span>
                <span className="text-gray-400">
                  {payment.subscription_tier === 'discounted' ? 'Discounted Rate' : 'Full Price'}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-400">Next billing date</p>
                <p className="text-white font-medium">
                  {formatDate(payment.subscription_current_period_end!)}
                </p>
              </div>

              <button className="px-6 py-3 bg-red-900 hover:bg-red-800 text-white font-semibold rounded-lg">
                Cancel Subscription
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-400 mb-4">
                No active subscription. Subscribe to access our trading strategies.
              </p>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
                Subscribe Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
