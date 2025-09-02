import { env } from '@repo/env'
import { type CookiesFn, getCookie } from 'cookies-next'
import ky from 'ky'
import { redirect } from 'next/navigation'

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = await getTokenFromCookies()
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
    afterResponse: [
      (_: unknown, __: unknown, response) => {
        if (response.status === 401) {
          redirect('/auth/sign-in')
        }
      },
    ],
  },
})

async function getTokenFromCookies() {
  let cookieStore: CookiesFn | undefined

  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers')
    cookieStore = cookies
  }

  return getCookie('token', { cookies: cookieStore })
}
