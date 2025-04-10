'use client'

import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Bell, Lock, User, Mail, Building } from 'lucide-react'
import DropzoneAvatar from '@/components/DropzoneAvatar'
import { useUser } from '@/components/UserProvider'
import Link from 'next/link'

export default function SettingsPage() {
  const { user, profile, refreshProfile, loading } = useUser()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('Lending Co.')
  const [businessAddress, setBusinessAddress] = useState('123 Business St, City, State')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '')
      setEmail(profile.email || '')
    }
  }, [profile])

  const handleProfileUpdate = async () => {
    if (!user) return
    
    setSaving(true)
    setMessage(null)

    try {
      const supabase = (await import('@/lib/supabase/client')).createClient()
      
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (error) throw error

      await refreshProfile()
      setMessage({ text: 'Profile updated successfully', type: 'success' })
    } catch (error: any) {
      console.error('Error updating profile:', error)
      setMessage({ text: error.message || 'Failed to update profile', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarUpdate = (url: string) => {
    refreshProfile()
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">Please sign in</h2>
        <p className="text-muted-foreground mt-2">
          You need to be logged in to access settings
        </p>
        <Link href="/login" className="inline-block mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Manage your account preferences"
      />

      {message && (
        <div className={`p-4 rounded-md ${
          message.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="rounded-lg bg-muted p-2.5">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Profile Settings</h3>
              <p className="text-sm text-muted-foreground">
                Update your personal information
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex justify-center">
              <DropzoneAvatar 
                userId={user.id} 
                url={profile?.avatar_url} 
                onUploadComplete={handleAvatarUpdate} 
              />
            </div>

            <div className="space-y-4 md:w-2/3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Full Name
                </label>
                <Input 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Email Address
                </label>
                <Input 
                  value={email} 
                  disabled 
                  className="bg-muted" 
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Email changes require verification
                </p>
              </div>
              <Button 
                onClick={handleProfileUpdate} 
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Company Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="rounded-lg bg-muted p-2.5">
              <Building className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Company Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure your company details
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Company Name
              </label>
              <Input 
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)} 
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Business Address
              </label>
              <Input 
                value={businessAddress} 
                onChange={(e) => setBusinessAddress(e.target.value)} 
              />
            </div>
            <Button>Update Company Info</Button>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="rounded-lg bg-muted p-2.5">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Notification Preferences</h3>
              <p className="text-sm text-muted-foreground">
                Choose what updates you want to receive
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive updates about loan applications
                </p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">System Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Important system notifications
                </p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Marketing Updates</p>
                <p className="text-sm text-muted-foreground">
                  News and feature updates
                </p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="rounded-lg bg-muted p-2.5">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Security</h3>
              <p className="text-sm text-muted-foreground">
                Manage your security preferences
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Active Sessions
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
} 