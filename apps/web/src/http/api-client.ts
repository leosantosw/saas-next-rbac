import ky from 'ky'
import { cookies } from 'next/headers'

export const api = ky.create({
  prefixUrl: 'http://localhost:4000',
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
