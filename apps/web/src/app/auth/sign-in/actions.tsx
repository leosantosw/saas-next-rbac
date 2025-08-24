'use server'

import { signInWithPassword } from '@/http/sign-in-with-password'
import z from 'zod'

const formSchema = z.object({
  email: z.email({
    error: 'Please, provide a valid email address.',
  }),
  password: z.string().min(2, {
    error: 'Please, provide a valid password.',
  }),
})

export async function signInWithEmailAndPassword(
  previousState: unknown,
  data: FormData
) {
  const result = formSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    z.flattenError(result.error)
    return { success: false, error: z.flattenError(result.error).fieldErrors }
  }

  const { email, password } = result.data
  const { token } = await signInWithPassword({
    email: email,
    password: password,
  })

  console.log(token)
  await new Promise((resolve) => setTimeout(resolve, 2000))
}
