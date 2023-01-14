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
                    account_type: Database["public"]["Enums"]["account_type"]
                    city: string
                    country: string
                    created_at: string
                    house_number: string
                    organisation_id: string
                    organisation_name: string
                    street_name: string
                    user_id: string
                    zip_code: string
                }
                Insert: {
                    account_type?: Database["public"]["Enums"]["account_type"]
                    city: string
                    country: string
                    created_at?: string
                    house_number: string
                    organisation_id?: string
                    organisation_name: string
                    street_name: string
                    user_id?: string
                    zip_code: string
                }
                Update: {
                    account_type?: Database["public"]["Enums"]["account_type"]
                    city?: string
                    country?: string
                    created_at?: string
                    house_number?: string
                    organisation_id?: string
                    organisation_name?: string
                    street_name?: string
                    user_id?: string
                    zip_code?: string
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
            mood: "sad" | "ok" | "happy"
            sector: "Educational" | "Salon" | "Office" | "Cleaning"
        }
    }
}
