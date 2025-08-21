import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { hash } from 'bcryptjs'

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string(),
          password: z.string().min(4),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body
      const userWithSameEmail = await prisma.user.findFirst({
        where: { email },
      })

      if (userWithSameEmail) {
        return reply.status(409).send({ message: 'Email already in use' })
      }

      const passwordHash = await hash(password, 8)

      await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
      })

      return reply.status(201).send({ message: 'User created successfully' })
    }
  )
}
