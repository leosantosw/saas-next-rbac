import { cookies } from 'next/headers'

export async function isAuthenticated() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('token')?.value
  return !!token
}
