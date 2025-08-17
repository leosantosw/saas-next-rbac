import { AbilityBuilder } from '@casl/ability'
import { AppAbility } from '.'
import { User } from './model/user'
import { Roles } from './roles'

type definePermissions = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Roles, definePermissions> = {
  ADMIN(_, { can }) {
    can('manage', 'all')
  },
  MEMBER(user, { can }) {
    can(['create', 'get'], 'Project')
    can(['delete'], 'Project', { ownerId: { $eq: user.id } })
  },
  BILLING() {},
}
