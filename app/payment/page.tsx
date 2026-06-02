'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function PaymentPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    setError('')

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('පළමුව ලොග් වන්න · Please login first')
        setUploading(false)
        return
      }

      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('bank-slips')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // Save enrollment record to database
      const { error: dbError } = await supabase
        .from('enrollments')
        .insert({
          student_id: user.id,
          course_id: '1',
          status: 'pending',
          bank_slip_url: fileName
        })

      if (dbError) throw dbError

      setSuccess(true)
    } catch (err) {
        setError(err instanceof Error ? err.message : 'දෝෂයක් ඇති විය')
      }
    setUploading(false)
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#050A14] text-white flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="font-noto-si text-xl font-bold mb-2">
            ගෙවීම් රිසිට්පත යවා ඇත!
          </h2>
          <p className="font-noto-si text-gray-300 text-sm mb-6">
            සිංහආරච්චි සර් විසින් අනුමත කළ පසු ඔබට email දැනුම්දීමක් ලැබේ.
          </p>
          <a href="/dashboard" className="font-noto-si inline-block rounded-lg bg-linear-to-r from-[#B41F36] to-[#8E1327] px-6 py-3 font-semibold text-white transition hover:brightness-110">
            Dashboard එකට යන්න
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#050A14] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">
            Singharachchi Sir
          </h1>
          <p className="font-noto-si text-[#A0192D] text-sm font-semibold">
            කලා ලොවේ රජ විෂය — Media
          </p>
        </div>

        <h2 className="font-noto-si text-xl font-bold mb-2 text-center">
          ගෙවීම් රිසිට්පත · Bank Slip
        </h2>
        <p className="font-noto-si text-center text-gray-300 text-sm mb-6">
          බැංකු තැන්පතුවෙන් පසු රිසිට්පත upload කරන්න
        </p>

        {/* Bank Details */}
        <div className="rounded-lg p-4 mb-6 border border-white/10 bg-white/5">
          <h3 className="font-noto-si font-bold text-white mb-3 text-sm">
            බැංකු විස්තර · Bank Details
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-noto-si text-gray-400">ගිණුම් නාමය</span>
              <span className="font-semibold text-white">Sampath Singharachchi</span>
            </div>
            <div className="flex justify-between">
              <span className="font-noto-si text-gray-400">බැංකුව</span>
              <span className="font-semibold text-white">Bank of Ceylon</span>
            </div>
            <div className="flex justify-between">
              <span className="font-noto-si text-gray-400">ගිණුම් අංකය</span>
              <span className="font-semibold text-white">XXXX XXXX XXXX</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
              <span className="font-noto-si text-gray-400">ගෙවිය යුතු මුදල</span>
              <span className="font-bold text-[#A0192D] text-lg">LKR 2,500</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* File Upload */}
        <div className="mb-6">
          <label className="font-noto-si block text-sm font-medium text-gray-300 mb-2">
            රිසිට්පත Upload කරන්න
          </label>
          <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-[#A0192D] transition">
            <div className="text-3xl mb-2">📎</div>
            <p className="font-noto-si text-sm text-gray-400 mb-3">
              රිසිට්පතේ screenshot එක තෝරන්න
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id="slip-upload"
            />
            <label
              htmlFor="slip-upload"
              className="font-noto-si bg-linear-to-r from-[#B41F36] to-[#8E1327] text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:brightness-110 transition"
            >
              ගොනුව තෝරන්න · Choose File
            </label>
            {file && (
              <p className="text-sm text-green-600 mt-2 font-medium">
                ✓ {file.name}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="font-noto-si w-full bg-linear-to-r from-[#B41F36] to-[#8E1327] text-white py-3 rounded-lg font-semibold hover:brightness-110 transition disabled:opacity-50"
        >
          {uploading ? 'යවමින්...' : 'රිසිට්පත යවන්න · Submit'}
        </button>
      </div>
    </main>
  )
}