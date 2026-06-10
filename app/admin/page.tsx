'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock, Users, CreditCard, Eye, LogOut, Play } from 'lucide-react'
import Link from 'next/link'

const SI = (props: { children: React.ReactNode; className?: string }) => (
  <span className={`font-noto-si ${props.className ?? ''}`}>{props.children}</span>
)

type Enrollment = {
  id: string
  student_id: string
  status: 'pending' | 'approved' | 'rejected'
  bank_slip_url: string
  created_at: string
  course_id: string
}

export default function AdminPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }
      const adminEmails = ['singharachchisir@gmail.com', 'admin@singharachchi.lk']
      if (!adminEmails.includes(user.email || '')) {
        window.location.href = '/dashboard'
        return
      }
      setIsAdmin(true)
      fetchEnrollments()
    }
    check()
  }, [])

  const fetchEnrollments = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('enrollments')
      .select('*')
      .order('created_at', { ascending: false })
    setEnrollments(data || [])
    setLoading(false)
  }

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    setUpdating(id)
    await supabase.from('enrollments').update({ status }).eq('id', id)
    setEnrollments(prev => prev.map(e => e.id === id ? { ...e, status } : e))
    setUpdating(null)
  }

  const filtered = enrollments.filter(e => filter === 'all' || e.status === filter)
  const counts = {
    all: enrollments.length,
    pending: enrollments.filter(e => e.status === 'pending').length,
    approved: enrollments.filter(e => e.status === 'approved').length,
    rejected: enrollments.filter(e => e.status === 'rejected').length,
  }

  const statusStyle = {
    pending:  'bg-yellow-500/15 text-yellow-300 border-yellow-500/25',
    approved: 'bg-green-500/15 text-green-300 border-green-500/25',
    rejected: 'bg-red-500/15 text-red-300 border-red-500/25',
  }

  const statusIcon = {
    pending:  <Clock size={12} />,
    approved: <CheckCircle size={12} />,
    rejected: <XCircle size={12} />,
  }

  if (!isAdmin) return (
    <main className="min-h-screen bg-[#050A14] flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-10 h-10 rounded-full border-2 border-[#A0192D] border-t-transparent" />
    </main>
  )

  return (
    <main className="min-h-screen bg-[#050A14] text-white">

      {/* Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(160,25,45,0.5) 0%, transparent 70%)' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06]"
        style={{ background: 'rgba(5,10,20,0.92)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#A0192D] flex items-center justify-center">
              <Play size={13} fill="white" className="text-white" />
            </div>
            <div className="leading-none">
              <p className="text-[13px] font-bold text-white">Singharachchi Sir</p>
              <p className="text-[#A0192D] text-[9px] tracking-[0.15em] font-semibold">ADMIN PANEL</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(160,25,45,0.15)', border: '1px solid rgba(160,25,45,0.3)', color: '#F1B6C0' }}>
              Admin
            </span>
            <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/login' }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-gray-500 hover:text-white hover:bg-white/5 transition-all">
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-10">

        {/* Page title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-[#A0192D] text-[10px] tracking-[0.3em] uppercase font-semibold mb-1">Admin Panel</p>
          <h1 className="text-3xl font-black text-white">Enrollment Management</h1>
          <SI className="text-gray-500 text-sm">Bank slip approvals and student enrollments</SI>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: counts.all, icon: <Users size={18} className="text-gray-400" />, color: 'text-white' },
            { label: 'Pending', value: counts.pending, icon: <Clock size={18} className="text-yellow-400" />, color: 'text-yellow-400' },
            { label: 'Approved', value: counts.approved, icon: <CheckCircle size={18} className="text-green-400" />, color: 'text-green-400' },
            { label: 'Rejected', value: counts.rejected, icon: <XCircle size={18} className="text-red-400" />, color: 'text-red-400' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center justify-between mb-3">
                {s.icon}
                <span className={`text-3xl font-black ${s.color}`}>{s.value}</span>
              </div>
              <p className="text-gray-500 text-xs font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                filter === f
                  ? 'bg-[#A0192D] text-white'
                  : 'text-gray-500 hover:text-white border border-white/10 hover:bg-white/5'
              }`}>
              {f} {f !== 'all' && `(${counts[f]})`}
            </button>
          ))}
          <button onClick={fetchEnrollments}
            className="ml-auto px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-white border border-white/10 hover:bg-white/5 transition-all">
            Refresh
          </button>
        </div>

        {/* Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>

          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-[10px] tracking-widest uppercase text-gray-600 font-semibold"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
            <div className="col-span-3">Student</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2">Course</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Slip</div>
            <div className="col-span-2">Actions</div>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 rounded-full border-2 border-[#A0192D] border-t-transparent mx-auto" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <CreditCard size={40} className="text-gray-700 mx-auto mb-3" />
              <SI className="text-gray-600 text-sm">No enrollments found</SI>
            </div>
          ) : (
            filtered.map((e, i) => (
              <motion.div key={e.id}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>

                {/* Student */}
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A0192D] to-[#6e1120] flex items-center justify-center text-xs font-black shrink-0">
                    {e.student_id.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium truncate">{e.student_id.slice(0, 8)}...</p>
                    <p className="text-gray-600 text-xs">ID: {e.id.slice(0, 6)}</p>
                  </div>
                </div>

                {/* Date */}
                <div className="col-span-2">
                  <p className="text-gray-300 text-sm">{new Date(e.created_at).toLocaleDateString('en-GB')}</p>
                  <p className="text-gray-600 text-xs">{new Date(e.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>

                {/* Course */}
                <div className="col-span-2">
                  <SI className="text-gray-300 text-xs">A/L Media 2026</SI>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusStyle[e.status]}`}>
                    {statusIcon[e.status]}
                    <SI className="capitalize">{e.status}</SI>
                  </span>
                </div>

                {/* Slip */}
                <div className="col-span-1">
                  {e.bank_slip_url ? (
                    <a href={`https://your-project.supabase.co/storage/v1/object/public/bank-slips/${e.bank_slip_url}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[#A0192D] hover:text-white text-xs transition-colors">
                      <Eye size={14} /> View
                    </a>
                  ) : (
                    <span className="text-gray-600 text-xs">None</span>
                  )}
                </div>

                {/* Actions */}
                <div className="col-span-2 flex gap-2">
                  {e.status !== 'approved' && (
                    <button onClick={() => updateStatus(e.id, 'approved')}
                      disabled={updating === e.id}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-green-400 hover:bg-green-500/10 border border-green-500/20 transition-all disabled:opacity-40">
                      <CheckCircle size={12} /> Approve
                    </button>
                  )}
                  {e.status !== 'rejected' && (
                    <button onClick={() => updateStatus(e.id, 'rejected')}
                      disabled={updating === e.id}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-all disabled:opacity-40">
                      <XCircle size={12} /> Reject
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </main>
  )
}
