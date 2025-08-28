import { isAuthenticated } from '@/auth/auth'
import { Header } from '@/components/header'
import { redirect } from 'next/navigation'

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect('/auth/sign-in')
  }

  return <>{children}</>
}
