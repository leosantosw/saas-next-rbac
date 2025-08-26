import { auth } from '@/auth/auth'
import { AvatarFallback } from '@radix-ui/react-avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { ChevronDown, LogOut } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu'

export async function ProfileButton() {
  const user = await auth()
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex cursor-pointer items-center gap-3 outline-none">
          <div className="flex flex-col items-end">
            <span className="text-base font-medium">{user.name}</span>
            <span className="text-muted-foreground text-sm">{user.email}</span>
          </div>
          <Avatar>
            {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
            <AvatarFallback>
              {user.name
                ?.split(' ')
                .map((word) => word.charAt(0).toUpperCase().slice(0, 2))
                .join()}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="text-muted-foreground size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild className="cursor-pointer">
            <a href="/api/auth/sign-out">
              <LogOut className="mr-2 size-4" />
              Sign Out
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
