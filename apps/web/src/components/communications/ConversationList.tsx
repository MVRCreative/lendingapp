'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getConversations } from '@/lib/supabase/communications'
import { Conversation, UserProfile } from '@/lib/supabase/types'
import { Input } from '@/components/ui/Input'
import { Search, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ConversationListProps {
  userId: string
  onSelectConversation: (conversation: Conversation, participant: UserProfile | null) => void
  activeConversationId?: string
}

export function ConversationList({ userId, onSelectConversation, activeConversationId }: ConversationListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  
  useEffect(() => {
    if (!userId) return
    
    const loadConversations = async () => {
      try {
        setLoading(true)
        const data = await getConversations(userId)
        setConversations(data)
      } catch (error) {
        console.error('Error loading conversations:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadConversations()
    
    // Subscribe to new conversations and updates
    const channel = supabase
      .channel('conversation-list-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'conversations',
        filter: `id=in.(${
          supabase.from('conversation_participants')
            .select('conversation_id')
            .eq('user_id', userId)
            .toString()
        })`
      }, () => {
        // Refresh conversation list when changes happen
        loadConversations()
      })
      .subscribe()
      
    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, supabase])
  
  const filteredConversations = conversations.filter(conversation => {
    // For 1:1 chats, check the other participant
    if (!conversation.is_group && conversation.participants) {
      const otherParticipant = conversation.participants.find(
        p => p.user_id !== userId
      )?.user
      
      if (otherParticipant) {
        return otherParticipant.full_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      }
    }
    
    // For group chats, check the title
    return conversation.title?.toLowerCase().includes(searchQuery.toLowerCase())
  })
  
  const handleSelectConversation = (conversation: Conversation) => {
    if (!conversation.participants) return
    
    // For 1:1 chat, find the other user
    const otherParticipant = !conversation.is_group
      ? conversation.participants.find(p => p.user_id !== userId)?.user || null
      : null
      
    onSelectConversation(conversation, otherParticipant)
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b">
        <div className="relative mb-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" className="w-full">
          <Plus className="h-4 w-4 mr-2" /> 
          New Conversation
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-20">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        ) : filteredConversations.length > 0 ? (
          <ul className="divide-y">
            {filteredConversations.map(conversation => {
              // Get the other participant for 1:1 chats
              const otherParticipant = !conversation.is_group && conversation.participants
                ? conversation.participants.find(p => p.user_id !== userId)?.user
                : null
                
              const displayName = conversation.is_group
                ? conversation.title
                : otherParticipant?.full_name || 'Unknown User'
                
              const displayAvatar = !conversation.is_group
                ? otherParticipant?.avatar_url
                : null
                
              return (
                <li
                  key={conversation.id}
                  className={`p-3 hover:bg-muted/50 cursor-pointer ${
                    activeConversationId === conversation.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-muted overflow-hidden">
                      {displayAvatar ? (
                        <img 
                          src={displayAvatar}
                          alt={displayName || ''} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary font-semibold">
                          {displayName ? displayName.charAt(0).toUpperCase() : '?'}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium truncate">{displayName}</p>
                        {conversation.updated_at && (
                          <p className="text-xs text-muted-foreground">
                            {new Date(conversation.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </p>
                        )}
                      </div>
                      {conversation.last_message && (
                        <p className="text-sm truncate text-muted-foreground">
                          {conversation.last_message.content}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            {searchQuery ? 'No matching conversations' : 'No conversations yet'}
          </div>
        )}
      </div>
    </div>
  )
} 