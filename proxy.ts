import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const cookies = request.cookies.getAll()
    const hasSession = cookies.some(c =>
      c.name.includes('auth-token') ||
      c.name.includes('supabase') ||
      c.name.includes('sb-')
    )
    if (!hasSession) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}