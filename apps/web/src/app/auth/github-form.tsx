import githubIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { signInWithGithub } from './actions'

interface GithubFormProps {
  label: string
}

export function GithubForm({ label }: GithubFormProps) {
  return (
    <form action={signInWithGithub}>
      <Button type="submit" className="w-full cursor-pointer" variant="outline">
        <Image
          src={githubIcon}
          alt="Github"
          className="mr-2 size-4 dark:invert"
        />
        {label}
      </Button>
    </form>
  )
}
