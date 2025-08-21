import { fastify } from 'fastify'
import fastifyCors from '@fastify/cors'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createAccount } from './routes/auth/create-account'
import fastifySwagger from '@fastify/swagger'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'RBAC Node API',
      description: 'Full stack app',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})

app.register(import('@scalar/fastify-api-reference'), {
  routePrefix: '/docs',
})

app.register(fastifyCors)
app.register(createAccount)

app.listen({ port: 4000 }).then(() => {
  console.log('Server running on port 4000')
})
