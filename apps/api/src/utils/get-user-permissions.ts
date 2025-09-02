import { defineAbilityFor, userSchema, type Roles } from '@repo/auth'

export function getUserPermissions(userId: string, role: Roles) {
  const authUser = userSchema.parse({ id: userId, role })
  const ability = defineAbilityFor(authUser)
  return ability
}
