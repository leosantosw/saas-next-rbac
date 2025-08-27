import { api } from './api-client'

interface OrganizationsResponse {
  organizations: {
    id: string
    name: string
    slug: string
    avatarUrl: string
  }[]
}

export async function getOrganizations(): Promise<OrganizationsResponse> {
  const result = await api.get('organizations').json<OrganizationsResponse>()
  return result
}
