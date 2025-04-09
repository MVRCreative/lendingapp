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