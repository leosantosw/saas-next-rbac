'use server'

import { signUp } from '@/http/sign-up'
import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import z from 'zod'

const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      error: 'Please, enter your full name',
    }),
    email: z.email({
      error: 'Please, provide a valid email address.',
    }),
    password: z.string().min(6, {
      error: 'Password should have at least 6 characteres',
    }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    error: "Passwords don't match",
    path: ['confirm_password'],
  })

export async function SignUpAction(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    return {
      success: false,
      message: null,
      errors: z.flattenError(result.error).fieldErrors,
    }
  }

  const { name, email, password } = result.data
  try {
    await signUp({
      name,
      email,
      password,
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

  redirect('/auth/sign-in')
}
