import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FileText, Download } from 'lucide-react'

// Mock data
const documents = [
  {
    client: 'John Smith',
    files: [
      { id: 1, name: 'Income Verification.pdf', date: '2024-01-10', size: '2.4 MB' },
      { id: 2, name: 'Property Deed.pdf', date: '2024-01-12', size: '1.8 MB' },
    ],
  },
  {
    client: 'Sarah Wilson',
    files: [
      { id: 3, name: 'Bank Statements.pdf', date: '2024-01-15', size: '3.2 MB' },
      { id: 4, name: 'Tax Returns.pdf', date: '2024-01-15', size: '4.1 MB' },
    ],
  },
]

export default function DocumentsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Documents"
        description="View and manage client documents"
        actions={
          <Button>Upload Document</Button>
        }
      />

      <div className="space-y-6">
        {documents.map((group) => (
          <Card key={group.client} className="p-6">
            <h3 className="text-lg font-semibold mb-4">{group.client}</h3>
            <div className="space-y-4">
              {group.files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <div className="flex gap-2 text-sm text-muted-foreground">
                        <span>{file.date}</span>
                        <span>•</span>
                        <span>{file.size}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 