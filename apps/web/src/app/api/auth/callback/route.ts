import { signInWithGithub } from '@/http/sign-in-with-github'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (!code) {
    return Response.json(
      { message: "OAuth callback failed: missing 'code' parameter in query." },
      { status: 400 }
    )
  }

  const { token } = await signInWithGithub({ code })

  const cookiesStore = await cookies()
  cookiesStore.set('token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 10, // 10 days
  })

  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = '/'
  redirectUrl.search = ''
  return NextResponse.redirect(redirectUrl)
}
