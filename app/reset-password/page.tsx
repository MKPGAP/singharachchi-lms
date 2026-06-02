'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleReset = async () => {
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/update-password'
    })

    if (error) setError(error.message)
    else setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#F5F6FA] flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md text-center">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-xl font-bold text-[#0B1F4A] mb-2">
            Email යවා ඇත!
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            ඔබගේ email එකට password reset link එකක් යවා ඇත. Email එක බලා password reset කරන්න.
          </p>
          <a href="/login" className="bg-[#0B1F4A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1A3A7A] transition">
            Login වෙත යන්න
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F6FA] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0B1F4A]">
            Singharachchi Sir
          </h1>
          <p className="text-[#A0192D] text-sm font-semibold">
            කලා ලොවේ රජ විෂය — Media
          </p>
        </div>

        <h2 className="text-xl font-bold text-[#0B1F4A] mb-2 text-center">
          Password Reset
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          ඔබගේ email ඇතුළත් කරන්න. Password reset link එකක් යවනු ලැබේ.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#0B1F4A] text-gray-900"
            placeholder="your@email.com"
          />
        </div>

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-[#A0192D] text-white py-3 rounded-lg font-semibold hover:bg-[#8a1526] transition disabled:opacity-50"
        >
          {loading ? 'යවමින්...' : 'Reset Link යවන්න'}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          මතක ඇද්ද?{' '}
          <a href="/login" className="text-[#A0192D] font-semibold hover:underline">
            Login වෙන්න
          </a>
        </p>
      </div>
    </main>
  )
}