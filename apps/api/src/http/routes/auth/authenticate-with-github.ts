import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { BadRequestError } from '../errors/bad-request-error'
import { prisma } from '@/lib/prisma'
import { env } from '@repo/env'

export async function authenticateWithGithub(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/github',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Auth with email and github',
        body: z.object({
          code: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.body

      const githubAuthURL = new URL(
        'https://github.com/login/oauth/access_token'
      )

      githubAuthURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
      githubAuthURL.searchParams.set(
        'client_secret',
        env.GITHUB_OAUTH_CLIENT_SECRET
      )
      githubAuthURL.searchParams.set('code', code)

      const githubAccessTokenResponse = await fetch(githubAuthURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })

      const githubAccessTokenData = await githubAccessTokenResponse.json()

      const data = z
        .object({
          access_token: z.string(),
          token_type: z.literal('bearer'),
          scope: z.string(),
        })
        .parse(githubAccessTokenData)

      const githubUserResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      })

      const githubUserData = await githubUserResponse.json()

      const {
        id: githubId,
        name,
        email,
        avatar_url: avatarUrl,
      } = z
        .object({
          id: z.number().int().transform(String),
          name: z.string().nullable(),
          email: z.string().nullable(),
          avatar_url: z.string(),
        })
        .parse(githubUserData)

      if (email === null) {
        throw new BadRequestError(
          'Your GitHub account must have an email to authenticate.'
        )
      }

      let user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            name,
            email,
            avatarUrl,
          },
        })
      }

      let account = await prisma.account.findUnique({
        where: {
          provider: 'GITHUB',
          providerAccountId: githubId,
        },
      })

      if (!account) {
        account = await prisma.account.create({
          data: {
            userId: user.id,
            provider: 'GITHUB',
            providerAccountId: githubId,
          },
        })
      }

      const token = await reply.jwtSign(
        { sub: user.id },
        {
          sign: {
            expiresIn: '10d',
          },
        }
      )

      return reply.status(201).send({ token })
    }
  )
}
