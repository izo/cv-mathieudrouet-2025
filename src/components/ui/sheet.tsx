import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

export const Sheet = Dialog.Root
export const SheetTrigger = Dialog.Trigger
export const SheetClose = Dialog.Close

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  React.ComponentPropsWithoutRef<typeof Dialog.Content> & { side?: 'left' | 'right' | 'top' | 'bottom' }
>(({ side = 'right', className, children, ...props }, ref) => (
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
    <Dialog.Content
      ref={ref}
      className={cn(
        'fixed z-50 bg-white p-6 shadow-lg transition-transform',
        side === 'right' && 'inset-y-0 right-0 w-80',
        side === 'left' && 'inset-y-0 left-0 w-80',
        side === 'top' && 'inset-x-0 top-0 h-1/3',
        side === 'bottom' && 'inset-x-0 bottom-0 h-1/3',
        className
      )}
      {...props}
    >
      {children}
    </Dialog.Content>
  </Dialog.Portal>
))
SheetContent.displayName = 'SheetContent'
