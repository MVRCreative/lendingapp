'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getMessages, sendMessage, markMessageAsRead, subscribeToMessages } from '@/lib/supabase/communications'
import { Message } from '@/lib/supabase/types'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Send, Paperclip, File, Download } from 'lucide-react'

interface MessageThreadProps {
  conversationId: string
  userId: string
}

export function MessageThread({ conversationId, userId }: MessageThreadProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [messageInput, setMessageInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()
  
  // Load initial messages
  useEffect(() => {
    if (!conversationId) return
    
    const loadMessages = async () => {
      try {
        setLoading(true)
        const data = await getMessages(conversationId)
        // Reverse to get chronological order
        setMessages(data.reverse())
        
        // Mark last message as read if it's not from the current user
        if (data.length > 0 && data[data.length - 1].sender_id !== userId) {
          markMessageAsRead(conversationId, userId, data[data.length - 1].id)
        }
      } catch (error) {
        console.error('Error loading messages:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadMessages()
    
    // Subscribe to new messages
    const subscription = subscribeToMessages(conversationId, (newMessage) => {
      setMessages(prevMessages => [...prevMessages, newMessage])
      
      // Mark as read if not from current user
      if (newMessage.sender_id !== userId) {
        markMessageAsRead(conversationId, userId, newMessage.id)
      }
    })
    
    return () => {
      subscription.unsubscribe()
    }
  }, [conversationId, userId])
  
  // Scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!messageInput.trim() || !conversationId || isSending) return
    
    try {
      setIsSending(true)
      
      // Optimistic update
      const optimisticMessage: Message = {
        id: Date.now().toString(), // Temporary ID
        conversation_id: conversationId,
        sender_id: userId,
        content: messageInput,
        created_at: new Date().toISOString(),
        has_attachments: false,
      }
      
      setMessages(prevMessages => [...prevMessages, optimisticMessage])
      setMessageInput('')
      
      // Actually send the message
      await sendMessage(conversationId, userId, messageInput)
    } catch (error) {
      console.error('Error sending message:', error)
      // Could revert the optimistic update here
    } finally {
      setIsSending(false)
    }
  }
  
  // Group messages by date
  const groupedMessages = messages.reduce<{date: string, messages: Message[]}[]>((groups, message) => {
    const date = new Date(message.created_at).toLocaleDateString()
    
    const lastGroup = groups[groups.length - 1]
    if (lastGroup && lastGroup.date === date) {
      lastGroup.messages.push(message)
    } else {
      groups.push({
        date,
        messages: [message]
      })
    }
    
    return groups
  }, [])
  
  // Format the timestamp
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b">
        <h3 className="font-semibold">
          {loading ? 'Loading...' : messages.length > 0 ? (
            messages[0].sender_id !== userId 
              ? messages[0].sender?.full_name || 'Conversation' 
              : 'Conversation'
          ) : 'New Conversation'}
        </h3>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        ) : groupedMessages.length > 0 ? (
          <>
            {groupedMessages.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-4">
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-muted"></div>
                  <span className="mx-4 flex-shrink text-xs text-muted-foreground">{group.date}</span>
                  <div className="flex-grow border-t border-muted"></div>
                </div>
                
                {group.messages.map((message, messageIndex) => {
                  const isCurrentUser = message.sender_id === userId
                  const showAvatar = messageIndex === 0 || 
                    group.messages[messageIndex - 1].sender_id !== message.sender_id
                  
                  return (
                    <div 
                      key={message.id} 
                      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex ${!isCurrentUser && showAvatar ? 'space-x-2' : ''}`}>
                        {!isCurrentUser && showAvatar && (
                          <div className="h-8 w-8 rounded-full bg-muted flex-shrink-0 overflow-hidden">
                            {message.sender?.avatar_url ? (
                              <img 
                                src={message.sender.avatar_url} 
                                alt={message.sender.full_name} 
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary font-semibold">
                                {message.sender?.full_name.charAt(0).toUpperCase() || '?'}
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className={`max-w-[75%] ${!isCurrentUser && !showAvatar ? 'ml-10' : ''}`}>
                          {showAvatar && !isCurrentUser && (
                            <p className="text-xs text-muted-foreground mb-1">
                              {message.sender?.full_name}
                            </p>
                          )}
                          
                          <div 
                            className={`
                              p-3 rounded-lg
                              ${isCurrentUser 
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-foreground'
                              }
                            `}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          
                          <p className="text-xs text-muted-foreground mt-1 ml-1">
                            {formatTime(message.created_at)}
                          </p>
                          
                          {/* Attachments */}
                          {message.has_attachments && message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map(attachment => (
                                <div 
                                  key={attachment.id}
                                  className="flex items-center p-2 rounded bg-muted/50 border"
                                >
                                  <File className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span className="text-sm flex-1 truncate">
                                    {attachment.file_name}
                                  </span>
                                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No messages yet. Start the conversation!
          </div>
        )}
      </div>
      
      {/* Message Input */}
      <div className="p-3 border-t">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Button 
            type="button" 
            size="icon" 
            variant="ghost" 
            className="text-muted-foreground"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!messageInput.trim() || isSending}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
} 