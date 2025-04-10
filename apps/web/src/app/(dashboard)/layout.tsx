'use client'

import { SidebarNav } from '@/components/dashboard/SidebarNav'
import { useUser } from '@/components/UserProvider'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useUser()
  
  // When authentication completes, redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      redirect('/login')
    }
  }, [user, loading])
  
  // Show loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading authentication...</p>
        </div>
      </div>
    )
  }
  
  // If we're not loading and we have a user, render the dashboard
  if (user) {
    return <SidebarNav>{children}</SidebarNav>
  }
  
  // This return is needed to satisfy React but should never be rendered
  // because the useEffect will redirect to login if no user is found
  return null
} 