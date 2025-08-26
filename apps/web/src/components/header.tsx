import logo from '@/assets/logo.svg'
import Image from 'next/image'
import { ProfileButton } from './profile-button'
import { Slash } from 'lucide-react'
import { OrganizationSwitcher } from './organization-switcher'

export function Header() {
  return (
    <div className="mx-auto flex max-w-[1200px] justify-between">
      <div className="flex items-center gap-3">
        <Image src={logo} alt="logo" className="size-8 dark:invert" />
        <Slash className="text-border size-5 -rotate-[24deg]" />

        <OrganizationSwitcher />
      </div>
      <div className="">
        <ProfileButton />
      </div>
    </div>
  )
}
