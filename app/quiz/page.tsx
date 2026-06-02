'use client'
import { useState } from 'react'
import Link from 'next/link'

const questions = [
  {
    id: 1,
    question: 'මාධ්‍ය යනු කුමක්ද?',
    question_en: 'What is Media?',
    options: [
      'තොරතුරු සන්නිවේදනය සඳහා භාවිතා කරන මාධ්‍යයන්',
      'රූපවාහිනී වැඩසටහන් පමණි',
      'පුවත්පත් සහ සඟරා පමණි',
      'සමාජ මාධ්‍ය පමණි'
    ],
    correct: 0
  },
  {
    id: 2,
    question: 'Print Media හි උදාහරණයක් කුමක්ද?',
    question_en: 'What is an example of Print Media?',
    options: [
      'රූපවාහිනිය',
      'ගුවන්විදුලිය',
      'පුවත්පත',
      'සමාජ මාධ්‍ය'
    ],
    correct: 2
  },
  {
    id: 3,
    question: 'Electronic Media හට අයත් වන්නේ?',
    question_en: 'Which belongs to Electronic Media?',
    options: [
      'පුවත්පත',
      'සඟරාව',
      'රූපවාහිනිය',
      'පත්‍රිකාව'
    ],
    correct: 2
  }
]

export default function QuizPage() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [finished, setFinished] = useState(false)

  const handleNext = () => {
    if (selected === null) return
    const newAnswers = [...answers, selected]
    setAnswers(newAnswers)
    setSelected(null)
    if (current + 1 < questions.length) {
      setCurrent(current + 1)
    } else {
      setFinished(true)
    }
  }

  const score = answers.filter((a, i) => a === questions[i].correct).length

  if (finished) {
    return (
      <main className="min-h-screen bg-[#F5F6FA] flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-[#0B1F4A] mb-2">
            ප්‍රශ්නාවලිය සම්පූර්ණයි!
          </h2>
          <div className="bg-[#F5F6FA] rounded-xl p-6 mb-6">
            <p className="text-5xl font-bold text-[#0B1F4A] mb-1">
              {score}/{questions.length}
            </p>
            <p className="text-gray-500 text-sm">ඔබගේ ලකුණු</p>
            <p className="text-2xl font-bold mt-2" style={{color: score === questions.length ? '#1a7a3a' : score >= questions.length/2 ? '#b87d00' : '#A0192D'}}>
              {score === questions.length ? 'විශිෂ්ට! 🌟' : score >= questions.length/2 ? 'හොඳයි! 👍' : 'තවත් වැඩ කරන්න 💪'}
            </p>
          </div>
          <Link href="/dashboard">
            <button className="w-full bg-[#0B1F4A] text-white py-3 rounded-lg font-semibold hover:bg-[#1A3A7A] transition">
              Dashboard එකට යන්න
            </button>
          </Link>
        </div>
      </main>
    )
  }

  const q = questions[current]

  return (
    <main className="min-h-screen bg-[#F5F6FA]">
      <header className="bg-[#0B1F4A] text-white py-4 px-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Singharachchi Sir</h1>
          <p className="text-[#A0192D] text-xs font-semibold">සතිපතා ප්‍රශ්නාවලිය</p>
        </div>
        <span className="text-sm text-gray-300">
          {current + 1} / {questions.length}
        </span>
      </header>

      <div className="max-w-2xl mx-auto px-8 py-10">
        {/* Progress */}
        <div className="bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-[#A0192D] h-2 rounded-full transition-all"
            style={{width: `${((current + 1) / questions.length) * 100}%`}}
          />
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <p className="text-xs text-gray-400 mb-2">{q.question_en}</p>
          <h2 className="text-xl font-bold text-[#0B1F4A]">{q.question}</h2>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {q.options.map((option, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full text-left p-4 rounded-xl border-2 transition font-medium ${
                selected === i
                  ? 'border-[#0B1F4A] bg-[#0B1F4A] text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-[#0B1F4A]'
              }`}
            >
              <span className="mr-3 font-bold">
                {['A', 'B', 'C', 'D'][i]}.
              </span>
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={selected === null}
          className="w-full bg-[#A0192D] text-white py-3 rounded-lg font-semibold hover:bg-[#8a1526] transition disabled:opacity-50"
        >
          {current + 1 === questions.length ? 'සම්පූර්ණ කරන්න · Finish' : 'ඊළඟ · Next →'}
        </button>
      </div>
    </main>
  )
}