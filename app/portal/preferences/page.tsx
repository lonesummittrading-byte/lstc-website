'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { MARKETS, type MarketSymbol } from '@/lib/utils'

export default function PreferencesPage() {
  const [mode, setMode] = useState<'eval' | 'funded'>('eval')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  // Slider states (Eval mode)
  const [evalProfitTarget, setEvalProfitTarget] = useState(5000)
  const [evalSessionDrawdown, setEvalSessionDrawdown] = useState(2000)
  const [evalPeakDrawdown, setEvalPeakDrawdown] = useState(3000)
  const [evalContracts, setEvalContracts] = useState(5)

  // Slider states (Funded mode)
  const [fundedProfitTarget, setFundedProfitTarget] = useState(10000)
  const [fundedSessionDrawdown, setFundedSessionDrawdown] = useState(4000)
  const [fundedPeakDrawdown, setFundedPeakDrawdown] = useState(6000)
  const [fundedContracts, setFundedContracts] = useState(10)

  // Selected markets
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([])

  const toggleMarket = (symbol: string) => {
    setSelectedMarkets(prev =>
      prev.includes(symbol)
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    )
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error } = await supabase
        .from('client_preferences')
        .upsert({
          user_id: user.id,
          current_mode: mode,
          eval_profit_target: evalProfitTarget,
          eval_session_max_drawdown: evalSessionDrawdown,
          eval_peak_to_trough_max: evalPeakDrawdown,
          eval_contracts: evalContracts,
          funded_profit_target: fundedProfitTarget,
          funded_session_max_drawdown: fundedSessionDrawdown,
          funded_peak_to_trough_max: fundedPeakDrawdown,
          funded_contracts: fundedContracts,
          selected_markets: selectedMarkets,
        })

      if (error) throw error

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      alert('Error saving preferences: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Portfolio Preferences</h1>
      <p className="text-gray-400 mb-8">
        Configure your trading parameters to receive a custom portfolio
      </p>

      {saved && (
        <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-lg text-green-200">
          ✓ Preferences saved successfully!
        </div>
      )}

      {/* Mode Toggle */}
      <div className="mb-8 flex gap-4">
        <button
          onClick={() => setMode('eval')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            mode === 'eval'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
          }`}
        >
          Evaluation
        </button>
        <button
          onClick={() => setMode('funded')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            mode === 'funded'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
          }`}
        >
          Funded
        </button>
      </div>

      {/* Sliders */}
      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Profit Target: ${mode === 'eval' ? evalProfitTarget : fundedProfitTarget}
          </label>
          <input
            type="range"
            min="1000"
            max="50000"
            step="500"
            value={mode === 'eval' ? evalProfitTarget : fundedProfitTarget}
            onChange={(e) =>
              mode === 'eval'
                ? setEvalProfitTarget(Number(e.target.value))
                : setFundedProfitTarget(Number(e.target.value))
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Session Max Drawdown: ${mode === 'eval' ? evalSessionDrawdown : fundedSessionDrawdown}
          </label>
          <input
            type="range"
            min="500"
            max="20000"
            step="500"
            value={mode === 'eval' ? evalSessionDrawdown : fundedSessionDrawdown}
            onChange={(e) =>
              mode === 'eval'
                ? setEvalSessionDrawdown(Number(e.target.value))
                : setFundedSessionDrawdown(Number(e.target.value))
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Peak-to-Trough Max: ${mode === 'eval' ? evalPeakDrawdown : fundedPeakDrawdown}
          </label>
          <input
            type="range"
            min="500"
            max="30000"
            step="500"
            value={mode === 'eval' ? evalPeakDrawdown : fundedPeakDrawdown}
            onChange={(e) =>
              mode === 'eval'
                ? setEvalPeakDrawdown(Number(e.target.value))
                : setFundedPeakDrawdown(Number(e.target.value))
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Contracts (minis): {mode === 'eval' ? evalContracts : fundedContracts}
            <span className="text-gray-500 text-xs ml-2">
              (= {(mode === 'eval' ? evalContracts : fundedContracts) * 10} micros)
            </span>
          </label>
          <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={mode === 'eval' ? evalContracts : fundedContracts}
            onChange={(e) =>
              mode === 'eval'
                ? setEvalContracts(Number(e.target.value))
                : setFundedContracts(Number(e.target.value))
            }
            className="w-full"
          />
        </div>
      </div>

      {/* Market Toggles */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Select Markets</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(MARKETS).map(([symbol, info]) => (
            <button
              key={symbol}
              onClick={() => toggleMarket(symbol)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                selectedMarkets.includes(symbol)
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
              }`}
            >
              {info.name}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading || selectedMarkets.length === 0}
        className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
      >
        {loading ? 'Saving...' : 'Save Preferences'}
      </button>

      {selectedMarkets.length === 0 && (
        <p className="mt-2 text-sm text-gray-500 text-center">
          Please select at least one market
        </p>
      )}
    </div>
  )
}
