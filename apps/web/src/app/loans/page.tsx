import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Plus } from 'lucide-react'

export default function LoansPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        heading="Loans"
        text="Manage and track all loan applications"
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Loan
        </Button>
      </PageHeader>

      <Card className="p-6">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Loan ID
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Client
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Property
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Amount
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Status
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Created Date
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {/* Placeholder rows - we'll add real data later */}
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle">LOAN-001</td>
                <td className="p-4 align-middle">John Smith</td>
                <td className="p-4 align-middle">123 Main St</td>
                <td className="p-4 align-middle">$250,000</td>
                <td className="p-4 align-middle">
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Active
                  </span>
                </td>
                <td className="p-4 align-middle">2024-01-15</td>
              </tr>
              {/* Add more placeholder rows as needed */}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
} 