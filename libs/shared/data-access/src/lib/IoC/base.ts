import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
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

}