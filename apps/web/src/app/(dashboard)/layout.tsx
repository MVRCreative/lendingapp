import { createClient } from '@/lib/supabase/server'
import { SidebarNav } from '@/components/dashboard/SidebarNav'
import { ThemeToggle } from '@/components/ThemeToggle'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return <SidebarNav userEmail={user?.email}>{children}</SidebarNav>
} 