import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  DollarSign,
  Users,
  PiggyBank,
  TrendingUp,
  Wallet,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { RevenueChart } from '@/components/RevenueChart'

const transactions = [
  {
    id: 1,
    name: 'Anatoliy Demyanchuk',
    amount: '+$1,000.00 USDC',
    status: 'confirmed',
    wallet: '0x70c6...4b54',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    name: 'Zakharova Marina',
    amount: '-$1,000.00 USDC',
    status: 'failed',
    wallet: '0x70c6...4b54',
    timestamp: '3 hours ago',
  },
  {
    id: 3,
    name: 'Alexander',
    amount: '-$250.00 USDC',
    status: 'pending',
    wallet: '0x70c6...4b54',
    timestamp: '5 hours ago',
  },
]

const messages = [
  {
    id: 1,
    name: 'John Smith',
    message: 'When will my loan be approved?',
    timestamp: '1 hour ago',
    unread: true,
    loanName: 'Business Expansion Loan',
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    message: 'Thank you for the quick response',
    timestamp: '2 hours ago',
    unread: false,
    loanName: 'Property Purchase',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    message: 'I\'ve submitted all required documents',
    timestamp: '3 hours ago',
    unread: true,
    loanName: 'Equipment Finance',
  },
]

const recentClients = [
  {
    id: 1,
    name: 'Emma Thompson',
    status: 'active',
    amount: '$50,000',
    timestamp: '1 day ago',
  },
  {
    id: 2,
    name: 'David Chen',
    status: 'pending',
    amount: '$25,000',
    timestamp: '2 days ago',
  },
  {
    id: 3,
    name: 'Lisa Anderson',
    status: 'defaulted',
    amount: '$75,000',
    timestamp: '3 days ago',
  },
]

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back{user?.email ? `, ${user.email}` : ''}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your lending portfolio today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/20 p-2.5">
              <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">$2.4M</h3>
              <p className="text-sm font-medium text-muted-foreground">Total Loan Volume</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900/20 p-2.5">
              <Wallet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">156</h3>
              <p className="text-sm font-medium text-muted-foreground">Active Loans</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-2.5">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">892</h3>
              <p className="text-sm font-medium text-muted-foreground">Repaid Loans</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-2.5">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">23</h3>
              <p className="text-sm font-medium text-muted-foreground">Defaulted Loans</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/20 p-2.5">
              <TrendingUp className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">$48,592</h3>
              <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-purple-100 dark:bg-purple-900/20 p-2.5">
              <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">1,234</h3>
              <p className="text-sm font-medium text-muted-foreground">Active Borrowers</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-cyan-100 dark:bg-cyan-900/20 p-2.5">
              <MessageSquare className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">328</h3>
              <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Left Column (2/3) */}
        <div className="space-y-4 lg:col-span-2">
          {/* Chart */}
          <Card className="p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Revenue Overview</h3>
              <p className="text-sm text-muted-foreground">Monthly revenue trends</p>
            </div>
            <RevenueChart />
          </Card>

          {/* Recent Transactions */}
          <Card className="p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
              <p className="text-sm text-muted-foreground">Your latest lending activity</p>
            </div>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-md bg-muted/10 p-3 transition-colors hover:bg-muted/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted" />
                    <div>
                      <p className="font-medium text-foreground">{transaction.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{transaction.wallet}</span>
                        <span>•</span>
                        <span>{transaction.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {transaction.amount.startsWith('+') ? (
                        <ArrowUpRight className="h-4 w-4 text-primary" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-destructive" />
                      )}
                      <span
                        className={
                          transaction.amount.startsWith('+')
                            ? 'text-primary'
                            : 'text-destructive'
                        }
                      >
                        {transaction.amount}
                      </span>
                    </div>
                    <Badge
                      variant={
                        transaction.status === 'confirmed'
                          ? 'success'
                          : transaction.status === 'failed'
                          ? 'error'
                          : 'warning'
                      }
                      className="text-xs"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-4">
          {/* Recent Messages */}
          <Card className="p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Recent Messages</h3>
              <p className="text-sm text-muted-foreground">Latest communications</p>
            </div>
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="group flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-muted/20"
                >
                  <div className="h-10 w-10 rounded-full bg-muted" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate font-medium text-foreground">{message.name}</p>
                      {message.unread && (
                        <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{message.loanName}</p>
                    <p className="mt-1 text-sm text-foreground line-clamp-2">{message.message}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Clients */}
          <Card className="p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Recent Clients</h3>
              <p className="text-sm text-muted-foreground">Latest borrower activity</p>
            </div>
            <div className="space-y-3">
              {recentClients.map((client) => (
                <div
                  key={client.id}
                  className="group flex items-center justify-between rounded-md p-3 transition-colors hover:bg-muted/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted" />
                    <div>
                      <p className="font-medium text-foreground">{client.name}</p>
                      <p className="text-sm text-muted-foreground">{client.amount}</p>
                      <div className="mt-2 flex items-center justify-between gap-4">
                        <p className="text-xs text-muted-foreground">{client.timestamp}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      client.status === 'active'
                        ? 'success'
                        : client.status === 'pending'
                        ? 'warning'
                        : 'error'
                    }
                    className="text-xs"
                  >
                    {client.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Referral Box */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">Invite friends to LendingApp</h3>
            <p className="text-sm text-muted-foreground">
              Earn rewards when they sign up and start lending
            </p>
          </div>
          <Button variant="secondary" className="shrink-0 text-primary-foreground">
            Copy Link
          </Button>
        </div>
        <div className="mt-4">
          <Input
            readOnly
            value="https://lendingapp.com/refer/user123"
            className="bg-muted font-mono text-sm"
          />
        </div>
      </Card>
    </div>
  )
} 