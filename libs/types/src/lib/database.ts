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
            organisations: {
                Row: {
                    user_id: string
                    created_at: string | null
                    organisation_id: string
                    organisation_name: string
                    sector: Database["public"]["Enums"]["sector"]
                    street_name: string
                    zip_code: string
                    house_number: string
                    city: string
                    country: string
                }
                Insert: {
                    user_id?: string
                    created_at?: string | null
                    organisation_id?: string
                    organisation_name: string
                    sector?: Database["public"]["Enums"]["sector"]
                    street_name: string
                    zip_code: string
                    house_number: string
                    city: string
                    country: string
                }
                Update: {
                    user_id?: string
                    created_at?: string | null
                    organisation_id?: string
                    organisation_name?: string
                    sector?: Database["public"]["Enums"]["sector"]
                    street_name?: string
                    zip_code?: string
                    house_number?: string
                    city?: string
                    country?: string
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
            mood: "sad" | "ok" | "happy"
            sector: "Educational" | "Salon" | "Office" | "Cleaning"
        }
    }
}
