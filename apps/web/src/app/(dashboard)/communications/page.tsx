import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Mail, Search } from 'lucide-react'
import { Input } from '@/components/ui/Input'

export default function CommunicationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        heading="Communications"
        text="Manage client messages and notifications"
      >
        <Button>
          <Mail className="mr-2 h-4 w-4" />
          Compose
        </Button>
      </PageHeader>

      <div className="flex gap-4">
        {/* Filters */}
        <Card className="w-64 p-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Filters</h3>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  <span className="h-2 w-2 rounded-full bg-primary mr-2" />
                  Inbox
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <span className="h-2 w-2 rounded-full bg-yellow-400 mr-2" />
                  Pending
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                  Resolved
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Messages */}
        <Card className="flex-1 p-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-9"
              />
            </div>
          </div>
          <div className="space-y-2">
            {/* Message items */}
            <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <div className="h-10 w-10 rounded-full bg-muted" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <span className="text-xs text-muted-foreground">2h ago</span>
                </div>
                <p className="text-sm text-muted-foreground">Loan Application Update</p>
                <p className="text-sm line-clamp-1">Hi, I wanted to check on the status of my loan application...</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <div className="h-10 w-10 rounded-full bg-muted" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Michael Chen</h4>
                  <span className="text-xs text-muted-foreground">5h ago</span>
                </div>
                <p className="text-sm text-muted-foreground">Document Request</p>
                <p className="text-sm line-clamp-1">Please find attached the requested documents for my application...</p>
              </div>
            </div>

            {/* Add more message items as needed */}
          </div>
        </Card>
      </div>
    </div>
  )
} 