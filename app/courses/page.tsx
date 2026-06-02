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
    <main className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}
      <header className="bg-[#0B1F4A] text-white py-4 px-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Singharachchi Sir</h1>
          <p className="text-[#A0192D] text-xs font-semibold">
            කලා ලොවේ රජ විෂය — Media
          </p>
        </div>
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-[#A0192D] transition">Home</Link>
          <Link href="/courses" className="text-[#A0192D]">Courses</Link>
          <Link href="/login" className="hover:text-[#A0192D] transition">Login</Link>
        </nav>
      </header>

      {/* Page Title */}
      <section className="bg-[#0B1F4A] text-white py-10 px-8 text-center">
        <h2 className="text-3xl font-bold mb-2">පාඨමාලා · Courses</h2>
        <p className="text-gray-300 text-sm">
          සිංහආරච්චි සර්ගේ A/L මාධ්‍ය පාඨමාලා
        </p>
      </section>

      {/* Courses Grid */}
      <section className="py-12 px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-[#0B1F4A] p-4">
                <span className="bg-[#A0192D] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {course.badge}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#0B1F4A] mb-1">
                  {course.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{course.title_si}</p>
                <ul className="mb-4 space-y-1">
                  {course.features.map((f, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="text-[#A0192D]">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <p className="text-2xl font-bold text-[#A0192D] mb-4">
                  LKR {course.price.toLocaleString()}
                  <span className="text-sm text-gray-400 font-normal"> / month</span>
                </p>
                <Link href="/register">
                  <button className="w-full bg-[#0B1F4A] text-white py-3 rounded-lg font-semibold hover:bg-[#1A3A7A] transition">
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