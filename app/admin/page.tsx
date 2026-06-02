import Link from 'next/link'

const pendingPayments = [
  {
    id: 1,
    name: 'Kasun Perera',
    email: 'kasun@gmail.com',
    course: 'A/L Media Studies 2026',
    amount: 2500,
    date: '2026-06-01',
    status: 'pending'
  },
  {
    id: 2,
    name: 'Nimasha Silva',
    email: 'nimasha@gmail.com',
    course: 'A/L Media Studies 2026',
    amount: 2500,
    date: '2026-06-02',
    status: 'pending'
  }
]

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}
      <header className="bg-[#0B1F4A] text-white py-4 px-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Singharachchi Sir</h1>
          <p className="text-[#A0192D] text-xs font-semibold">
            Admin Dashboard
          </p>
        </div>
        <div className="flex gap-4 text-sm">
          <Link href="/admin/students" className="hover:text-[#A0192D] transition">
            ශිෂ්‍යයන්
          </Link>
          <Link href="/admin/courses" className="hover:text-[#A0192D] transition">
            පාඨමාලා
          </Link>
          <button className="bg-[#A0192D] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#8a1526] transition">
            පිටවීම
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="text-3xl font-bold text-[#0B1F4A]">24</div>
            <div className="text-sm text-gray-500 mt-1">මුළු ශිෂ්‍යයන්</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="text-3xl font-bold text-[#A0192D]">2</div>
            <div className="text-sm text-gray-500 mt-1">අනුමත බලාපොරොත්තු</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="text-3xl font-bold text-[#0B1F4A]">1</div>
            <div className="text-sm text-gray-500 mt-1">සක්‍රීය පාඨමාලා</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="text-3xl font-bold text-green-600">
              LKR 55,000
            </div>
            <div className="text-sm text-gray-500 mt-1">මාසික ආදායම</div>
          </div>
        </div>

        {/* Pending Payments */}
        <h3 className="text-xl font-bold text-[#0B1F4A] mb-4">
          අනුමත කිරීම් බලාපොරොත්තුවෙන් · Pending Approvals
        </h3>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <table className="w-full">
            <thead className="bg-[#0B1F4A] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">ශිෂ්‍යයා</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">පාඨමාලාව</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">මුදල</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">දිනය</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingPayments.map((payment, i) => (
                <tr key={payment.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F5F6FA]'}>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-[#0B1F4A] text-sm">{payment.name}</div>
                    <div className="text-gray-400 text-xs">{payment.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{payment.course}</td>
                  <td className="px-6 py-4 text-sm font-bold text-[#A0192D]">
                    LKR {payment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{payment.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-700 transition">
                        ✓ Approve
                      </button>
                      <button className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-semibold hover:bg-red-200 transition">
                        ✗ Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Actions */}
        <h3 className="text-xl font-bold text-[#0B1F4A] mb-4">
          ඉක්මන් ක්‍රියා · Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/courses/new">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#0B1F4A]">
              <div className="text-3xl mb-2">➕</div>
              <div className="font-semibold text-[#0B1F4A]">නව පාඨමාලාව</div>
              <div className="text-xs text-gray-400 mt-1">Add New Course</div>
            </div>
          </Link>
          <Link href="/admin/students">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition cursor-pointer">
              <div className="text-3xl mb-2">👨‍🎓</div>
              <div className="font-semibold text-[#0B1F4A]">ශිෂ්‍යයන් කළමනාකරණය</div>
              <div className="text-xs text-gray-400 mt-1">Manage Students</div>
            </div>
          </Link>
          <Link href="/admin/lessons/new">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition cursor-pointer">
              <div className="text-3xl mb-2">🎥</div>
              <div className="font-semibold text-[#0B1F4A]">නව පාඩමක්</div>
              <div className="text-xs text-gray-400 mt-1">Add New Lesson</div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}