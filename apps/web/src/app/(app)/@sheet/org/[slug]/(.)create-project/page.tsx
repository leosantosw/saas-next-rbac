'use client'

import { ProjectForm } from '@/app/(app)/org/[slug]/create-project/project-form'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useRouter } from 'next/navigation'

export default function CreateProject() {
  const router = useRouter()
  return (
    <Sheet
      defaultOpen
      onOpenChange={() => {
        router.back()
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Project</SheetTitle>
        </SheetHeader>
        <div className="px-4 py-4">
          <ProjectForm />
        </div>
      </SheetContent>
    </Sheet>
  )
}
