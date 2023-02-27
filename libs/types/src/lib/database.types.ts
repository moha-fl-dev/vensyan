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
      suppliers: {
        Row: {
          created_at: string
          sector: Database["public"]["Enums"]["sector"]
          supplier_id: string
          supplier_name: string
          supplier_type: Database["public"]["Enums"]["supplier_type"]
          user_id: string
        }
        Insert: {
          created_at?: string
          sector?: Database["public"]["Enums"]["sector"]
          supplier_id?: string
          supplier_name: string
          supplier_type?: Database["public"]["Enums"]["supplier_type"]
          user_id?: string
        }
        Update: {
          created_at?: string
          sector?: Database["public"]["Enums"]["sector"]
          supplier_id?: string
          supplier_name?: string
          supplier_type?: Database["public"]["Enums"]["supplier_type"]
          user_id?: string
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
      account_type: "seller" | "buyer"
      sector:
        | "Education"
        | "Salon supplies"
        | "Office supplies"
        | "Cleaning supplies"
      supplier_type: "Wholesaler" | "Manufacturer"
    }
  }
}
