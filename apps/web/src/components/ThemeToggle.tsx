'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    console.log('ThemeToggle: initializing')
    // Check localStorage and system preference on mount
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    // Default to light theme if no preference is saved
    const shouldBeDark = savedTheme === 'dark' || (savedTheme === null && systemPrefersDark)
    console.log('ThemeToggle: initial state -', { savedTheme, systemPrefersDark, shouldBeDark })
    
    setIsDark(shouldBeDark)
    
    // Apply theme class immediately on mount
    document.documentElement.classList.toggle('dark', shouldBeDark)
    
    // If no theme is set in localStorage, default to light
    if (savedTheme === null) {
      localStorage.setItem('theme', shouldBeDark ? 'dark' : 'light')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    console.log('ThemeToggle: toggling to', newTheme ? 'dark' : 'light')
    setIsDark(newTheme)
    document.documentElement.classList.toggle('dark', newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 rounded-md"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="h-4 w-4 text-foreground" />
      ) : (
        <Sun className="h-4 w-4 text-foreground" />
      )}
    </Button>
  )
} 