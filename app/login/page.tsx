'use client'
import { supabase } from '../lib/supabase'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Redirect to dashboard
    window.location.href = '/dashboard'
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#050A14] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">
            Singharachchi Sir
          </h1>
          <p className="font-noto-si text-[#A0192D] text-sm font-semibold">
            කලා ලොවේ රජ විෂය — Media
          </p>
        </div>

        <h2 className="font-noto-si text-xl font-bold mb-6 text-center">
          පිවිසෙන්න · Login
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#A0192D]"
            placeholder="your@email.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#A0192D]"
            placeholder="••••••••"
          />
        </div>
        <div className="text-right mb-6">
  <a href="/reset-password" className="font-noto-si text-sm text-[#A0192D] hover:underline">
    Password අමතකද? · Forgot Password?
  </a>
</div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="font-noto-si w-full rounded-lg bg-linear-to-r from-[#B41F36] to-[#8E1327] py-3 font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {loading ? 'පිවිසෙමින්...' : 'පිවිසෙන්න · Login'}
        </button>
 

        <p className="font-noto-si text-center text-sm text-gray-400 mt-4">
          ගිණුමක් නැද්ද?{' '}
          <a href="/register" className="text-[#A0192D] font-semibold hover:underline">
            ලියාපදිංචි වන්න
          </a>
        </p>
      </div>
    </main>
  )
}