'use client'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useRouter } from 'next/navigation'
import OrganizationForm from '../../create-organization/organization-form'

export default function CreateOrganization() {
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
          <SheetTitle>Create organization</SheetTitle>
        </SheetHeader>
        <div className="px-4 py-4">
          <OrganizationForm />
        </div>
      </SheetContent>
    </Sheet>
  )
}
