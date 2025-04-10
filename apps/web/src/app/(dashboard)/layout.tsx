import { SidebarNav } from '@/components/dashboard/SidebarNav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SidebarNav>{children}</SidebarNav>
} 