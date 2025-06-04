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
      transactions: {
        Row: {
          id: string
          user_id: string
          date: string
          name: string
          amount: number
          category: string
          type: 'income' | 'expense'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date?: string
          name: string
          amount: number
          category: string
          type: 'income' | 'expense'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          name?: string
          amount?: number
          category?: string
          type?: 'income' | 'expense'
          created_at?: string
        }
      }
      budgets: {
        Row: {
          id: string
          user_id: string
          name: string
          amount: number
          spent: number
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          amount: number
          spent?: number
          category: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          amount?: number
          spent?: number
          category?: string
          created_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          user_id: string
          name: string
          target: number
          current: number
          target_date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          target: number
          current?: number
          target_date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          target?: number
          current?: number
          target_date?: string
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          name: string
          amount: number
          due_date: string
          status: 'upcoming' | 'due' | 'overdue' | 'paid'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          amount: number
          due_date: string
          status: 'upcoming' | 'due' | 'overdue' | 'paid'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          amount?: number
          due_date?: string
          status?: 'upcoming' | 'due' | 'overdue' | 'paid'
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