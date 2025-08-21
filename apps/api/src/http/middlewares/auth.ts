import { FastifyInstance } from 'fastify'
import { UnauthorizedError } from '../routes/errors/unauthorized-error'
import fastifyPlugin from 'fastify-plugin'

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
  })
})
