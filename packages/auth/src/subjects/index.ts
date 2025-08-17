import z from 'zod'
import { billingSubject } from './billing'
import { inviteSubject } from './invite'
import { organizationSubject } from './organization'
import { projectSubject } from './project'
import { userSubject } from './user'

const appAbilitiesSchema = z.union([
  userSubject,
  inviteSubject,
  billingSubject,
  projectSubject,
  organizationSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
])

export type AppAbilities = z.infer<typeof appAbilitiesSchema>
