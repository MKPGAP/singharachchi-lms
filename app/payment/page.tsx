'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Upload, CheckCircle, ArrowLeft, Copy } from 'lucide-react'

const SI = (props: { children: React.ReactNode; className?: string }) => (
  <span className={`font-noto-si ${props.className ?? ''}`}>{props.children}</span>
)

export default function PaymentPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState('')

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(''), 2000)
  }

  const handleFile = (f: File) => {
    setFile(f)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(f)
  }

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setError('පළමුව ලොග් වන්න · Please login first'); setUploading(false); return }
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const { error: uploadError } = await supabase.storage.from('bank-slips').upload(fileName, file)
      if (uploadError) throw uploadError
      const { error: dbError } = await supabase.from('enrollments').insert({
        student_id: user.id, course_id: '1', status: 'pending', bank_slip_url: fileName
      })
      if (dbError) throw dbError
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'දෝෂයක් ඇති විය')
    }
    setUploading(false)
  }

  if (success) return (
    <main className="min-h-screen bg-[#050A14] text-white flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center rounded-3xl p-10"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
          className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-400" />
        </motion.div>
        <h2 className="font-noto-si text-2xl font-black text-white mb-2">ගෙවීම් රිසිට්පත යවා ඇත!</h2>
        <SI className="text-gray-400 text-sm block mb-8">සිංහආරච්චි සර් විසින් අනුමත කළ පසු ඔබට දැනුම්දීමක් ලැබේ.</SI>
        <Link href="/dashboard">
          <button className="font-noto-si w-full py-4 rounded-2xl text-white font-bold"
            style={{ background: 'linear-gradient(135deg, #B41F36, #8E1327)' }}>
            Dashboard එකට යන්න
          </button>
        </Link>
      </motion.div>
    </main>
  )

  return (
    <main className="min-h-screen bg-[#050A14] text-white px-4 py-10">
      <div className="max-w-lg mx-auto">

        {/* Back */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Dashboard
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>

          {/* Header */}
          <div className="p-8 text-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'linear-gradient(135deg, rgba(160,25,45,0.1), rgba(11,31,74,0.15))' }}>
            <p className="text-[#A0192D] text-[10px] tracking-[0.3em] uppercase font-semibold mb-2">Monthly Payment</p>
            <h1 className="font-noto-si text-2xl font-black text-white mb-1">ගෙවීම් රිසිට්පත</h1>
            <SI className="text-gray-400 text-sm">බැංකු තැන්පතුවෙන් පසු රිසිට්පත upload කරන්න</SI>
          </div>

          <div className="p-8 space-y-6">

            {/* Amount */}
            <div className="rounded-2xl p-5 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(160,25,45,0.08), rgba(11,31,74,0.12))', border: '1px solid rgba(160,25,45,0.2)' }}>
              <SI className="text-gray-500 text-xs block mb-1">ගෙවිය යුතු මුදල</SI>
              <p className="text-4xl font-black text-[#A0192D]">LKR 2,500</p>
              <SI className="text-gray-600 text-xs mt-1">ජූනි 2026 · A/L Media Studies</SI>
            </div>

            {/* Bank details */}
            <div className="rounded-2xl p-5 space-y-3"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-[10px] tracking-widest uppercase text-gray-600 font-semibold">බැංකු විස්තර · Bank Details</p>
              {[
                { label: 'ගිණුම් නාමය', value: 'Sampath Singharachchi', copy: false },
                { label: 'බැංකුව', value: 'Bank of Ceylon', copy: false },
                { label: 'ගිණුම් අංකය', value: 'XXXX XXXX XXXX', copy: true },
              ].map((d, i) => (
                <div key={i} className="flex items-center justify-between py-2"
                  style={{ borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <SI className="text-gray-500 text-sm">{d.label}</SI>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-sm">{d.value}</span>
                    {d.copy && (
                      <button onClick={() => copyToClipboard(d.value, d.label)}
                        className="text-gray-600 hover:text-[#A0192D] transition-colors">
                        {copied === d.label ? <CheckCircle size={14} className="text-green-400" /> : <Copy size={14} />}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {error && (
              <div className="rounded-xl p-3 text-sm text-red-300"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                {error}
              </div>
            )}

            {/* Upload */}
            <div>
              <SI className="block text-sm font-semibold text-gray-300 mb-3">රිසිට්පත Upload කරන්න</SI>
              <label htmlFor="slip-upload" className="block cursor-pointer">
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  className="rounded-2xl p-8 text-center transition-all"
                  style={{
                    border: `2px dashed ${file ? 'rgba(160,25,45,0.5)' : 'rgba(255,255,255,0.1)'}`,
                    background: file ? 'rgba(160,25,45,0.05)' : 'rgba(255,255,255,0.02)'
                  }}>
                  {preview ? (
                    <img src={preview} alt="Bank slip preview" className="max-h-48 mx-auto rounded-xl object-contain" />
                  ) : (
                    <>
                      <Upload size={32} className="text-gray-600 mx-auto mb-3" />
                      <SI className="block text-gray-400 text-sm mb-1">රිසිට්පතේ photo එක තෝරන්න</SI>
                      <p className="text-gray-600 text-xs">JPG, PNG, PDF · Max 5MB</p>
                    </>
                  )}
                </motion.div>
              </label>
              <input type="file" accept="image/*,application/pdf" id="slip-upload"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
                className="hidden" />
              {file && (
                <p className="text-green-400 text-xs mt-2 flex items-center gap-1">
                  <CheckCircle size={12} /> {file.name}
                </p>
              )}
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={handleUpload} disabled={!file || uploading}
              className="font-noto-si w-full py-4 rounded-2xl text-white font-bold text-base transition-all disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #B41F36, #8E1327)' }}>
              {uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="block w-4 h-4 rounded-full border-2 border-white border-t-transparent" />
                  යවමින්...
                </span>
              ) : <SI>රිසිට්පත යවන්න · Submit</SI>}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
