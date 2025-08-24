import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { rolesSchema } from '@repo/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function getOrganizations(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Get organizations',
          description: 'Get a list of organizations',
          response: {
            200: z.object({
              organizations: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  slug: z.string(),
                  avatarUrl: z.string().nullable(),
                  role: rolesSchema,
                })
              ),
            }),
          },
        },
      },
      async (request) => {
        const userId = await request.currentUserId()

        const organization = await prisma.organization.findMany({
          select: {
            id: true,
            name: true,
            slug: true,
            avatarUrl: true,
            members: {
              select: {
                role: true,
              },
              where: {
                userId,
              },
            },
          },
          where: {
            members: {
              some: {
                userId,
              },
            },
          },
        })

        const organizationsWithUserRole = organization.map(
          ({ members, ...org }) => {
            return {
              ...org,
              role: members[0]?.role,
            }
          }
        )

        return { organizations: organizationsWithUserRole }
      }
    )
}
