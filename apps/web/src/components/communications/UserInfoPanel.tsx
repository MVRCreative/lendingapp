'use client'

import { useState, useEffect } from 'react'
import { getUserProfile } from '@/lib/supabase/communications'
import { UserProfile } from '@/lib/supabase/types'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FileText, Phone, Mail, Calendar, Banknote } from 'lucide-react'

interface UserInfoPanelProps {
  userId: string
}

export function UserInfoPanel({ userId }: UserInfoPanelProps) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if (!userId) return
    
    const loadUserProfile = async () => {
      try {
        setLoading(true)
        const data = await getUserProfile(userId)
        setUser(data)
      } catch (error) {
        console.error('Error loading user profile:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadUserProfile()
  }, [userId])
  
  // Mock data - in a real app this would come from your API
  const userLoans = [
    {
      id: 'loan-1',
      title: 'Personal Loan',
      amount: '$15,000',
      status: 'Active',
      dueDate: '2024-06-15'
    },
    {
      id: 'loan-2',
      title: 'Auto Loan',
      amount: '$32,500',
      status: 'Pending',
      dueDate: '2024-05-21'
    }
  ]
  
  const userDocuments = [
    {
      id: 'doc-1',
      title: 'Income Verification',
      type: 'PDF',
      date: '2024-03-15'
    },
    {
      id: 'doc-2',
      title: 'Proof of Address',
      type: 'PDF',
      date: '2024-03-12'
    },
    {
      id: 'doc-3',
      title: 'Credit Report',
      type: 'PDF',
      date: '2024-03-10'
    }
  ]
  
  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 space-y-4">
      {loading ? (
        <div className="flex items-center justify-center h-20">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        </div>
      ) : user ? (
        <>
          {/* User Profile */}
          <div className="flex flex-col items-center text-center p-4">
            <div className="h-20 w-20 rounded-full bg-muted overflow-hidden mb-4">
              {user.avatar_url ? (
                <img 
                  src={user.avatar_url} 
                  alt={user.full_name} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary font-semibold text-2xl">
                  {user.full_name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <h2 className="text-xl font-semibold">{user.full_name}</h2>
            <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
            
            <div className="flex gap-2 mb-2">
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button size="sm" variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </div>
          
          {/* Loans */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Loans</h3>
            <div className="space-y-3">
              {userLoans.map(loan => (
                <div key={loan.id} className="flex justify-between border-b pb-3">
                  <div>
                    <div className="flex items-center mb-1">
                      <Banknote className="h-4 w-4 mr-2 text-primary" />
                      <p className="font-medium text-sm">{loan.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Due: {new Date(loan.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{loan.amount}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      loan.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                    }`}>
                      {loan.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="mt-2 p-0">
              View all loans
            </Button>
          </Card>
          
          {/* Documents */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Recent Documents</h3>
            <div className="space-y-2">
              {userDocuments.map(doc => (
                <div key={doc.id} className="flex items-center p-2 rounded hover:bg-muted">
                  <FileText className="h-4 w-4 mr-3 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{doc.title}</p>
                    <div className="flex items-center">
                      <span className="text-xs text-muted-foreground">{doc.type}</span>
                      <span className="mx-1 text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(doc.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="mt-2 p-0">
              View all documents
            </Button>
          </Card>
          
          {/* Notes */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Upcoming Appointments</h3>
            <div className="space-y-2">
              <div className="flex items-start p-2 rounded hover:bg-muted">
                <Calendar className="h-4 w-4 mr-3 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Loan Review Meeting</p>
                  <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
                </div>
              </div>
            </div>
          </Card>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          No user selected
        </div>
      )}
    </div>
  )
} 