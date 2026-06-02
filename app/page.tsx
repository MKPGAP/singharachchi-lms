export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}
      <header className="bg-[#0B1F4A] text-white py-4 px-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Singharachchi Sir</h1>
          <p className="text-[#A0192D] text-sm font-semibold tracking-widest uppercase">
            කලා ලොවේ රජ විෂය — මාධ්‍ය
          </p>
        </div>
        <nav className="flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-[#A0192D] transition">Home</a>
          <a href="#" className="hover:text-[#A0192D] transition">Courses</a>
          <a href="#" className="hover:text-[#A0192D] transition">Login</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-[#0B1F4A] text-white py-20 px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">
          කලා ලොවේ රජ විෂය <span className="text-[#A0192D]"> MEDIA</span> 
                </h2>
        <p className="text-lg text-gray-300 mb-8">
          සිංහආරච්චි සර් සමඟ ඔබේ A/L මාධ්‍ය ගමන අද පටන් ගන්න
        </p>
        <button className="bg-[#A0192D] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#8a1526] transition">
          පාඨමාලාව බලන්න · View Courses
        </button>
      </section>
      {/* Features */}
<section className="py-16 px-8 bg-[#F5F6FA]">
  <h3 className="text-center text-2xl font-bold text-[#0B1F4A] mb-10">
    ඇයි සිංහආරච්චි සර් සමඟ ඉගෙන ගන්නේ?
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
    <div className="bg-white rounded-xl p-6 shadow-sm text-center">
      <div className="text-4xl mb-4">🎥</div>
      <h4 className="font-bold text-[#0B1F4A] mb-2">වීඩියෝ පාඩම්</h4>
      <p className="text-gray-500 text-sm">ඕනෑම වේලාවක බලන්න</p>
    </div>
    <div className="bg-white rounded-xl p-6 shadow-sm text-center">
      <div className="text-4xl mb-4">📝</div>
      <h4 className="font-bold text-[#0B1F4A] mb-2">සතිපතා ප්‍රශ්නාවලිය</h4>
      <p className="text-gray-500 text-sm">MCQ + ප්‍රතිඵල එක්වරම</p>
    </div>
    <div className="bg-white rounded-xl p-6 shadow-sm text-center">
      <div className="text-4xl mb-4">📄</div>
      <h4 className="font-bold text-[#0B1F4A] mb-2">PDF Tutes</h4>
      <p className="text-gray-500 text-sm">Download කරගන්න</p>
    </div>
  </div>
</section>
{/* Course Card */}
<section className="py-16 px-8 bg-white">
  <h3 className="text-center text-2xl font-bold text-[#0B1F4A] mb-10">
    පාඨමාලා · Courses
  </h3>
  <div className="max-w-sm mx-auto bg-[#F5F6FA] rounded-xl shadow-md overflow-hidden">
    <div className="bg-[#0B1F4A] p-4">
      <span className="bg-[#A0192D] text-white text-xs font-bold px-3 py-1 rounded-full">
        නව පන්තිය
      </span>
    </div>
    <div className="p-6">
      <h4 className="text-lg font-bold text-[#0B1F4A] mb-1">
        A/L Media Studies 2026
      </h4>
      <p className="text-gray-500 text-sm mb-4">ජූනි සම්පූර්ණ සැසිය</p>
      <p className="text-2xl font-bold text-[#A0192D] mb-4">
        LKR 2,500 <span className="text-sm text-gray-400 font-normal">/ month</span>
      </p>
      <button className="w-full bg-[#0B1F4A] text-white py-3 rounded-lg font-semibold hover:bg-[#1A3A7A] transition">
        ඇතුළත් වන්න · Enroll Now
      </button>
    </div>
  </div>
</section>

{/* Footer */}
<footer className="bg-[#0B1F4A] text-white py-8 px-8 text-center">
  <h4 className="font-bold text-lg mb-1">Singharachchi Sir</h4>
  <p className="text-[#A0192D] text-sm mb-3">කලා ලොවේ රජ විෂය MEDIA</p>
  <p className="text-gray-400 text-xs">© 2026 All Rights Reserved</p>
</footer>
    </main>
  );
}