import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Clock, Filter } from 'lucide-react'

// Mock data
const activities = [
  {
    id: 1,
    user: 'John Smith',
    action: 'Created Loan',
    target: 'Business Expansion Loan',
    date: '2024-02-15 14:30',
    type: 'create',
  },
  {
    id: 2,
    user: 'Sarah Wilson',
    action: 'Updated Client',
    target: 'Michael Brown',
    date: '2024-02-15 13:45',
    type: 'update',
  },
  {
    id: 3,
    user: 'Admin',
    action: 'Approved Loan',
    target: 'Property Purchase Loan',
    date: '2024-02-15 12:15',
    type: 'success',
  },
  {
    id: 4,
    user: 'System',
    action: 'Payment Failed',
    target: 'Loan #1234',
    date: '2024-02-15 10:30',
    type: 'error',
  },
]

export default function ActivityPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Activity Log"
        description="Track all system activities and changes"
        actions={
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        }
      />

      <Card className="p-6">
        <div className="space-y-6">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start justify-between border-b pb-6 last:border-0 last:pb-0"
            >
              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="rounded-full bg-muted p-2">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div>
                  <p className="font-medium">
                    <span className="text-primary">{activity.user}</span>
                    {' '}
                    {activity.action}
                    {' '}
                    <span className="text-primary">{activity.target}</span>
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge
                      variant={
                        activity.type === 'create'
                          ? 'default'
                          : activity.type === 'update'
                          ? 'warning'
                          : activity.type === 'success'
                          ? 'success'
                          : 'error'
                      }
                    >
                      {activity.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {activity.date}
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 