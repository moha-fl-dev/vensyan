import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database, supabaseServerClientParams } from "@vensyan/types";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class ClientService {

    client: supabaseServerClientParams;

    constructor(client: supabaseServerClientParams) {
        this.client = client
    }

    public service() {

        const { req, res } = this.client

        return createServerSupabaseClient<Database>({
            req,
            res,
        })
    }
}