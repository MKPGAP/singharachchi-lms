import Link from 'next/link'

const lessons = [
  {
    id: 1,
    week: 'සතිය 1',
    title: 'මාධ්‍ය හැඳින්වීම',
    title_en: 'Introduction to Media',
    duration: '45 min',
    type: 'video',
    completed: false
  },
  {
    id: 2,
    week: 'සතිය 1',
    title: 'මාධ්‍ය වර්ග',
    title_en: 'Types of Media',
    duration: '30 min',
    type: 'video',
    completed: false
  },
  {
    id: 3,
    week: 'සතිය 1',
    title: 'සතිය 1 PDF Tute',
    title_en: 'Week 1 Notes',
    duration: 'PDF',
    type: 'pdf',
    completed: false
  },
  {
    id: 4,
    week: 'සතිය 2',
    title: 'මාධ්‍ය ප්‍රචාරණය',
    title_en: 'Media Advertising',
    duration: '50 min',
    type: 'video',
    completed: false
  }
]

const weeks = [...new Set(lessons.map(l => l.week))]

export default function LessonsPage() {
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
        <nav className="flex gap-4 text-sm">
          <Link href="/dashboard" className="hover:text-[#A0192D] transition">
            Dashboard
          </Link>
          <Link href="/quiz" className="hover:text-[#A0192D] transition">
            ප්‍රශ්නාවලිය
          </Link>
        </nav>
      </header>

      {/* Course Title */}
      <section className="bg-[#0B1F4A] text-white py-8 px-8">
        <p className="text-gray-400 text-sm mb-1">A/L Media Studies 2026</p>
        <h2 className="text-2xl font-bold">පාඩම් · Lessons</h2>
      </section>

      {/* Lessons List */}
      <div className="max-w-4xl mx-auto px-8 py-10">
        {weeks.map((week) => (
          <div key={week} className="mb-8">
            <h3 className="text-lg font-bold text-[#0B1F4A] mb-4 flex items-center gap-2">
              <span className="bg-[#0B1F4A] text-white px-3 py-1 rounded-full text-sm">
                {week}
              </span>
            </h3>
            <div className="space-y-3">
              {lessons
                .filter(l => l.week === week)
                .map((lesson) => (
                  <Link href={`/lessons/${lesson.id}`} key={lesson.id}>
                    <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${lesson.type === 'pdf' ? 'bg-[#A0192D]' : 'bg-[#0B1F4A]'}`}>
                          {lesson.type === 'pdf' ? '📄' : '🎥'}
                        </div>
                        <div>
                          <p className="font-semibold text-[#0B1F4A] group-hover:text-[#A0192D] transition">
                            {lesson.title}
                          </p>
                          <p className="text-gray-400 text-xs">{lesson.title_en}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">{lesson.duration}</span>
                        <span className="text-[#0B1F4A] group-hover:text-[#A0192D] transition">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}