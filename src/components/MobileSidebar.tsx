import type { ReactNode } from 'react'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export default function MobileSidebar({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed top-4 right-4 z-30 lg:hidden">Menu</Button>
      </SheetTrigger>
      <SheetContent side="right" className="lg:hidden w-80 bg-cv-paper overflow-y-auto">
        {children}
      </SheetContent>
    </Sheet>
  )
}
