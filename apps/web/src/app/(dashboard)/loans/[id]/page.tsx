import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { FileText, User, Calendar, DollarSign } from 'lucide-react'

export default function LoanDetailPage({ params }: { params: { id: string } }) {
  // Mock data - replace with real data fetching
  const loan = {
    id: params.id,
    amount: '$250,000',
    status: 'Active',
    client: 'John Smith',
    property: '123 Main St, Anytown, USA',
    createdDate: '2024-01-15',
    interestRate: '5.25%',
    term: '30 years',
    monthlyPayment: '$1,380.41',
    nextPayment: '2024-02-15',
    documents: [
      { name: 'Loan Agreement', date: '2024-01-15' },
      { name: 'Property Appraisal', date: '2024-01-10' },
      { name: 'Income Verification', date: '2024-01-08' },
    ]
  }

  const clientInfo = {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA',
    creditScore: 720
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Loan ${loan.id}`}
        description={`${loan.property} • ${loan.amount}`}
        actions={
          <>
            <Button variant="outline">Edit Loan</Button>
            <Button variant="destructive">Mark as Default</Button>
          </>
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Loan Details</h3>
          </div>
          <dl className="space-y-4">
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Amount</dt>
              <dd className="text-sm font-medium">{loan.amount}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Interest Rate</dt>
              <dd className="text-sm font-medium">{loan.interestRate}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Term</dt>
              <dd className="text-sm font-medium">{loan.term}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Monthly Payment</dt>
              <dd className="text-sm font-medium">{loan.monthlyPayment}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Next Payment</dt>
              <dd className="text-sm font-medium">{loan.nextPayment}</dd>
            </div>
          </dl>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Client Information</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-muted" />
              <div>
                <p className="font-medium">{loan.client}</p>
                <p className="text-sm text-muted-foreground">john.smith@example.com</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">View Client Profile</Button>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="schedule" className="p-6">
          <TabsList>
            <TabsTrigger value="schedule">Payment Schedule</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="schedule">
            <div className="mt-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Principal</th>
                    <th className="pb-2">Interest</th>
                    <th className="pb-2">Balance</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2">2024-03-15</td>
                    <td className="py-2">$750.25</td>
                    <td className="py-2">$625.50</td>
                    <td className="py-2">$124.75</td>
                    <td className="py-2">$20,500.75</td>
                    <td className="py-2">Pending</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="documents">
            <div className="mt-4">
              <p className="text-muted-foreground">No documents uploaded yet.</p>
            </div>
          </TabsContent>
          <TabsContent value="activity">
            <div className="mt-4">
              <p className="text-muted-foreground">No recent activity.</p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
} 