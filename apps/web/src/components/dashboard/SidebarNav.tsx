'use client'

import {
  LayoutDashboard,
  FileText,
  Users,
  Mail,
  FolderOpen,
  BarChart3,
  History,
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import { usePathname } from 'next/navigation'

interface SidebarNavProps {
  userEmail: string | undefined
  children: React.ReactNode
}

export function SidebarNav({ userEmail, children }: SidebarNavProps) {
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Loans', href: '/loans', icon: FileText },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Communications', href: '/communications', icon: Mail },
    { name: 'Documents', href: '/documents', icon: FolderOpen },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Activity Log', href: '/activity', icon: History },
    { name: 'Settings', href: '/settings', icon: Settings }
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col bg-card text-card-foreground border-r border-border md:flex">
        <div className="flex h-16 items-center border-b border-border px-6">
          <span className="font-semibold text-foreground">LendingApp</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                'hover:bg-muted/50 hover:text-foreground',
                pathname === item.href
                  ? 'bg-muted/50 text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              <item.icon className={cn(
                'h-4 w-4',
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
          <h1 className="text-lg font-semibold text-foreground capitalize">
            {pathname === '/' ? 'Dashboard' : pathname.split('/')[1]}
          </h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-sm text-muted-foreground">{userEmail}</span>
            <div className="h-8 w-8 rounded-full bg-muted" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  )
} 