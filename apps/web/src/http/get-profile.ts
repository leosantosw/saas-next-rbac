import { api } from './api-client'

interface ProfileResponse {
  user: {
    id: string
    name: string | null
    email: string
    avatarUrl: string | null
  }
}

export async function getProfile(): Promise<ProfileResponse> {
  const result = await api.get('profile').json<ProfileResponse>()
  return result
}
