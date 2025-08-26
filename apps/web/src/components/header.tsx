import logo from '@/assets/logo.svg'
import Image from 'next/image'
import { ProfileButton } from './profile-button'

export function Header() {
  return (
    <div className="mx-auto flex max-w-[1200px] justify-between">
      <div>
        <Image src={logo} alt="logo" className="size-10 dark:invert" />
      </div>
      <div className="">
        <ProfileButton />
      </div>
    </div>
  )
}
