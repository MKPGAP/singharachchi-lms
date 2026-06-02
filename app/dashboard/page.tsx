'use client'
import { supabase } from '../lib/supabase'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}
      <header className="bg-[#0B1F4A] text-white py-4 px-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Singharachchi Sir</h1>
          <p className="text-[#A0192D] text-xs font-semibold">
            කලා ලොවේ රජ විෂය — Media
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">ආයුබෝවන්, ශිෂ්‍යයා!</span>
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              window.location.href = '/login'
            }}
            className="bg-[#A0192D] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#8a1526] transition">
            පිටවීම · Logout
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-8 py-10">
        {/* Welcome */}
        <div className="bg-[#0B1F4A] text-white rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-1">ආයුබෝවන්! 👋</h2>
          <p className="text-gray-300 text-sm">
            ඔබගේ A/L මාධ්‍ය ගමන අද පටන් ගනිමු!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="text-3xl font-bold text-[#0B1F4A]">1</div>
            <div className="text-sm text-gray-500 mt-1">ලියාපදිංචි පාඨමාලා</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="text-3xl font-bold text-[#A0192D]">0</div>
            <div className="text-sm text-gray-500 mt-1">සම්පූර්ණ කළ පාඩම්</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="text-3xl font-bold text-[#0B1F4A]">0%</div>
            <div className="text-sm text-gray-500 mt-1">ප්‍රගතිය</div>
          </div>
        </div>

        {/* My Courses */}
        <h3 className="text-xl font-bold text-[#0B1F4A] mb-4">
          මගේ පාඨමාලා · My Courses
        </h3>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="bg-[#0B1F4A] p-4 flex items-center justify-between">
            <div>
              <span className="bg-[#A0192D] text-white text-xs font-bold px-3 py-1 rounded-full">
                සක්‍රීය
              </span>
            </div>
          </div>
          <div className="p-6">
            <h4 className="text-lg font-bold text-[#0B1F4A] mb-1">
              A/L Media Studies 2026
            </h4>
            <p className="text-gray-500 text-sm mb-4">ජූනි සම්පූර්ණ සැසිය</p>
            <div className="flex gap-3">
              <Link href="/lessons">
                <button className="bg-[#0B1F4A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1A3A7A] transition">
                  🎥 පාඩම් බලන්න
                </button>
              </Link>
              <Link href="/quiz">
                <button className="border border-[#0B1F4A] text-[#0B1F4A] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#F5F6FA] transition">
                  📝 ප්‍රශ්නාවලිය
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Payment Status */}
        <h3 className="text-xl font-bold text-[#0B1F4A] mb-4">
          ගෙවීම් තත්ත්වය · Payment Status
        </h3>
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-[#0B1F4A]">ජූනි 2026 — LKR 2,500</p>
              <p className="text-sm text-gray-500">Bank Slip submitted</p>
            </div>
            <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full">
              අනුමත කිරීම් බලාපොරොත්තුවෙන්
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <h3 className="text-xl font-bold text-[#0B1F4A] mb-4">
          ඉක්මන් සබැඳි · Quick Links
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/lessons">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition cursor-pointer">
              <div className="text-3xl mb-2">🎥</div>
              <div className="font-semibold text-[#0B1F4A]">පාඩම් බලන්න</div>
              <div className="text-xs text-gray-400 mt-1">View Lessons</div>
            </div>
          </Link>
          <Link href="/quiz">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition cursor-pointer">
              <div className="text-3xl mb-2">📝</div>
              <div className="font-semibold text-[#0B1F4A]">ප්‍රශ්නාවලිය</div>
              <div className="text-xs text-gray-400 mt-1">Take Quiz</div>
            </div>
          </Link>
          <Link href="/payment">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition cursor-pointer">
              <div className="text-3xl mb-2">💳</div>
              <div className="font-semibold text-[#0B1F4A]">ගෙවීම් කරන්න</div>
              <div className="text-xs text-gray-400 mt-1">Make Payment</div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}