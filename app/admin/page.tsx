'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'

type AdminTab = 'users' | 'enrollments' | 'payments' | 'courses'

type Student = {
  id: string
  full_name: string
  email: string
  phone: string | null
  created_at?: string
}

type EnrollmentRow = {
  id: string
  student_id: string
  course_id: string
  status: 'pending' | 'approved' | 'rejected'
  bank_slip_url: string | null
  created_at?: string
  students?: { full_name: string | null; email: string | null }[] | null
}

type Course = {
  id: string
  title: string
  title_si: string | null
  price: number | null
  status: string | null
  created_at?: string
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('users')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const [students, setStudents] = useState<Student[]>([])
  const [enrollments, setEnrollments] = useState<EnrollmentRow[]>([])
  const [courses, setCourses] = useState<Course[]>([])

  const [studentName, setStudentName] = useState('')
  const [studentEmail, setStudentEmail] = useState('')
  const [studentPhone, setStudentPhone] = useState('')

  const [enrollStudentId, setEnrollStudentId] = useState('')
  const [enrollCourseId, setEnrollCourseId] = useState('1')

  const [courseTitle, setCourseTitle] = useState('')
  const [courseTitleSi, setCourseTitleSi] = useState('')
  const [coursePrice, setCoursePrice] = useState('')
  const [authChecked, setAuthChecked] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')

  const pendingEnrollments = useMemo(
    () => enrollments.filter((item) => item.status === 'pending'),
    [enrollments]
  )
  const paymentSubmissions = useMemo(
    () => enrollments.filter((item) => item.bank_slip_url),
    [enrollments]
  )

  const isAdminUser = (user: { email?: string | null; user_metadata?: Record<string, unknown>; app_metadata?: Record<string, unknown> }) => {
    const allowedEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? '')
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean)
    const userEmail = (user.email ?? '').toLowerCase()
    const role = String(user.user_metadata?.role ?? user.app_metadata?.role ?? '').toLowerCase()
    return role === 'admin' || allowedEmails.includes(userEmail)
  }

  const loadAdminData = async () => {
    setLoading(true)
    setError('')
    setNotice('')

    const [studentsRes, enrollmentsRes, coursesRes] = await Promise.all([
      supabase.from('students').select('id,full_name,email,phone,created_at').order('created_at', { ascending: false }),
      supabase
        .from('enrollments')
        .select('id,student_id,course_id,status,bank_slip_url,created_at,students(full_name,email)')
        .order('created_at', { ascending: false }),
      supabase.from('courses').select('id,title,title_si,price,status,created_at').order('created_at', { ascending: false }),
    ])

    if (studentsRes.error) {
      setError(studentsRes.error.message)
    } else {
      setStudents((studentsRes.data ?? []) as Student[])
      if (!enrollStudentId && studentsRes.data && studentsRes.data.length > 0) {
        setEnrollStudentId(studentsRes.data[0].id)
      }
    }

    if (enrollmentsRes.error) {
      setError((prev) => prev || enrollmentsRes.error.message)
    } else {
      setEnrollments((enrollmentsRes.data ?? []) as EnrollmentRow[])
    }

    if (coursesRes.error) {
      setNotice("Couldn't load `courses` table. Create the table to enable full course management.")
    } else {
      setCourses((coursesRes.data ?? []) as Course[])
      if (coursesRes.data && coursesRes.data.length > 0 && !enrollCourseId) {
        setEnrollCourseId(coursesRes.data[0].id)
      }
    }

    setLoading(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      void (async () => {
        const { data, error: authError } = await supabase.auth.getUser()
        if (authError || !data.user) {
          setAuthChecked(true)
          setIsAuthorized(false)
          return
        }

        const allowed = isAdminUser(data.user)
        setAdminEmail(data.user.email ?? '')
        setIsAuthorized(allowed)
        setAuthChecked(true)

        if (!allowed) return
        await loadAdminData()
      })()
    }, 0)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!authChecked) {
    return (
      <main className="min-h-screen bg-[#050A14] text-white flex items-center justify-center">
        <div className="rounded-xl border border-white/10 bg-white/3 px-6 py-4 text-sm text-gray-300">Checking admin access...</div>
      </main>
    )
  }

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-[#050A14] text-white flex items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/3 p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Admin access required</h2>
          <p className="text-sm text-gray-300 mb-6">
            You must login with an admin account. Set `role: &quot;admin&quot;` in Supabase metadata or include your email in `NEXT_PUBLIC_ADMIN_EMAILS`.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/login" className="rounded-lg bg-linear-to-r from-[#B41F36] to-[#8E1327] px-4 py-2 text-sm font-semibold">
              Go to Login
            </Link>
            <Link href="/" className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-gray-200">
              Back Home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const handleAddStudent = async () => {
    setError('')
    if (!studentName || !studentEmail) {
      setError('Full name and email are required.')
      return
    }

    const { error: insertError } = await supabase.from('students').insert({
      full_name: studentName,
      email: studentEmail,
      phone: studentPhone || null,
    })

    if (insertError) {
      setError(insertError.message)
      return
    }

    setStudentName('')
    setStudentEmail('')
    setStudentPhone('')
    await loadAdminData()
  }

  const handleDeleteStudent = async (id: string) => {
    setError('')
    const { error: deleteError } = await supabase.from('students').delete().eq('id', id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }
    await loadAdminData()
  }

  const handleCreateEnrollment = async () => {
    setError('')
    if (!enrollStudentId || !enrollCourseId) {
      setError('Select a user and course first.')
      return
    }

    const { error: insertError } = await supabase.from('enrollments').insert({
      student_id: enrollStudentId,
      course_id: enrollCourseId,
      status: 'pending',
      bank_slip_url: null,
    })

    if (insertError) {
      setError(insertError.message)
      return
    }
    await loadAdminData()
  }

  const handleEnrollmentStatus = async (id: string, status: EnrollmentRow['status']) => {
    setError('')
    const { error: updateError } = await supabase.from('enrollments').update({ status }).eq('id', id)
    if (updateError) {
      setError(updateError.message)
      return
    }
    await loadAdminData()
  }

  const handleAddCourse = async () => {
    setError('')
    setNotice('')
    if (!courseTitle) {
      setError('Course title is required.')
      return
    }

    const priceValue = coursePrice ? Number(coursePrice) : null
    if (coursePrice && Number.isNaN(priceValue)) {
      setError('Price must be a valid number.')
      return
    }

    const { error: insertError } = await supabase.from('courses').insert({
      title: courseTitle,
      title_si: courseTitleSi || null,
      price: priceValue,
      status: 'active',
    })

    if (insertError) {
      setError(insertError.message)
      return
    }

    setCourseTitle('')
    setCourseTitleSi('')
    setCoursePrice('')
    await loadAdminData()
  }

  const handleDeleteCourse = async (id: string) => {
    setError('')
    const { error: deleteError } = await supabase.from('courses').delete().eq('id', id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }
    await loadAdminData()
  }

  return (
    <main className="min-h-screen bg-[#050A14] text-white">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl py-4 px-5 md:px-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Singharachchi Sir</h1>
          <p className="font-noto-si text-[#A0192D] text-xs font-semibold">Admin Control Center</p>
        </div>
        <div className="flex gap-4 text-sm text-gray-300">
          <span className="hidden md:inline text-gray-400">{adminEmail}</span>
          <Link href="/" className="hover:text-[#A0192D] transition">
            Home
          </Link>
          <Link href="/dashboard" className="hover:text-[#A0192D] transition">
            Student View
          </Link>
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              window.location.href = '/login'
            }}
            className="rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:bg-white/10 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
        {error && <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}
        {notice && <div className="mb-6 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-200">{notice}</div>}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-white/10 bg-white/3 p-4">
            <p className="text-xs text-gray-400">Users</p>
            <p className="text-2xl font-bold">{students.length}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/3 p-4">
            <p className="text-xs text-gray-400">Enrollments</p>
            <p className="text-2xl font-bold">{enrollments.length}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/3 p-4">
            <p className="text-xs text-gray-400">Pending approvals</p>
            <p className="text-2xl font-bold text-[#A0192D]">{pendingEnrollments.length}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/3 p-4">
            <p className="text-xs text-gray-400">Payments submitted</p>
            <p className="text-2xl font-bold">{paymentSubmissions.length}</p>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {(['users', 'enrollments', 'payments', 'courses'] as AdminTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab ? 'bg-[#A0192D] text-white' : 'border border-white/15 bg-white/3 text-gray-300 hover:bg-white/10'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="rounded-xl border border-white/10 bg-white/3 p-6 text-gray-300">Loading admin data...</div>
        ) : null}

        {!loading && activeTab === 'users' ? (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-xl border border-white/10 bg-white/3 p-5">
              <h3 className="mb-4 font-semibold">Add User Profile</h3>
              <div className="space-y-3">
                <input
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Full name"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm"
                />
                <input
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm"
                />
                <input
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  placeholder="Phone"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm"
                />
                <button onClick={handleAddStudent} className="w-full rounded-lg bg-linear-to-r from-[#B41F36] to-[#8E1327] py-2 text-sm font-semibold">
                  Add User
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/3 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-white/10">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-t border-white/10">
                      <td className="px-4 py-3">{student.full_name}</td>
                      <td className="px-4 py-3 text-gray-300">{student.email}</td>
                      <td className="px-4 py-3 text-gray-300">{student.phone || '-'}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => handleDeleteStudent(student.id)} className="rounded bg-red-500/15 px-3 py-1 text-xs text-red-300">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {!loading && activeTab === 'enrollments' ? (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-xl border border-white/10 bg-white/3 p-5">
              <h3 className="mb-4 font-semibold">Create Enrollment</h3>
              <div className="space-y-3">
                <select
                  value={enrollStudentId}
                  onChange={(e) => setEnrollStudentId(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm"
                >
                  <option value="">Select user</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.full_name} ({student.email})
                    </option>
                  ))}
                </select>
                <input
                  value={enrollCourseId}
                  onChange={(e) => setEnrollCourseId(e.target.value)}
                  placeholder="Course ID (or select from courses)"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm"
                />
                <button onClick={handleCreateEnrollment} className="w-full rounded-lg bg-linear-to-r from-[#B41F36] to-[#8E1327] py-2 text-sm font-semibold">
                  Add Enrollment
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-3">
              {enrollments.map((item) => (
                <div key={item.id} className="rounded-xl border border-white/10 bg-white/3 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="font-semibold">{item.students?.[0]?.full_name || item.student_id}</p>
                    <p className="text-xs text-gray-400">{item.students?.[0]?.email || 'Unknown email'} · Course: {item.course_id}</p>
                    <p className="text-xs text-gray-400">Status: {item.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEnrollmentStatus(item.id, 'approved')} className="rounded bg-green-600/20 px-3 py-1 text-xs text-green-300">
                      Approve
                    </button>
                    <button onClick={() => handleEnrollmentStatus(item.id, 'rejected')} className="rounded bg-red-600/20 px-3 py-1 text-xs text-red-300">
                      Reject
                    </button>
                    <button onClick={() => handleEnrollmentStatus(item.id, 'pending')} className="rounded bg-yellow-600/20 px-3 py-1 text-xs text-yellow-300">
                      Pending
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {!loading && activeTab === 'payments' ? (
          <section className="rounded-xl border border-white/10 bg-white/3 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-4 py-3 text-left">Student</th>
                  <th className="px-4 py-3 text-left">Course</th>
                  <th className="px-4 py-3 text-left">Slip</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {paymentSubmissions.map((item) => (
                  <tr key={item.id} className="border-t border-white/10">
                    <td className="px-4 py-3">{item.students?.[0]?.full_name || item.student_id}</td>
                    <td className="px-4 py-3 text-gray-300">{item.course_id}</td>
                    <td className="px-4 py-3 text-gray-300">{item.bank_slip_url}</td>
                    <td className="px-4 py-3 capitalize">{item.status}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleEnrollmentStatus(item.id, 'approved')} className="rounded bg-green-600/20 px-3 py-1 text-xs text-green-300">
                          Approve
                        </button>
                        <button onClick={() => handleEnrollmentStatus(item.id, 'rejected')} className="rounded bg-red-600/20 px-3 py-1 text-xs text-red-300">
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}

        {!loading && activeTab === 'courses' ? (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-xl border border-white/10 bg-white/3 p-5">
              <h3 className="mb-4 font-semibold">Add Course Details</h3>
              <div className="space-y-3">
                <input
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="Course title"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm"
                />
                <input
                  value={courseTitleSi}
                  onChange={(e) => setCourseTitleSi(e.target.value)}
                  placeholder="Sinhala title"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm"
                />
                <input
                  value={coursePrice}
                  onChange={(e) => setCoursePrice(e.target.value)}
                  placeholder="Monthly price"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm"
                />
                <button onClick={handleAddCourse} className="w-full rounded-lg bg-linear-to-r from-[#B41F36] to-[#8E1327] py-2 text-sm font-semibold">
                  Save Course
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-3">
              {courses.map((course) => (
                <div key={course.id} className="rounded-xl border border-white/10 bg-white/3 p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{course.title}</p>
                    <p className="text-xs text-gray-400">{course.title_si || '-'} · LKR {course.price ?? '-'}</p>
                  </div>
                  <button onClick={() => handleDeleteCourse(course.id)} className="rounded bg-red-500/15 px-3 py-1 text-xs text-red-300">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  )
}