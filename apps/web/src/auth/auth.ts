import { getProfile } from '@/http/get-profile'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function isAuthenticated() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('token')?.value
  return !!token
}

export async function auth() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()
    return user
  } catch (error) {
    console.error(error)
  }

  redirect('/api/auth/sign-out')
}
