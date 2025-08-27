import { getMembership } from '@/http/get-membership'
import { getProfile } from '@/http/get-profile'
import { defineAbilityFor } from '@repo/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function isAuthenticated() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('token')?.value
  return !!token
}

export async function getCurrentOrganization() {
  const cookiesStore = await cookies()
  return cookiesStore.get('organization')?.value ?? null
}

async function getCurrentMembership() {
  const currentOrganization = await getCurrentOrganization()
  if (!currentOrganization) return null

  const { membership } = await getMembership(currentOrganization)
  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()
  if (!membership) return null
  const ability = defineAbilityFor({
    id: membership?.userId,
    role: membership?.role,
  })

  return ability
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
