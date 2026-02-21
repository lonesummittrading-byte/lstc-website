'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function UploadPortfolioPage({ params }: { params: { userId: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    pass_probability: '',
    monte_carlo_high: '',
    monte_carlo_low: '',
    max_drawdown_per_session: '',
    peak_to_trough_estimate: '',
    pnl_probability: '',
    notes: '',
  })
  const [contracts, setContracts] = useState<Record<string, string>>({})

  const addContractRow = () => {
    const newMarket = prompt('Market symbol (e.g., NQ, ES, BTC):')
    if (newMarket) {
      setContracts(prev => ({ ...prev, [newMarket]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      const supabase = createClient()

      // Convert contracts to numbers
      const suggested_contracts = Object.entries(contracts).reduce((acc, [market, value]) => {
        if (value) acc[market] = Number(value)
        return acc
      }, {} as Record<string, number>)

      const { error } = await supabase
        .from('portfolios')
        .insert({
          user_id: params.userId,
          curated_by_admin: true,
          pass_probability: Number(formData.pass_probability),
          monte_carlo_high: Number(formData.monte_carlo_high),
          monte_carlo_low: Number(formData.monte_carlo_low),
          max_drawdown_per_session: Number(formData.max_drawdown_per_session),
          peak_to_trough_estimate: Number(formData.peak_to_trough_estimate),
          pnl_probability: Number(formData.pnl_probability),
          suggested_contracts,
          notes: formData.notes || null,
        })

      if (error) throw error

      alert('Portfolio uploaded successfully!')
      router.push('/admin/clients')
    } catch (err: any) {
      alert('Error uploading portfolio: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Upload Custom Portfolio</h1>
      <p className="text-gray-400 mb-8">Create a curated portfolio for this client</p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900 rounded-lg p-8 border border-slate-800">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Pass Probability (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.pass_probability}
              onChange={(e) => setFormData(prev => ({ ...prev, pass_probability: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              P&L Probability (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.pnl_probability}
              onChange={(e) => setFormData(prev => ({ ...prev, pnl_probability: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Monte Carlo High ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.monte_carlo_high}
              onChange={(e) => setFormData(prev => ({ ...prev, monte_carlo_high: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Monte Carlo Low ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.monte_carlo_low}
              onChange={(e) => setFormData(prev => ({ ...prev, monte_carlo_low: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Max Drawdown/Session ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.max_drawdown_per_session}
              onChange={(e) => setFormData(prev => ({ ...prev, max_drawdown_per_session: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Peak-to-Trough Estimate ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.peak_to_trough_estimate}
              onChange={(e) => setFormData(prev => ({ ...prev, peak_to_trough_estimate: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              required
            />
          </div>
        </div>

        {/* Suggested Contracts */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium text-gray-300">
              Suggested Contracts
            </label>
            <button
              type="button"
              onClick={addContractRow}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg"
            >
              + Add Market
            </button>
          </div>
          <div className="space-y-3">
            {Object.entries(contracts).map(([market, value]) => (
              <div key={market} className="flex gap-3">
                <input
                  type="text"
                  value={market}
                  disabled
                  className="w-32 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
                <input
                  type="number"
                  placeholder="Contract count"
                  value={value}
                  onChange={(e) => setContracts(prev => ({ ...prev, [market]: e.target.value }))}
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Notes (optional)
          </label>
          <textarea
            rows={4}
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
            placeholder="Additional notes or recommendations..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
        >
          {loading ? 'Uploading...' : 'Upload Portfolio'}
        </button>
      </form>
    </div>
  )
}
