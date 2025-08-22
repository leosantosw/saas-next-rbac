import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { BadRequestError } from '../errors/bad-request-error'
import { auth } from '@/http/middlewares/auth'
import { hash } from 'bcryptjs'
import { UnauthorizedError } from '../errors/unauthorized-error'

export async function resetPassword(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/password/reset',
      {
        schema: {
          tags: ['Reset Password'],
          summary: 'Reset password',
          body: z.object({
            code: z.string(),
            password: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { code, password } = request.body

        const userFromToken = await prisma.token.findUnique({
          where: {
            id: code,
          },
        })

        if (!userFromToken) {
          throw new UnauthorizedError('Invalid password reset code')
        }

        const passwordHash = await hash(password, 8)

        await prisma.user.update({
          where: {
            id: userFromToken.userId,
          },
          data: {
            passwordHash,
          },
        })

        await prisma.token.delete({
          where: {
            id: code,
          },
        })

        return reply.status(204).send()
      }
    )
}
