import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { Plus, Search } from 'lucide-react'
import { LoansTable } from '@/components/LoansTable'

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

      <Card>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by borrower or loan ID"
                className="pl-9"
              />
            </div>
            <div className="flex gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="default">Default</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="amount">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="term">Term</SelectItem>
                  <SelectItem value="interestRate">Interest Rate</SelectItem>
                  <SelectItem value="nextPayment">Next Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <LoansTable />
        </div>
      </Card>
    </div>
  )
} 