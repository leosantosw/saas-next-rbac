import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'
import { User } from './model/user'
import { permissions } from './permissions'
import { AppAbilities } from './subjects'

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export * from './model/organization'
export * from './model/project'
export * from './model/user'
export * from './roles'

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Unknown role: ${user.role}`)
  }

  permissions[user.role](user, builder)

  return builder.build({
    detectSubjectType: (item) => {
      return item.__typename
    },
  })
}
