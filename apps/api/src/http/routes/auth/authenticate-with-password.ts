import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z, { jwt } from 'zod'

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/password',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Auth with email and password',
        body: z.object({
          email: z.string(),
          password: z.string().min(4),
        }),
      },
    },
    async (request, reply) => {
      const { email, password } = request.body
      const userFromEmail = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (!userFromEmail) {
        return reply.status(401).send({ message: 'Invalid email or password' })
      }

      if (userFromEmail.passwordHash === null) {
        return reply.status(400).send({
          message: 'User does not have a password, use a social login',
        })
      }

      const isPasswordValid = await compare(
        password,
        userFromEmail.passwordHash
      )

      if (!isPasswordValid) {
        return reply.status(401).send({ message: 'Invalid email or password' })
      }

      const token = await reply.jwtSign(
        { sub: userFromEmail.id },
        {
          sign: {
            expiresIn: '10d',
          },
        }
      )

      return reply.status(201).send({ token })
    }
  )
}
