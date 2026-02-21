import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Lone Summit Trading Company
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional algorithmic futures trading strategies designed to help you pass evaluations and achieve consistent profitability
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/login"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>

            <Link
              href="#features"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors border border-slate-600"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Why Choose LSTC?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 hover:border-blue-600 transition-colors">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Custom Portfolios</h3>
              <p className="text-gray-400">
                Personalized trading strategies tailored to your risk profile, capital requirements, and market preferences
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 hover:border-blue-600 transition-colors">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Monte Carlo Analysis</h3>
              <p className="text-gray-400">
                Rigorous statistical modeling to estimate your probability of passing evaluations and achieving profit targets
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 hover:border-blue-600 transition-colors">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Proven Strategies</h3>
              <p className="text-gray-400">
                Battle-tested algorithms optimized for futures markets including indices, metals, currencies, and crypto
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            How It Works
          </h2>

          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Submit Your Preferences</h3>
                <p className="text-gray-400">
                  Tell us your profit targets, risk parameters, and preferred markets
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Get Your Custom Portfolio</h3>
                <p className="text-gray-400">
                  Receive a curated portfolio with Monte Carlo analysis and suggested contract sizes
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Access the Strategy</h3>
                <p className="text-gray-400">
                  Subscribe to use our NinjaTrader strategies with your custom settings
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>&copy; 2026 Lone Summit Trading Company. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
