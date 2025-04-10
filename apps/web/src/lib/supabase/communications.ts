import { createClient } from './client';
import type { Conversation, ConversationParticipant, Message, UserProfile, MessageAttachment } from './types';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

/**
 * Get all conversations for a user
 */
export async function getConversations(userId: string): Promise<Conversation[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('conversation_participants')
    .select(`
      conversation_id,
      conversations:conversation_id(
        id,
        created_at,
        updated_at,
        title,
        is_group
      ),
      participants:conversation_participants(
        conversation_id,
        user_id,
        joined_at,
        last_read_message_id,
        users:user_id(id, full_name, avatar_url, email)
      )
    `)
    .eq('user_id', userId)
    .order('conversations.updated_at', { ascending: false });
    
  if (error) throw error;
  
  // Post-process to structure data nicely
  return data.map(item => {
    const conversation = item.conversations as Conversation;
    conversation.participants = item.participants.map(p => ({
      conversation_id: p.conversation_id,
      user_id: p.user_id,
      joined_at: p.joined_at,
      last_read_message_id: p.last_read_message_id,
      user: p.users as UserProfile
    }));
    return conversation;
  });
}

/**
 * Get last message for each conversation
 */
export async function getLastMessages(conversationIds: string[]): Promise<Message[]> {
  if (!conversationIds.length) return [];
  
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('messages')
    .select(`
      id,
      conversation_id,
      content,
      created_at,
      sender_id,
      has_attachments,
      sender:sender_id(id, full_name, avatar_url, email)
    `)
    .in('conversation_id', conversationIds)
    .order('created_at', { ascending: false })
    .limit(1);
    
  if (error) throw error;
  
  return data.map(message => ({
    ...message,
    sender: message.sender as UserProfile
  })) as Message[];
}

/**
 * Get messages for a conversation
 */
export async function getMessages(conversationId: string, limit = 50): Promise<Message[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('messages')
    .select(`
      id,
      conversation_id,
      sender_id,
      content,
      created_at,
      has_attachments,
      sender:sender_id(id, full_name, avatar_url, email),
      attachments:message_attachments(
        id,
        file_path,
        file_name,
        file_size,
        file_type,
        created_at
      )
    `)
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: false })
    .limit(limit);
    
  if (error) throw error;
  
  return data.map(message => ({
    ...message,
    sender: message.sender as UserProfile,
    attachments: message.attachments as MessageAttachment[]
  })) as Message[];
}

/**
 * Send a message in a conversation
 */
export async function sendMessage(conversationId: string, senderId: string, content: string): Promise<Message> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      sender_id: senderId,
      content
    })
    .select();
    
  if (error) throw error;
  
  return data[0] as Message;
}

/**
 * Create a new conversation
 */
export async function createConversation(
  userId: string, 
  participantIds: string[], 
  isGroup = false, 
  title?: string
): Promise<Conversation> {
  const supabase = createClient();
  
  // Start transaction
  const { data: conversation, error: convError } = await supabase
    .from('conversations')
    .insert({
      title,
      is_group: isGroup
    })
    .select()
    .single();
    
  if (convError) throw convError;
  
  // Add all participants (including creator)
  const allParticipants = [...new Set([userId, ...participantIds])];
  const participants = allParticipants.map(id => ({
    conversation_id: conversation.id,
    user_id: id
  }));
  
  const { error: partError } = await supabase
    .from('conversation_participants')
    .insert(participants);
    
  if (partError) throw partError;
  
  return conversation as Conversation;
}

/**
 * Get a user profile by ID
 */
export async function getUserProfile(userId: string): Promise<UserProfile> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url, email')
    .eq('id', userId)
    .single();
    
  if (error) throw error;
  
  return data as UserProfile;
}

/**
 * Mark a message as read
 */
export async function markMessageAsRead(conversationId: string, userId: string, messageId: string): Promise<boolean> {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('conversation_participants')
    .update({ last_read_message_id: messageId })
    .eq('conversation_id', conversationId)
    .eq('user_id', userId);
    
  if (error) throw error;
  
  return true;
}

/**
 * Subscribe to new messages in a conversation
 */
export function subscribeToMessages(conversationId: string, callback: (message: Message) => void) {
  const supabase = createClient();
  
  return supabase
    .channel(`conversation-${conversationId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `conversation_id=eq.${conversationId}`
    }, payload => {
      // Fetch complete message with sender info
      getMessageById(payload.new.id).then(message => {
        if (message) callback(message);
      });
    })
    .subscribe();
}

/**
 * Get a message by ID with sender info
 */
async function getMessageById(messageId: string): Promise<Message | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('messages')
    .select(`
      id,
      conversation_id,
      sender_id,
      content,
      created_at,
      has_attachments,
      sender:sender_id(id, full_name, avatar_url, email),
      attachments:message_attachments(
        id,
        file_path,
        file_name,
        file_size,
        file_type,
        created_at
      )
    `)
    .eq('id', messageId)
    .single();
    
  if (error) return null;
  
  return {
    ...data,
    sender: data.sender as UserProfile,
    attachments: data.attachments as MessageAttachment[]
  } as Message;
} 