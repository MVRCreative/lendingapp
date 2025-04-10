import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'

// Mock data
const client = {
  id: '1',
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '(555) 123-4567',
  status: 'active',
  loans: [
    { id: 1, amount: '$250,000', status: 'active', property: '123 Main St' },
    { id: 2, amount: '$180,000', status: 'paid', property: '456 Oak Ave' },
  ],
  referrals: [
    { id: 1, name: 'Sarah Wilson', status: 'converted', date: '2024-01-15' },
    { id: 2, name: 'Mike Johnson', status: 'pending', date: '2024-02-01' },
  ],
  documents: [
    { id: 1, name: 'Income Verification.pdf', date: '2024-01-10' },
    { id: 2, name: 'Property Deed.pdf', date: '2024-01-12' },
  ],
}

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8">
      <PageHeader
        title={client.name}
        description={client.email}
        actions={
          <div className="flex gap-3">
            <Button variant="outline">Edit Client</Button>
            <Button>New Loan</Button>
          </div>
        }
      />

      <Tabs defaultValue="overview" className="space-y-6">
        <Card className="p-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
        </Card>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Client Information</h3>
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-sm text-muted-foreground">Email</dt>
                  <dd className="text-sm font-medium">{client.email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-muted-foreground">Phone</dt>
                  <dd className="text-sm font-medium">{client.phone}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-muted-foreground">Status</dt>
                  <dd>
                    <Badge variant="success">{client.status}</Badge>
                  </dd>
                </div>
              </dl>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Active Loans</h3>
              <div className="space-y-4">
                {client.loans.map((loan) => (
                  <div key={loan.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{loan.property}</p>
                      <p className="text-sm text-muted-foreground">{loan.amount}</p>
                    </div>
                    <Badge
                      variant={loan.status === 'active' ? 'success' : 'default'}
                    >
                      {loan.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="referrals">
          <Card className="p-6">
            <div className="space-y-4">
              {client.referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{referral.name}</p>
                    <p className="text-sm text-muted-foreground">{referral.date}</p>
                  </div>
                  <Badge
                    variant={referral.status === 'converted' ? 'success' : 'warning'}
                  >
                    {referral.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="p-6">
            <div className="space-y-4">
              {client.documents.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{document.name}</p>
                    <p className="text-sm text-muted-foreground">{document.date}</p>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 