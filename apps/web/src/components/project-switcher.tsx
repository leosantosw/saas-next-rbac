'use client'

import { ChevronsUpDown, Loader2, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/http/get-projects'
import { Skeleton } from './ui/skeleton'

export function ProjectSwitcher() {
  const { slug: organization, project: projectSlug } = useParams<{
    slug: string
    project: string
  }>()

  const { data, isLoading } = useQuery({
    queryFn: () => getProjects(organization),
    queryKey: [organization, 'projects'],
    enabled: !!organization,
  })

  const currentProject = data
    ? data?.projects.find((project) => project.slug === projectSlug)
    : null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-primary flex w-[168px] cursor-pointer items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-1">
        {isLoading ? (
          <>
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-4 w-full flex-1" />
          </>
        ) : (
          <>
            {currentProject ? (
              <>
                <Avatar className="size-4">
                  {currentProject.avatarUrl && (
                    <AvatarImage src={currentProject.avatarUrl} />
                  )}
                  <AvatarFallback />
                </Avatar>
                <span className="truncate text-left">
                  {currentProject.name}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground">Select project</span>
            )}
          </>
        )}

        {isLoading ? (
          <Loader2 className="text-muted-foreground ml-auto size-4 animate-spin" />
        ) : (
          <ChevronsUpDown className="text-muted-foreground ml-auto size-5 shrink-0" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-[200px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projects</DropdownMenuLabel>
          {data &&
            data?.projects.map((project) => {
              return (
                <DropdownMenuItem key={project.id} asChild>
                  <Link
                    className="cursor-pointer"
                    href={`/org/${organization}/project/${project.slug}`}
                  >
                    <Avatar className="mr-2 size-4">
                      {project.avatarUrl && (
                        <AvatarImage src={project.avatarUrl} />
                      )}
                      <AvatarFallback />
                    </Avatar>
                    <span className="line-clamp-1">{project.name}</span>
                  </Link>
                </DropdownMenuItem>
              )
            })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="">
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
