'use client'

import { LayoutDashboard, CreditCard, Wallet, PiggyBank, Users } from 'lucide-react'
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
    { name: 'Lend', href: '/dashboard/lend', icon: CreditCard },
    { name: 'Borrow', href: '/dashboard/borrow', icon: PiggyBank },
    { name: 'My Loans', href: '/dashboard/loans', icon: Wallet },
    { name: 'Referrals', href: '/dashboard/referrals', icon: Users },
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
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground',
                'hover:bg-muted hover:text-foreground transition-colors',
                pathname === item.href && 'bg-primary text-primary-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
          <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
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