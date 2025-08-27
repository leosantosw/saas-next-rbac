import ky from 'ky'
import { cookies } from 'next/headers'
import { env } from '@repo/env'

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        console.info(`Server Path: ${new URL(request.url).pathname}`)
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        request.headers.set('Authorization', `Bearer ${token}`)
      },
    ],
  },
})
