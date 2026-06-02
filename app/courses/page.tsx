import Link from 'next/link'

const courses = [
  {
    id: 1,
    title: 'A/L Media Studies 2026',
    title_si: 'ජූනි සම්පූර්ණ සැසිය',
    price: 2500,
    badge: 'නව පන්තිය',
    features: ['වීඩියෝ පාඩම්', 'සතිපතා MCQ', 'PDF Tutes'],
  }
]

export default function CoursesPage() {
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
        <nav className="flex gap-6 text-sm font-medium text-gray-300">
          <Link href="/" className="hover:text-[#A0192D] transition">Home</Link>
          <Link href="/courses" className="text-[#A0192D]">Courses</Link>
          <Link href="/login" className="hover:text-[#A0192D] transition">Login</Link>
        </nav>
      </header>

      {/* Page Title */}
      <section className="py-12 px-5 md:px-8 text-center">
        <h2 className="font-noto-si text-3xl font-bold mb-2">පාඨමාලා · Courses</h2>
        <p className="font-noto-si text-gray-400 text-sm">
          සිංහආරච්චි සර්ගේ A/L මාධ්‍ය පාඨමාලා
        </p>
      </section>

      {/* Courses Grid */}
      <section className="pb-16 px-5 md:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_20px_55px_rgba(0,0,0,0.4)] overflow-hidden">
              <div className="border-b border-white/10 p-4">
                <span className="font-noto-si bg-[#A0192D]/20 border border-[#A0192D]/40 text-[#F1B6C0] text-xs font-bold px-3 py-1 rounded-full">
                  {course.badge}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-1">
                  {course.title}
                </h3>
                <p className="font-noto-si text-gray-400 text-sm mb-4">{course.title_si}</p>
                <ul className="mb-4 space-y-1">
                  {course.features.map((f, i) => (
                    <li key={i} className="font-noto-si text-sm text-gray-300 flex items-center gap-2">
                      <span className="text-[#A0192D]">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <p className="text-2xl font-bold text-[#A0192D] mb-4">
                  LKR {course.price.toLocaleString()}
                  <span className="text-sm text-gray-500 font-normal"> / month</span>
                </p>
                <Link href="/register">
                  <button className="font-noto-si w-full bg-linear-to-r from-[#B41F36] to-[#8E1327] text-white py-3 rounded-lg font-semibold hover:brightness-110 transition">
                    ඇතුළත් වන්න · Enroll Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}