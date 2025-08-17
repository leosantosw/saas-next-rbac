import {
  createMongoAbility,
  CreateAbility,
  MongoAbility,
  AbilityBuilder,
} from '@casl/ability'
import { User } from './model/User'
import { permissions } from './permissions'
import { AppAbilities } from './subjects'

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
