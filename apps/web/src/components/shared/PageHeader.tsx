'use client'

import { cn } from '@/lib/utils'

interface PageHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  className?: string
}

export function PageHeader({
  heading,
  text,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between pb-4', className)}>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
} 