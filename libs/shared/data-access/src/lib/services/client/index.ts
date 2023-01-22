import { createClient } from "@supabase/supabase-js";
import { Database } from "@vensyan/types";
import { injectable } from "tsyringe";

@injectable()
export class ClientService {

    public anon_client() {
        const supabase = createClient<Database>(
            process.env.NX_SUPABASE_URL as string,
            process.env.NX_SUPABASE_ANON_KEY as string,
            {
                db: {
                    schema: 'public',
                },
                auth: {
                    persistSession: true,
                    storageKey: 'supabase.auth.token',
                },

            }
        )

        return supabase;
    }

    public admin_client() {
        const supabase = createClient<Database>(
            process.env.NX_SUPABASE_URL as string,
            process.env.NX_SUPABASE_ADMIN_KEY as string
        )

        return supabase.auth.admin;
    }
}