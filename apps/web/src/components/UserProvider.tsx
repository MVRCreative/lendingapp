'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'

type Profile = {
  id: string
  full_name: string | null
  email: string | null
  avatar_url: string | null
}

type UserContextType = {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const UserContext = createContext<UserContextType>({
  user: null,
  profile: null,
  session: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  // Fetch user profile data
  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        
        // If profile doesn't exist, create one
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating new profile')
          const { data: userData } = await supabase.auth.getUser()
          
          // Create a new profile
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: userId,
              email: userData.user?.email,
              full_name: userData.user?.user_metadata?.full_name || '',
              created_at: new Date().toISOString(),
            })
            .select()
            .single()
            
          if (createError) {
            console.error('Error creating profile:', createError)
            return null
          }
          
          console.log('New profile created:', newProfile)
          return newProfile as Profile
        }
        
        return null
      }

      console.log('Profile found:', data)
      return data as Profile
    } catch (error) {
      console.error('Error in profile fetch process:', error)
      return null
    }
  }

  // Refresh the user's profile data
  const refreshProfile = async () => {
    if (!user) {
      console.log('Cannot refresh profile - no user')
      return
    }

    console.log('Refreshing profile for user:', user.id)
    const profile = await fetchProfile(user.id)
    if (profile) {
      setProfile(profile)
      console.log('Profile refreshed successfully')
    } else {
      console.log('Failed to refresh profile')
    }
  }

  // Handle sign out
  const signOut = async () => {
    console.log('Signing out')
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setSession(null)
    router.push('/login')
    router.refresh()
  }

  // Initial session and auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth state...')
        // Get the initial session
        const { data: { session } } = await supabase.auth.getSession()
        console.log('Session result:', session ? 'Session exists' : 'No session')
        setSession(session)
        
        if (session?.user) {
          console.log('User found in session:', session.user.id)
          setUser(session.user)
          const profile = await fetchProfile(session.user.id)
          setProfile(profile)
        } else {
          console.log('No user in session')
        }

        // Set up auth state change listener
        const { data: { subscription } } = await supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('Auth state changed. Event:', event, 'Session:', session ? 'exists' : 'null')
            setSession(session)
            setUser(session?.user || null)
            
            if (session?.user) {
              console.log('Auth change: fetching profile for user', session.user.id)
              const profile = await fetchProfile(session.user.id)
              setProfile(profile)
            } else {
              console.log('Auth change: no user, clearing profile')
              setProfile(null)
            }
            
            router.refresh()
          }
        )

        return () => {
          subscription.unsubscribe()
        }
      } catch (error) {
        console.error('Error setting up auth:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext) 