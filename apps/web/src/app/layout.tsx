import './globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { UserProvider } from '@/components/UserProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LendingApp',
  description: 'A modern lending platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
        inter.className,
        'min-h-screen bg-background font-sans antialiased'
      )}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
} 