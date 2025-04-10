'use client'

import { FC } from 'react'

// Generate 50 placeholder clients
const allClients = Array.from({ length: 50 }, (_, i) => ({
  id: `CLI${String(i + 1).padStart(4, '0')}`,
  name: `${['John Smith', 'Sarah Johnson', 'Michael Williams', 'Emma Brown', 'James Davis', 'Emily Miller', 'William Wilson', 'Olivia Moore', 'Daniel Taylor', 'Sophia Anderson'][i % 10]}`,
  company: `${['Acme Corp', 'Global Industries', 'Tech Solutions', 'First Finance', 'Summit Holdings', 'Valley Ventures', 'Peak Enterprises', 'Blue Ocean LLC', 'Green Energy Co', 'Star Systems'][i % 10]}`,
  email: `${['john', 'sarah', 'michael', 'emma', 'james', 'emily', 'william', 'olivia', 'daniel', 'sophia'][i % 10]}@${['gmail.com', 'yahoo.com', 'outlook.com', 'company.com', 'business.net'][i % 5]}`,
  status: `${['Active', 'Pending', 'Inactive', 'New', 'VIP'][i % 5]}`,
  loans: Math.floor(Math.random() * 5) + 1,
  totalValue: `$${(Math.random() * 1000000 + 50000).toFixed(2)}`,
  lastActivity: new Date(Date.now() - (Math.random() * 30 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
}))

interface ClientsTableProps {
  searchQuery: string
  statusFilter: string
  sortBy: string
}

export const ClientsTable: FC<ClientsTableProps> = ({ searchQuery, statusFilter, sortBy }) => {
  // Filter and sort clients
  const filteredClients = allClients
    .filter(client => {
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          client.name.toLowerCase().includes(query) ||
          client.id.toLowerCase().includes(query) ||
          client.company.toLowerCase().includes(query) ||
          client.email.toLowerCase().includes(query)
        )
      }
      return true
    })
    .filter(client => {
      // Apply status filter
      if (statusFilter && statusFilter !== 'all') {
        return client.status.toLowerCase() === statusFilter.toLowerCase()
      }
      return true
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'totalValue':
          return parseFloat(b.totalValue.replace(/[^0-9.-]+/g, '')) - parseFloat(a.totalValue.replace(/[^0-9.-]+/g, ''))
        case 'loans':
          return b.loans - a.loans
        case 'lastActivity':
          return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
        default:
          return 0
      }
    })

  return (
    <div className="relative -mx-6">
      <table className="w-full">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold whitespace-nowrap text-foreground"
            >
              Client ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold whitespace-nowrap text-foreground"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold whitespace-nowrap text-foreground"
            >
              Company
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold whitespace-nowrap text-foreground"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold whitespace-nowrap text-foreground"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold whitespace-nowrap text-foreground"
            >
              Active Loans
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold whitespace-nowrap text-foreground"
            >
              Total Value
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold whitespace-nowrap text-foreground"
            >
              Last Activity
            </th>
            <th scope="col" className="relative px-6 py-3 whitespace-nowrap">
              <span className="sr-only">View</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {filteredClients.map((client) => (
            <tr key={client.id} className="hover:bg-muted/50">
              <td className="px-6 py-3 text-sm whitespace-nowrap text-muted-foreground">{client.id}</td>
              <td className="px-6 py-3 text-sm font-medium whitespace-nowrap text-foreground">
                {client.name}
              </td>
              <td className="px-6 py-3 text-sm whitespace-nowrap text-foreground">{client.company}</td>
              <td className="px-6 py-3 text-sm whitespace-nowrap text-muted-foreground">{client.email}</td>
              <td className="px-6 py-3 text-sm whitespace-nowrap">
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                  client.status === 'Active' ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20' :
                  client.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20' :
                  client.status === 'VIP' ? 'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20' :
                  client.status === 'Inactive' ? 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20' :
                  'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20'
                }`}>
                  {client.status}
                </span>
              </td>
              <td className="px-6 py-3 text-sm whitespace-nowrap text-muted-foreground">{client.loans}</td>
              <td className="px-6 py-3 text-sm whitespace-nowrap text-muted-foreground">{client.totalValue}</td>
              <td className="px-6 py-3 text-sm whitespace-nowrap text-muted-foreground">{client.lastActivity}</td>
              <td className="px-6 py-3 text-right text-sm font-medium whitespace-nowrap">
                <a href={`/clients/${client.id}`} className="text-primary hover:text-primary/90">
                  View<span className="sr-only">, {client.id}</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 