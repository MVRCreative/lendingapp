'use client'

import {
  LayoutDashboard,
  FileText,
  Users,
  Mail,
  FolderOpen,
  BarChart3,
  History,
  Settings,
  LogOut,
  User
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import { usePathname, useRouter } from 'next/navigation'
import Avatar from '@/components/Avatar'
import { useUser } from '@/components/UserProvider'
import { useState, useRef, useEffect } from 'react'

interface SidebarNavProps {
  children: React.ReactNode
}

export function SidebarNav({ children }: SidebarNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, profile, signOut, loading } = useUser()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Redirect to login if not authenticated and not already on auth page
  useEffect(() => {
    if (!loading && !user && !pathname.includes('/login') && !pathname.includes('/register')) {
      console.log('SidebarNav: No authenticated user, redirecting to login')
      router.push('/login')
    }
  }, [user, loading, pathname, router])

  // Close the user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // If user is not authenticated and not on an auth page, don't render dashboard
  if (!user && !pathname.includes('/login') && !pathname.includes('/register')) {
    return null
  }

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
                pathname === item.href || pathname.startsWith(item.href + '/')
                  ? 'bg-muted/50 text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              <item.icon className={cn(
                'h-4 w-4',
                pathname === item.href || pathname.startsWith(item.href + '/')
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
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Avatar
                  url={profile?.avatar_url}
                  name={profile?.full_name}
                  size="sm"
                />
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-card shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="p-4 border-b border-border">
                    <p className="font-medium text-sm">
                      {profile?.full_name || (user?.user_metadata?.full_name) || 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted"
                    >
                      <User className="h-4 w-4" />
                      Profile Settings
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-muted"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
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