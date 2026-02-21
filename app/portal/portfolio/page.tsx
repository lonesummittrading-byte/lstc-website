import { createServerClient } from '@/lib/supabase'
import { formatCurrency } from '@/lib/utils'

export default async function PortfolioPage() {
  const supabase = createServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: portfolio } = await supabase
    .from('portfolios')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (!portfolio) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-4">Your Portfolio</h1>
        <div className="bg-slate-900 rounded-lg p-8 text-center border border-slate-800">
          <p className="text-gray-400">
            No portfolio available yet. Submit your preferences and we'll create a custom portfolio for you.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Your Custom Portfolio</h1>
      <p className="text-gray-400 mb-8">Curated by LSTC based on your preferences</p>

      <div className="bg-slate-900 rounded-lg p-8 border border-slate-800 space-y-6">
        {/* Pass Probability */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-1">Pass Probability</h3>
          <p className="text-3xl font-bold text-green-400">{portfolio.pass_probability}%</p>
        </div>

        {/* Monte Carlo Estimates */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">Monte Carlo High</h3>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(portfolio.monte_carlo_high || 0)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">Monte Carlo Low</h3>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(portfolio.monte_carlo_low || 0)}
            </p>
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">Max Drawdown/Session</h3>
            <p className="text-xl font-semibold text-white">
              {formatCurrency(portfolio.max_drawdown_per_session || 0)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">Peak-to-Trough Estimate</h3>
            <p className="text-xl font-semibold text-white">
              {formatCurrency(portfolio.peak_to_trough_estimate || 0)}
            </p>
          </div>
        </div>

        {/* P&L Probability */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-1">Target P&L Probability</h3>
          <p className="text-2xl font-bold text-blue-400">{portfolio.pnl_probability}%</p>
        </div>

        {/* Suggested Contracts */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Suggested Contracts</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(portfolio.suggested_contracts as Record<string, number>).map(([market, contracts]) => (
              <div key={market} className="bg-slate-800 rounded px-4 py-2">
                <p className="text-xs text-gray-400">{market}</p>
                <p className="text-lg font-bold text-white">{contracts}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        {portfolio.notes && (
          <div className="pt-4 border-t border-slate-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Notes from LSTC</h3>
            <p className="text-gray-300">{portfolio.notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}
