import type { FastifyInstance } from 'fastify'

import { BadRequestError } from '@/http/routes/errors/bad-request-error'
import { UnauthorizedError } from '@/http/routes/errors/unauthorized-error'
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    const formattedErrors: Record<string, string[]> = {}
    for (const issue of error.validation) {
      if (issue.instancePath && issue.message) {
        const fieldName = issue.instancePath.substring(1)

        if (fieldName) {
          if (!formattedErrors[fieldName]) {
            formattedErrors[fieldName] = []
          }
          formattedErrors[fieldName].push(issue.message)
        }
      }
    }

    return reply.status(400).send({
      message: 'Validation error.',
      errors: formattedErrors,
    })
  }

  if (error instanceof BadRequestError) {
    reply.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof UnauthorizedError) {
    reply.status(401).send({
      message: error.message,
    })
  }

  console.error(error)

  reply.status(500).send({ message: 'Internal server error' })
}
