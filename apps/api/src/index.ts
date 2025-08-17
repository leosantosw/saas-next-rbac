import { defineAbilityFor } from '@repo/auth'

const ability = defineAbilityFor({ role: 'MEMBER' })

const userCanInviteSomeoneElese = ability.can('invite', 'User')
const userCanDeleteOtherUsers = ability.can('delete', 'User')

console.log(userCanInviteSomeoneElese)
console.log(userCanDeleteOtherUsers)
