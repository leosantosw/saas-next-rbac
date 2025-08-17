import {
  createMongoAbility,
  ForcedSubject,
  CreateAbility,
  MongoAbility,
  AbilityBuilder,
} from '@casl/ability'
import { permissions } from './permissions'
import { User } from './model/User'

const actions = ['manage', 'invite', 'delete'] as const
const subjects = ['User', 'all'] as const
type AppAbilities = [
  (typeof actions)[number],
  (
    | (typeof subjects)[number]
    | ForcedSubject<Exclude<(typeof subjects)[number], 'all'>>
  ),
]

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Unknown role: ${user.role}`)
  }

  permissions[user.role](user, builder)

  return builder.build()
}
