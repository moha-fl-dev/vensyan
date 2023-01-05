import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@vensyan/types";
import { NextApiRequest, NextApiResponse } from "next/types";

export class ApiClient {
  constructor(private req: NextApiRequest, private res: NextApiResponse<any>) { }

  public get client() {

    const { res, req } = this;

    return createServerSupabaseClient<Database>({
      req,
      res,
    })

  }
}