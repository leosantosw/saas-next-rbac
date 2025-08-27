'use server'

import { env } from '@repo/env'
import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  const githubURL = new URL('https://github.com/login/oauth/authorize')

  githubURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
  githubURL.searchParams.set('scope', 'user:email')
  githubURL.searchParams.set(
    'redirect_uri',
    env.GITHUB_OAUTH_CLIENT_REDIRECT_URI
  )

  redirect(githubURL.toString())
}
