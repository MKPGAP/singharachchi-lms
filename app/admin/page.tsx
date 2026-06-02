'use client'
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import Link from 'next/link'

type Enrollment = {
  id: string
  student_id: string
  course_id: string
  status: string
  bank_slip_url: string | null
  created_at: string
  students: { full_name: string; email: string; phone: string } | null
  courses: { title: string; price: number } | null
}

type Stats = {
  totalStudents: number
  pendingPayments: number
  activeCourses: number
}

export default function AdminPage() {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminName, setAdminName] = useState('')
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [stats, setStats] = useState<Stats>({ totalStudents: 0, pendingPayments: 0, activeCourses: 0 })
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    const { data: enrollData } = await supabase
      .from('enrollments')
      .select(`
        *,
        students(full_name, email, phone),
        courses(title, price)
      `)
      .order('created_at', { ascending: false })

    if (enrollData) setEnrollments(enrollData)

    const { count: studentCount } = await supabase
      .from('students')
      .select('*', { count: 'exact', head: true })

    const { count: pendingCount } = await supabase
      .from('enrollments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    const { count: courseCount } = await supabase
      .from('courses')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)

    setStats({
      totalStudents: studentCount || 0,
      pendingPayments: pendingCount || 0,
      activeCourses: courseCount || 0,
    })
  }, [])

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.replace('/login'); return }

      const role = user.user_metadata?.role || user.app_metadata?.role
      const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '').split(',').map(e => e.trim())
      const isAdminUser = role === 'admin' || adminEmails.includes(user.email || '')

      if (!isAdminUser) { window.location.replace('/dashboard'); return }

      setIsAdmin(true)
      setAdminName(user.user_metadata?.full_name || user.email || 'Admin')
      await loadData()
      setLoading(false)
    }
    init()
  }, [loadData])

  const handleApprove = async (id: string) => {
    setActionLoading(id)
    const { error } = await supabase
      .from('enrollments')
      .update({ status: 'approved', approved_at: new Date().toISOString() })
      .eq('id', id)
    if (!error) await loadData()
    setActionLoading(null)
  }

  const handleReject = async (id: string) => {
    setActionLoading(id)
    const { error } = await supabase
      .from('enrollments')
      .update({ status: 'rejected', rejected_at: new Date().toISOString() })
      .eq('id', id)
    if (!error) await loadData()
    setActionLoading(null)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.replace('/login')
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F6FA] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-[#0B1F4A] font-semibold">පූරණය වෙමින්...</p>
        </div>
      </main>
    )
  }

  if (!isAdmin) return null

  const pendingEnrollments = enrollments.filter(e => e.status === 'pending')
  const approvedEnrollments = enrollments.filter(e => e.status === 'approved')
  const totalRevenue = approvedEnrollments.reduce((sum, e) => sum + (e.courses?.price || 0), 0)

  return (
    <main className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}
      <header className="bg-[#0B1F4A] text-white py-4 px-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Singharachchi Sir</h1>
          <p className="text-[#A0192D] text-xs font-semibold">Admin Dashboard</p>
        </div>
        <div className="flex gap-6 items-center text-sm">
          <span className="text-gray-300 text-xs">👋 {adminName}</span>
          <Link href="/" className="hover:text-[#A0192D] transition">Site</Link>
          <button
            onClick={handleLogout}
            className="bg-[#A0192D] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#8a1526] transition">
            පිටවීම
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { num: stats.totalStudents, label: 'මුළු ශිෂ්‍යයන්', color: 'text-[#0B1F4A]' },
            { num: stats.pendingPayments, label: 'අනුමත බලාපොරොත්තු', color: 'text-[#A0192D]' },
            { num: stats.activeCourses, label: 'සක්‍රීය පාඨමාලා', color: 'text-[#0B1F4A]' },
            { num: `LKR ${totalRevenue.toLocaleString()}`, label: 'මුළු ආදායම', color: 'text-green-600' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className={`text-2xl font-bold ${s.color}`}>{s.num}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Pending Payments */}
        <h3 className="text-xl font-bold text-[#0B1F4A] mb-4">
          අනුමත කිරීම් බලාපොරොත්තුවෙන් · Pending Approvals
          <span className="ml-2 bg-[#A0192D] text-white text-xs px-2 py-0.5 rounded-full">
            {pendingEnrollments.length}
          </span>
        </h3>

        {pendingEnrollments.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-400 mb-8">
            ✅ අනුමත කිරීමට ඇති ඉල්ලීම් නොමැත
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <table className="w-full">
              <thead className="bg-[#0B1F4A] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">ශිෂ්‍යයා</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">පාඨමාලාව</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">මුදල</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">දිනය</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Slip</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingEnrollments.map((e, i) => (
                  <tr key={e.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F5F6FA]'}>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-[#0B1F4A] text-sm">{e.students?.full_name || 'N/A'}</div>
                      <div className="text-gray-400 text-xs">{e.students?.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{e.courses?.title || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm font-bold text-[#A0192D]">
                      LKR {(e.courses?.price || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(e.created_at).toLocaleDateString('si-LK')}
                    </td>
                    <td className="px-6 py-4">
                      {e.bank_slip_url ? (
                        <a href={e.bank_slip_url} target="_blank" rel="noreferrer"
                          className="text-[#0B1F4A] text-xs underline hover:text-[#A0192D]">
                          බලන්න
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs">නැත</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(e.id)}
                          disabled={actionLoading === e.id}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-700 transition disabled:opacity-50">
                          {actionLoading === e.id ? '...' : '✓ Approve'}
                        </button>
                        <button
                          onClick={() => handleReject(e.id)}
                          disabled={actionLoading === e.id}
                          className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-semibold hover:bg-red-200 transition disabled:opacity-50">
                          {actionLoading === e.id ? '...' : '✗ Reject'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* All Enrollments */}
        <h3 className="text-xl font-bold text-[#0B1F4A] mb-4">
          සියලු ලියාපදිංචි · All Enrollments
        </h3>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <table className="w-full">
            <thead className="bg-[#0B1F4A] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">ශිෂ්‍යයා</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">පාඨමාලාව</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">තත්ත්වය</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">දිනය</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                    ලියාපදිංචි නොමැත
                  </td>
                </tr>
              ) : (
                enrollments.map((e, i) => (
                  <tr key={e.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F5F6FA]'}>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-[#0B1F4A] text-sm">{e.students?.full_name || 'N/A'}</div>
                      <div className="text-gray-400 text-xs">{e.students?.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{e.courses?.title || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        e.status === 'approved' ? 'bg-green-100 text-green-700' :
                        e.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {e.status === 'approved' ? 'අනුමත' :
                         e.status === 'rejected' ? 'ප්‍රතික්ෂේප' : 'බලාපොරොත්තු'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(e.created_at).toLocaleDateString('si-LK')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Quick Actions */}
        <h3 className="text-xl font-bold text-[#0B1F4A] mb-4">ඉක්මන් ක්‍රියා · Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { emoji: '➕', title: 'නව පාඨමාලාව', sub: 'Add New Course', href: '/courses' },
            { emoji: '👨‍🎓', title: 'ශිෂ්‍යයන්', sub: 'View Students', href: '/admin' },
            { emoji: '🏠', title: 'ප්‍රධාන පිටුව', sub: 'View Site', href: '/' },
          ].map((action, i) => (
            <Link href={action.href} key={i}>
              <div className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition cursor-pointer">
                <div className="text-3xl mb-2">{action.emoji}</div>
                <div className="font-semibold text-[#0B1F4A]">{action.title}</div>
                <div className="text-xs text-gray-400 mt-1">{action.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}