import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { TRPCClientError } from "@trpc/client";
import { AnyRouter } from "@trpc/server";
import { Database, supabaseServerClientParams } from "@vensyan/types";
import { GetServerSidePropsContext } from "next/types";

export function supaBaseClient({ req, res }: supabaseServerClientParams) {
  return createServerSupabaseClient<Database>({
    req,
    res,
  })
}

export function supabaseServerClientProps(ctx: GetServerSidePropsContext) {
  return createServerSupabaseClient<Database>(ctx)
}



export function isTrpcClientError<TRouter extends AnyRouter>(
  cause: unknown,
): cause is TRPCClientError<TRouter> {
  return cause instanceof TRPCClientError;
}

