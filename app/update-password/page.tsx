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
      <main className="min-h-screen bg-[#050A14] text-white flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="font-noto-si text-xl font-bold mb-2">
            Password සාර්ථකව වෙනස් කෙරිණි!
          </h2>
          <p className="font-noto-si text-gray-300 text-sm mb-6">
            ඔබේ නව password එකෙන් login වන්න.
          </p>
          <a href="/login" className="font-noto-si inline-block rounded-lg bg-linear-to-r from-[#B41F36] to-[#8E1327] px-6 py-3 font-semibold text-white transition hover:brightness-110">
            Login වෙන්න
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#050A14] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">
            Singharachchi Sir
          </h1>
          <p className="font-noto-si text-[#A0192D] text-sm font-semibold">
            කලා ලොවේ රජ විෂය — Media
          </p>
        </div>

        <h2 className="font-noto-si text-xl font-bold mb-6 text-center">
          නව Password සකසන්න
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="font-noto-si block text-sm font-medium text-gray-300 mb-1">
            නව Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#A0192D]"
            placeholder="••••••••"
          />
        </div>

        <div className="mb-6">
          <label className="font-noto-si block text-sm font-medium text-gray-300 mb-1">
            Password තහවුරු කරන්න
          </label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#A0192D]"
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="font-noto-si w-full bg-linear-to-r from-[#B41F36] to-[#8E1327] text-white py-3 rounded-lg font-semibold hover:brightness-110 transition disabled:opacity-50"
        >
          {loading ? 'සකසමින්...' : 'Password වෙනස් කරන්න'}
        </button>
      </div>
    </main>
  )
}