import { FastifyInstance } from 'fastify'
import { UnauthorizedError } from '../routes/errors/unauthorized-error'
import fastifyPlugin from 'fastify-plugin'
import { prisma } from '@/lib/prisma'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('onRequest', async (request) => {
    request.currentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()
        return sub
      } catch (err) {
        throw new UnauthorizedError('Unauthorized')
      }
    }

    request.getUserMembership = async (slug: string) => {
      const userId = await request.currentUserId()
      const member = await prisma.member.findFirst({
        where: {
          userId,
          organization: {
            slug,
          },
        },
        include: {
          organization: true,
        },
      })

      if (!member) {
        throw new UnauthorizedError("you're not a member of this organization")
      }

      const { organization, ...membership } = member

      return {
        organization,
        membership,
      }
    }
  })
})
