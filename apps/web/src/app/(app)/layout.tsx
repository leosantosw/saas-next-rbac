import { isAuthenticated } from '@/auth/auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function AppLayout({
  children,
  sheet,
}: Readonly<{ children: React.ReactNode; sheet: React.ReactNode }>) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect('/auth/sign-in')
  }

  return (
    <>
      {children}
      {sheet}
    </>
  )
}
