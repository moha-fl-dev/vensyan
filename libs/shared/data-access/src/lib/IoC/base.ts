import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { Database, supabaseServerClientParams } from '@vensyan/types';
import { injectable } from 'tsyringe';

@injectable()
export class SupaBaseClient {


    constructor(
        private readonly _client: supabaseServerClientParams,

    ) { }

    client() {

        const { req, res, account_type } = this._client

        return {
            client: createServerSupabaseClient<Database>({
                req,
                res,
            }),

            account_type
        }
    }

    admin() {

        const client = createClient<Database>(
            process.env.NEXT_PUBLIC_SUPABASE_URL as string,
            process.env.NX_SUPABASE_SERVICE_KEY as string,

            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false,
                }
            }
        )

        const { account_type } = this._client

        return {
            admin: client.auth.admin,
            account_type
        }
    }

}