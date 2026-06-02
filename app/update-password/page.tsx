'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleUpdate = async () => {
    if (password !== confirm) {
      setError('Passwords do not match!')
      return
    }
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.updateUser({ password })

    if (error) setError(error.message)
    else setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#F5F6FA] flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-[#0B1F4A] mb-2">
            Password සාර්ථකව වෙනස් කෙරිණි!
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            ඔබේ නව password එකෙන් login වන්න.
          </p>
          <a href="/login" className="bg-[#0B1F4A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1A3A7A] transition">
            Login වෙන්න
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

        <h2 className="text-xl font-bold text-[#0B1F4A] mb-6 text-center">
          නව Password සකසන්න
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            නව Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#0B1F4A] text-gray-900"
            placeholder="••••••••"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password තහවුරු කරන්න
          </label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#0B1F4A] text-gray-900"
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-[#0B1F4A] text-white py-3 rounded-lg font-semibold hover:bg-[#1A3A7A] transition disabled:opacity-50"
        >
          {loading ? 'සකසමින්...' : 'Password වෙනස් කරන්න'}
        </button>
      </div>
    </main>
  )
}