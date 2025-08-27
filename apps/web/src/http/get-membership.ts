import { Roles } from '@repo/auth'
import { api } from './api-client'

interface MembershipResponse {
  membership: {
    id: string
    role: Roles
    userId: string
    organizationId: string
  }
}

export async function getMembership(org: string): Promise<MembershipResponse> {
  const result = await api
    .get(`organizations/${org}/membership`)
    .json<MembershipResponse>()
  return result
}
