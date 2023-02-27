import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { TRPCClientError } from "@trpc/client";
import { AnyRouter } from "@trpc/server";
import { Database, supabaseServerClientParams } from "@vensyan/types";
import { GetServerSidePropsContext } from "next/types";

export function supaBaseClient({ req, res }: supabaseServerClientParams) {
  return createServerSupabaseClient<Database>({
    req,
    res,
  },
    // {
    //   cookieOptions: {
    //     secure: process.env.NODE_ENV === 'production',
    //     domain: process.env.NODE_ENV === 'production' ? 'vensyan.com' : undefined,
    //     maxAge: 60 * 60 * 24 * 7, // 7 days
    //     path: '/',
    //     sameSite: 'strict',

    //   }
    // }
  )
}

export function supabaseServerClientProps(ctx: GetServerSidePropsContext) {
  return createServerSupabaseClient<Database>(ctx)
}



export function isTrpcClientError<TRouter extends AnyRouter>(
  cause: unknown,
): cause is TRPCClientError<TRouter> {
  return cause instanceof TRPCClientError;
}

/**
 * 
 * @param str input value
 * @returns value with first letter of each word capitalized
 */
export function capitalize(str: string): string {
  return str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
}