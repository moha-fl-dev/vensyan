// middleware.ts
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {

    const res = NextResponse.next()

    const supabase = createMiddlewareSupabaseClient({ req, res })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    const { user } = session

    if (!user) {
        return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    if (user.user_metadata.hasOrganization === false) {
        return NextResponse.redirect(new URL('/onboarding', req.url))
    }

    return res
}

export const config = {
    matcher: ['/dashboard/:path*'],
}