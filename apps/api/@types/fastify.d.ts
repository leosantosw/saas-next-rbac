import 'fastify'
import { Member, Organization } from '@prisma/client'

declare module 'fastify' {
  export interface FastifyRequest {
    currentUserId: () => Promise<string>
    getUserMembership: (
      slug: string
    ) => Promise<{ organization: Organization; membership: Member }>
  }
}
