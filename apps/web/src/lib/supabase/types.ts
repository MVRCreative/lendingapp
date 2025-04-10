export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_by?: string
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          role: 'admin' | 'member' | 'borrower'
          name: string
          email: string
          org_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role: 'admin' | 'member' | 'borrower'
          name: string
          email: string
          org_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'admin' | 'member' | 'borrower'
          name?: string
          email?: string
          org_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      loans: {
        Row: {
          id: string
          borrower_id: string
          org_id: string
          amount: number
          term_months: number
          purpose: string | null
          status: 'pending' | 'active' | 'completed' | 'defaulted'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          borrower_id: string
          org_id: string
          amount: number
          term_months: number
          purpose?: string | null
          status?: 'pending' | 'active' | 'completed' | 'defaulted'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          borrower_id?: string
          org_id?: string
          amount?: number
          term_months?: number
          purpose?: string | null
          status?: 'pending' | 'active' | 'completed' | 'defaulted'
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          loan_id: string
          amount: number
          paid_at: string
          status: 'pending' | 'completed' | 'failed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          loan_id: string
          amount: number
          paid_at?: string
          status?: 'pending' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          loan_id?: string
          amount?: number
          paid_at?: string
          status?: 'pending' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          loan_id: string
          user_id: string
          file_url: string
          type: 'application' | 'contract' | 'payment' | 'other'
          uploaded_at: string
        }
        Insert: {
          id?: string
          loan_id: string
          user_id: string
          file_url: string
          type: 'application' | 'contract' | 'payment' | 'other'
          uploaded_at?: string
        }
        Update: {
          id?: string
          loan_id?: string
          user_id?: string
          file_url?: string
          type?: 'application' | 'contract' | 'payment' | 'other'
          uploaded_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          loan_id: string
          sender_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          loan_id: string
          sender_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          loan_id?: string
          sender_id?: string
          content?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// User profile
export type UserProfile = {
  id: string;
  full_name: string;
  avatar_url: string | null;
  email: string;
};

// Communications Types
export type Conversation = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string | null;
  is_group: boolean;
  participants?: ConversationParticipant[];
  last_message?: Message;
};

export type ConversationParticipant = {
  conversation_id: string;
  user_id: string;
  joined_at: string;
  last_read_message_id: string | null;
  user?: UserProfile;
};

export type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  has_attachments: boolean;
  sender?: UserProfile;
  attachments?: MessageAttachment[];
};

export type MessageAttachment = {
  id: string;
  message_id: string;
  file_path: string;
  file_name: string;
  file_size: number;
  file_type: string;
  created_at: string;
}; 