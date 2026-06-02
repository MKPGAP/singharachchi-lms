'use client'
import { useState } from 'react'

export default function PaymentPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    // Upload logic will be added with Supabase storage
    setTimeout(() => {
      setUploading(false)
      setSuccess(true)
    }, 2000)
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#F5F6FA] flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-[#0B1F4A] mb-2">
            ගෙවීම් රිසිට්පත යවා ඇත!
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            සිංහආරච්චි සර් විසින් අනුමත කළ පසු ඔබට email දැනුම්දීමක් ලැබේ.
          </p>
          <a href="/" className="bg-[#0B1F4A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1A3A7A] transition">
            මුල් පිටුවට · Home
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F6FA] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#0B1F4A]">
            Singharachchi Sir
          </h1>
          <p className="text-[#A0192D] text-sm font-semibold">
            කලා ලොවේ රජ විෂය — Media
          </p>
        </div>

        <h2 className="text-xl font-bold text-[#0B1F4A] mb-2 text-center">
          ගෙවීම් රිසිට්පත · Bank Slip
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          බැංකු තැන්පතුවෙන් පසු රිසිට්පත upload කරන්න
        </p>

        {/* Bank Details */}
        <div className="bg-[#F5F6FA] rounded-lg p-4 mb-6 border border-gray-200">
          <h3 className="font-bold text-[#0B1F4A] mb-3 text-sm">
            බැංකු විස්තර · Bank Details
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">ගිණුම් නාමය</span>
              <span className="font-semibold text-[#0B1F4A]">Sampath Singharachchi</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">බැංකුව</span>
              <span className="font-semibold text-[#0B1F4A]">Bank of Ceylon</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">ගිණුම් අංකය</span>
              <span className="font-semibold text-[#0B1F4A]">XXXX XXXX XXXX</span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="text-gray-500">ගෙවිය යුතු මුදල</span>
              <span className="font-bold text-[#A0192D] text-lg">LKR 2,500</span>
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            රිසිට්පත Upload කරන්න
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#0B1F4A] transition">
            <div className="text-3xl mb-2">📎</div>
            <p className="text-sm text-gray-500 mb-3">
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
              className="bg-[#0B1F4A] text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-[#1A3A7A] transition"
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
          className="w-full bg-[#A0192D] text-white py-3 rounded-lg font-semibold hover:bg-[#8a1526] transition disabled:opacity-50"
        >
          {uploading ? 'යවමින්...' : 'රිසිට්පත යවන්න · Submit'}
        </button>
      </div>
    </main>
  )
}