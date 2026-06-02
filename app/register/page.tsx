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
      <main className="min-h-screen bg-[#F5F6FA] flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-[#0B1F4A] mb-2">
            ලියාපදිංචිය සාර්ථකයි!
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            ඔබගේ email එකට confirmation link එකක් යවා ඇත.
          </p>
          <a href="/login" className="bg-[#0B1F4A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1A3A7A] transition">
            පිවිසෙන්න · Login
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
          ලියාපදිංචි වන්න · Register
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            පූර්ණ නම · Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#0B1F4A] text-gray-900"
            placeholder="ඔබගේ නම"
          />
        </div>

        <div className="mb-4">
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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            දුරකථන අංකය · Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#0B1F4A] text-gray-900"
            placeholder="07X XXX XXXX"
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
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#0B1F4A] text-gray-900"
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-[#A0192D] text-white py-3 rounded-lg font-semibold hover:bg-[#8a1526] transition disabled:opacity-50"
        >
          {loading ? 'ලියාපදිංචි වෙමින්...' : 'ලියාපදිංචි වන්න · Register'}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          දැනටමත් ගිණුමක් තිබේද?{' '}
          <a href="/login" className="text-[#A0192D] font-semibold hover:underline">
            පිවිසෙන්න
          </a>
        </p>
      </div>
    </main>
  )
}