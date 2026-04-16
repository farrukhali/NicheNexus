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

    // Decode the pathname to get the actual characters (browsers send percent-encoded)
    let decoded: string
    try {
        decoded = decodeURIComponent(pathname)
    } catch {
        return NextResponse.next()
    }

    // Strip diacritics from non-ASCII characters
    // e.g. /pr/mariano-colón/... → /pr/mariano-colon/...
    if (!/^[\x00-\x7F]*$/.test(decoded)) {
        const normalized = decoded
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')

        if (normalized !== decoded) {
            const url = request.nextUrl.clone()
            url.pathname = normalized
            return NextResponse.redirect(url, 301)
        }
    }

    // Redirect uppercase paths to lowercase
    if (pathname !== pathname.toLowerCase()) {
        const url = request.nextUrl.clone()
        url.pathname = pathname.toLowerCase()
        return NextResponse.redirect(url, 301)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
    ],
}
