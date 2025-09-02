'use server'

import { getCurrentOrganization } from '@/auth/auth'
import { createProject } from '@/http/create-project'
import { HTTPError } from 'ky'
import z from 'zod'

const projectSchema = z.object({
  name: z.string().min(4, {
    error: 'Please, include at least 4 characters',
  }),
  description: z.string(),
})

export async function createProjectAction(data: FormData) {
  const result = projectSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    return {
      success: false,
      message: null,
      errors: z.flattenError(result.error).fieldErrors,
    }
  }

  const { name, description } = result.data
  try {
    const currentOrg = await getCurrentOrganization()
    await createProject({
      org: currentOrg!,
      name,
      description,
    })
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()
      return { success: false, message, errors: null }
    }

    console.error(error)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }
  return {
    success: true,
    message: 'Successfully saved the project',
    errors: null,
  }
}
