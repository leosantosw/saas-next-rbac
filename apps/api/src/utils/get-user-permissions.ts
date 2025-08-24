import { defineAbilityFor, userSchema, type Roles } from '@repo/auth'

export function getUserPermissions(userId: string, role: Roles) {
  const authUser = userSchema.parse({ userId, role })
  const ability = defineAbilityFor(authUser)
  return ability
}
