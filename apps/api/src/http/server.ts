import { fastify } from 'fastify'
import fastifyCors from '@fastify/cors'
import {
  //   jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createAccount } from './routes/auth/create-account'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors)

app.register(createAccount)

app.listen({ port: 4000 }).then(() => {
  console.log('Server running on port 4000')
})
