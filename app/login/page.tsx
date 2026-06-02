'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

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
    <main className="min-h-screen bg-[#F5F6FA] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0B1F4A]">
            Singharachchi Sir
          </h1>
          <p className="text-[#A0192D] text-sm font-semibold">
            කලා ලොවේ රජ විෂය — Media
          </p>
        </div>

        <h2 className="text-xl font-bold text-[#0B1F4A] mb-6 text-center">
          පිවිසෙන්න · Login
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#0B1F4A]"
            placeholder="your@email.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#0B1F4A]"
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#0B1F4A] text-white py-3 rounded-lg font-semibold hover:bg-[#1A3A7A] transition disabled:opacity-50"
        >
          {loading ? 'පිවිසෙමින්...' : 'පිවිසෙන්න · Login'}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          ගිණුමක් නැද්ද?{' '}
          <a href="/register" className="text-[#A0192D] font-semibold hover:underline">
            ලියාපදිංචි වන්න
          </a>
        </p>
      </div>
    </main>
  )
}