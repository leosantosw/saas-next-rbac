'use server'

import { revalidateTag } from 'next/cache'

import { getCurrentOrganization } from '@/auth/auth'
import { removeMember } from '@/http/remove-member'
import { updateMember } from '@/http/update-member'
import { Roles } from '@repo/auth'

export async function removeMemberAction(memberId: string) {
  const currentOrg = await getCurrentOrganization()

  await removeMember({
    org: currentOrg!,
    memberId,
  })

  revalidateTag(`${currentOrg}/members`)
}

export async function updateMemberAction(memberId: string, role: Roles) {
  const currentOrg = await getCurrentOrganization()

  await updateMember({
    org: currentOrg!,
    memberId,
    role,
  })

  revalidateTag(`${currentOrg}/members`)
}
