'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleRegister = async () => {
    setLoading(true)
    setError('')
    
    // 1. Create auth user
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone
        }
      }
    })
    
    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // 2. Save to students table
    if (data.user) {
      const { error: dbError } = await supabase
        .from('students')
        .insert({
          id: data.user.id,
          full_name: fullName,
          email: email,
          phone: phone
        })
      
      if (dbError) {
        setError(dbError.message)
        setLoading(false)
        return
      }
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#050A14] text-white flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="font-noto-si text-xl font-bold mb-2">
            ලියාපදිංචිය සාර්ථකයි!
          </h2>
          <p className="font-noto-si text-gray-300 text-sm mb-6">
            ඔබගේ email එකට confirmation link එකක් යවා ඇත.
          </p>
          <a href="/login" className="font-noto-si inline-block rounded-lg bg-linear-to-r from-[#B41F36] to-[#8E1327] px-6 py-3 font-semibold text-white transition hover:brightness-110">
            පිවිසෙන්න · Login
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
          ලියාපදිංචි වන්න · Register
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="font-noto-si block text-sm font-medium text-gray-300 mb-1">
            පූර්ණ නම · Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#A0192D]"
            placeholder="ඔබගේ නම"
          />
        </div>

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

        <div className="mb-4">
          <label className="font-noto-si block text-sm font-medium text-gray-300 mb-1">
            දුරකථන අංකය · Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#A0192D]"
            placeholder="07X XXX XXXX"
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

        <button
          onClick={handleRegister}
          disabled={loading}
          className="font-noto-si w-full bg-linear-to-r from-[#B41F36] to-[#8E1327] text-white py-3 rounded-lg font-semibold hover:brightness-110 transition disabled:opacity-50"
        >
          {loading ? 'ලියාපදිංචි වෙමින්...' : 'ලියාපදිංචි වන්න · Register'}
        </button>

        <p className="font-noto-si text-center text-sm text-gray-400 mt-4">
          දැනටමත් ගිණුමක් තිබේද?{' '}
          <a href="/login" className="text-[#A0192D] font-semibold hover:underline">
            පිවිසෙන්න
          </a>
        </p>
      </div>
    </main>
  )
}