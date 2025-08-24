'use server'

import { signInWithPassword } from '@/http/sign-in-with-password'
import { HTTPError } from 'ky'
import z from 'zod'

const formSchema = z.object({
  email: z.email({
    error: 'Please, provide a valid email address.',
  }),
  password: z.string().min(2, {
    error: 'Please, provide a valid password.',
  }),
})

export async function signInWithEmailAndPassword(_: unknown, data: FormData) {
  const result = formSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    z.flattenError(result.error)
    return {
      success: false,
      message: null,
      errors: z.flattenError(result.error).fieldErrors,
    }
  }

  const { email, password } = result.data
  try {
    const { token } = await signInWithPassword({
      email,
      password,
    })
    console.log(token)
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

  return { success: true, message: null, errors: null }
}
