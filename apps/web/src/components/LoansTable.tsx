import { FC } from 'react'

// Generate 50 placeholder loans
const loans = Array.from({ length: 50 }, (_, i) => ({
  id: `LOAN${String(i + 1).padStart(4, '0')}`,
  borrower: `${['Smith & Sons', 'Johnson LLC', 'Williams Corp', 'Brown Industries', 'Davis Enterprises', 'Miller Group', 'Wilson Holdings', 'Moore Finance', 'Taylor Ventures', 'Anderson Capital'][i % 10]}`,
  type: `${['Business', 'Personal', 'Mortgage', 'Auto', 'Education'][i % 5]} Loan`,
  status: `${['Active', 'Pending', 'Completed', 'Default', 'Review'][i % 5]}`,
  amount: `$${(Math.random() * 500000 + 10000).toFixed(2)}`,
  term: `${[12, 24, 36, 48, 60][i % 5]} months`,
  interestRate: `${(Math.random() * 10 + 2).toFixed(2)}%`,
  nextPayment: new Date(Date.now() + (i * 24 * 60 * 60 * 1000)).toLocaleDateString(),
}))

export const LoansTable: FC = () => {
  return (
    <div className="relative -mx-6">
      <table className="w-full">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold whitespace-nowrap text-foreground"
            >
              Loan ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold whitespace-nowrap text-foreground"
            >
              Borrower
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold whitespace-nowrap text-foreground"
            >
              Type
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
              Amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold whitespace-nowrap text-foreground"
            >
              Term
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold whitespace-nowrap text-foreground"
            >
              Interest Rate
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-sm font-semibold whitespace-nowrap text-foreground"
            >
              Next Payment
            </th>
            <th scope="col" className="relative px-6 py-3 whitespace-nowrap">
              <span className="sr-only">View</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {loans.map((loan) => (
            <tr key={loan.id} className="hover:bg-muted/50">
              <td className="px-6 py-3 text-sm whitespace-nowrap text-muted-foreground">{loan.id}</td>
              <td className="px-6 py-3 text-sm font-medium whitespace-nowrap text-foreground">
                {loan.borrower}
              </td>
              <td className="px-6 py-3 text-sm whitespace-nowrap text-foreground">{loan.type}</td>
              <td className="px-6 py-3 text-sm whitespace-nowrap">
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                  loan.status === 'Active' ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20' :
                  loan.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20' :
                  loan.status === 'Completed' ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20' :
                  loan.status === 'Default' ? 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20' :
                  'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20'
                }`}>
                  {loan.status}
                </span>
              </td>
              <td className="px-6 py-3 text-sm whitespace-nowrap text-muted-foreground">{loan.amount}</td>
              <td className="px-6 py-3 text-sm whitespace-nowrap text-muted-foreground">{loan.term}</td>
              <td className="px-6 py-3 text-sm whitespace-nowrap text-muted-foreground">{loan.interestRate}</td>
              <td className="px-6 py-3 text-sm whitespace-nowrap text-muted-foreground">{loan.nextPayment}</td>
              <td className="px-6 py-3 text-right text-sm font-medium whitespace-nowrap">
                <a href={`/loans/${loan.id}`} className="text-primary hover:text-primary/90">
                  View<span className="sr-only">, {loan.id}</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 