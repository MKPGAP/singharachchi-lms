'use client'
import { supabase } from '../lib/supabase'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [studentName, setStudentName] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.replace('/login')
        return
      }
      setStudentName(user.user_metadata?.full_name || user.email || 'ශිෂ්‍යයා')
      setLoading(false)
    }
    getUser()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050A14] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="font-noto-si font-semibold">පූරණය වෙමින්...</p>
        </div>
      </main>
    )
  }
  return (
    <main className="min-h-screen bg-[#050A14] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl py-4 px-5 md:px-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Singharachchi Sir</h1>
          <p className="font-noto-si text-[#A0192D] text-xs font-semibold">
            කලා ලොවේ රජ විෂය — Media
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-noto-si text-sm text-gray-300">ආයුබෝවන්, {studentName}!</span>
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              window.location.href = '/login'
            }}
            className="font-noto-si bg-linear-to-r from-[#B41F36] to-[#8E1327] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition">
            පිටවීම · Logout
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-5 md:px-8 py-10">
        {/* Welcome */}
        <div className="rounded-2xl border border-white/10 bg-linear-to-r from-white/[0.06] to-white/[0.02] p-6 mb-8">
          <h2 className="font-noto-si text-2xl font-bold mb-1">ආයුබෝවන්, {studentName}! 👋</h2>
          <p className="font-noto-si text-gray-300 text-sm">
            ඔබගේ A/L මාධ්‍ය ගමන අද පටන් ගනිමු!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <div className="text-3xl font-bold">1</div>
            <div className="font-noto-si text-sm text-gray-400 mt-1">ලියාපදිංචි පාඨමාලා</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <div className="text-3xl font-bold text-[#A0192D]">0</div>
            <div className="font-noto-si text-sm text-gray-400 mt-1">සම්පූර්ණ කළ පාඩම්</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <div className="text-3xl font-bold">0%</div>
            <div className="font-noto-si text-sm text-gray-400 mt-1">ප්‍රගතිය</div>
          </div>
        </div>

        {/* My Courses */}
        <h3 className="font-noto-si text-xl font-bold mb-4">
          මගේ පාඨමාලා · My Courses
        </h3>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden mb-8">
          <div className="border-b border-white/10 p-4 flex items-center justify-between">
            <div>
              <span className="font-noto-si bg-[#A0192D]/20 border border-[#A0192D]/40 text-[#F1B6C0] text-xs font-bold px-3 py-1 rounded-full">
                සක්‍රීය
              </span>
            </div>
          </div>
          <div className="p-6">
            <h4 className="text-lg font-bold mb-1">
              A/L Media Studies 2026
            </h4>
            <p className="font-noto-si text-gray-400 text-sm mb-4">ජූනි සම්පූර්ණ සැසිය</p>
            <div className="flex gap-3">
              <Link href="/lessons">
                <button className="font-noto-si bg-linear-to-r from-[#B41F36] to-[#8E1327] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition">
                  🎥 පාඩම් බලන්න
                </button>
              </Link>
              <Link href="/quiz">
                <button className="font-noto-si border border-white/20 text-gray-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition">
                  📝 ප්‍රශ්නාවලිය
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Payment Status */}
        <h3 className="font-noto-si text-xl font-bold mb-4">
          ගෙවීම් තත්ත්වය · Payment Status
        </h3>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold font-noto-si">ජූනි 2026 — LKR 2,500</p>
              <p className="text-sm text-gray-400">Bank Slip submitted</p>
            </div>
            <span className="font-noto-si bg-yellow-500/15 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/25">
              අනුමත කිරීම් බලාපොරොත්තුවෙන්
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <h3 className="font-noto-si text-xl font-bold mb-4">
          ඉක්මන් සබැඳි · Quick Links
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/lessons">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center hover:bg-white/[0.05] transition cursor-pointer">
              <div className="text-3xl mb-2">🎥</div>
              <div className="font-noto-si font-semibold">පාඩම් බලන්න</div>
              <div className="text-xs text-gray-400 mt-1">View Lessons</div>
            </div>
          </Link>
          <Link href="/quiz">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center hover:bg-white/[0.05] transition cursor-pointer">
              <div className="text-3xl mb-2">📝</div>
              <div className="font-noto-si font-semibold">ප්‍රශ්නාවලිය</div>
              <div className="text-xs text-gray-400 mt-1">Take Quiz</div>
            </div>
          </Link>
          <Link href="/payment">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center hover:bg-white/[0.05] transition cursor-pointer">
              <div className="text-3xl mb-2">💳</div>
              <div className="font-noto-si font-semibold">ගෙවීම් කරන්න</div>
              <div className="text-xs text-gray-400 mt-1">Make Payment</div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}