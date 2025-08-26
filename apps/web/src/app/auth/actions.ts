'use server'

import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  const githubURL = new URL('https://github.com/login/oauth/authorize')

  githubURL.searchParams.set('client_id', '')
  githubURL.searchParams.set('scope', 'user:email')
  githubURL.searchParams.set(
    'redirect_uri',
    'http://localhost:3000/api/auth/callback'
  )

  redirect(githubURL.toString())
}
