import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Bell, Lock, User, Mail, Building } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Manage your account preferences"
      />

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

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Full Name
              </label>
              <Input defaultValue="John Smith" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Email Address
              </label>
              <Input defaultValue="john.smith@example.com" />
            </div>
            <Button>Save Changes</Button>
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
              <Input defaultValue="Lending Co." />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Business Address
              </label>
              <Input defaultValue="123 Business St, City, State" />
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