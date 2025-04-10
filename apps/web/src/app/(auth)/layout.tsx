import React from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-muted/50">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-3xl font-bold">LendingApp</h1>
          <p className="text-muted-foreground">Modern lending platform</p>
        </div>
        {children}
      </div>
    </div>
  )
} 