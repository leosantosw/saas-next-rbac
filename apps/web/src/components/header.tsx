import logo from '@/assets/logo.svg'
import Image from 'next/image'
import { ProfileButton } from './profile-button'
import { Slash } from 'lucide-react'
import { OrganizationSwitcher } from './organization-switcher'
import { ability } from '@/auth/auth'
import { ThemeSwitcher } from './theme/theme-switcher'
import { Separator } from './ui/separator'

export async function Header() {
  const permissions = await ability()
  return (
    <div className="mx-auto flex max-w-[1200px] justify-between border-b pb-2">
      <div className="flex items-center gap-3">
        <Image src={logo} alt="logo" className="size-8 dark:invert" />

        <Slash className="text-border size-5 -rotate-[24deg]" />

        <OrganizationSwitcher />

        {permissions?.can('get', 'Project') && <p>Project</p>}
      </div>

      <div className="flex items-center gap-4 ">
        <ThemeSwitcher />
        <Separator orientation="vertical" style={{ height: '1.8rem' }} />
        <ProfileButton />
      </div>
    </div>
  )
}
