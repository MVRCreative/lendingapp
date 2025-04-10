import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Download, FileSpreadsheet, FileText, BarChart2 } from 'lucide-react'

// Mock data
const reports = [
  {
    id: 1,
    name: 'Loan Performance Report',
    description: 'Monthly overview of loan performance metrics',
    icon: BarChart2,
    format: 'Excel',
  },
  {
    id: 2,
    name: 'Client Activity Summary',
    description: 'Detailed breakdown of client interactions',
    icon: FileSpreadsheet,
    format: 'CSV',
  },
  {
    id: 3,
    name: 'Risk Assessment Report',
    description: 'Analysis of portfolio risk factors',
    icon: FileText,
    format: 'PDF',
  },
]

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Reports"
        description="Generate and download reports"
        actions={
          <Button>Create Custom Report</Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.id} className="p-6">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <div className="rounded-lg bg-muted p-2.5 w-fit">
                  <report.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">{report.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {report.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {report.format}
                </span>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Custom Report Builder</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Select metrics and filters to generate a custom report based on your needs.
        </p>
        <div className="flex gap-3">
          <Button variant="outline">Configure Report</Button>
          <Button variant="outline">Schedule Export</Button>
        </div>
      </Card>
    </div>
  )
} 