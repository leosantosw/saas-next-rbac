import { AbilityBuilder } from '@casl/ability'
import { AppAbility } from '.'
import { User } from './model/User'
import { Roles } from './roles'

type definePermissions = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Roles, definePermissions> = {
  ADMIN(_, { can }) {
    can('manage', 'all')
  },
  MEMBER(_, { can }) {
    can('manage', 'Project')
  },
  BILLING() {},
}
