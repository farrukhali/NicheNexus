import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Skip Next.js internals and static files
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/static') ||
        pathname.includes('.') // Skip files with extensions (images, css, etc.)
    ) {
        return NextResponse.next()
    }

    // Check if the path contains uppercase characters
    if (pathname !== pathname.toLowerCase()) {
        const url = request.nextUrl.clone()
        url.pathname = pathname.toLowerCase()
        return NextResponse.redirect(url, 301)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next (Next.js internals)
         * - static (static files)
         * - all files with extensions (e.g. favicon.ico)
         */
        '/((?!api|_next|static|[\\w-]+\\.\\w+).*)',
    ],
}
