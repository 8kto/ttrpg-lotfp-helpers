import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { DEFAULT_LOCALE } from '@/translations/languages'

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return
  }

  if (req.nextUrl.locale === 'default') {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || DEFAULT_LOCALE

    return NextResponse.redirect(
      new URL(
        `/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`,
        req.url,
      ),
    )
  }
}
