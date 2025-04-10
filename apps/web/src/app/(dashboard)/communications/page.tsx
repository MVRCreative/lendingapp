'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { ConversationList } from '@/components/communications/ConversationList'
import { MessageThread } from '@/components/communications/MessageThread'
import { UserInfoPanel } from '@/components/communications/UserInfoPanel'
import { useUser } from '@/components/UserProvider'
import { Conversation, UserProfile } from '@/lib/supabase/types'
import { Button } from '@/components/ui/Button'
import { PlusCircle } from 'lucide-react'

export default function CommunicationsPage() {
  const { user } = useUser()
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)
  
  // When selecting a conversation, update both the active conversation and selected user
  const handleSelectConversation = (conversation: Conversation, participant: UserProfile | null) => {
    setActiveConversation(conversation)
    setSelectedUser(participant)
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Sign in required</h2>
          <p className="text-muted-foreground">You need to be logged in to access communications</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <PageHeader 
        title="Communications" 
        description="Chat with clients and team members"
        actions={
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Conversation
          </Button>
        }
      />
      
      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-200px)]">
        {/* Conversation List */}
        <div className="col-span-3 border rounded-md overflow-hidden bg-card">
          <ConversationList 
            userId={user.id}
            onSelectConversation={handleSelectConversation}
            activeConversationId={activeConversation?.id}
          />
        </div>
        
        {/* Message Thread */}
        <div className="col-span-6 border rounded-md overflow-hidden bg-card">
          {activeConversation ? (
            <MessageThread 
              conversationId={activeConversation.id}
              userId={user.id}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Select a conversation to start chatting
            </div>
          )}
        </div>
        
        {/* User Details */}
        <div className="col-span-3 border rounded-md overflow-hidden bg-card">
          {selectedUser ? (
            <UserInfoPanel userId={selectedUser.id} />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Select a conversation to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 