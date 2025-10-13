export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          date: string
          location: string
          description: string
          image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          date: string
          location: string
          description: string
          image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          date?: string
          location?: string
          description?: string
          image?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      federations: {
        Row: {
          id: string
          country: string
          name: string
          president: string
          secretary: string | null
          email: string
          phone: string
          address: string
          website: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          country: string
          name: string
          president: string
          secretary?: string | null
          email: string
          phone: string
          address: string
          website: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          country?: string
          name?: string
          president?: string
          secretary?: string | null
          email?: string
          phone?: string
          address?: string
          website?: string
          created_at?: string
          updated_at?: string
        }
      }
      news: {
        Row: {
          id: string
          title: string
          content: string
          summary: string
          author: string
          published: boolean
          image: string | null
          created_at: string
          updated_at: string
          language: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          summary: string
          author: string
          published?: boolean
          image?: string | null
          created_at?: string
          updated_at?: string
          language?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          summary?: string
          author?: string
          published?: boolean
          image?: string | null
          created_at?: string
          updated_at?: string
          language?: string
        }
      }
      players: {
        Row: {
          id: string
          nick: string
          country: string
          name: string
          games: number
          rating: number
          last_played: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nick: string
          country: string
          name: string
          games: number
          rating: number
          last_played: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nick?: string
          country?: string
          name?: string
          games?: number
          rating?: number
          last_played?: string
          created_at?: string
          updated_at?: string
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