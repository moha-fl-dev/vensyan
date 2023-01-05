import { type Session } from '@supabase/supabase-js';
import { inferAsyncReturnType } from '@trpc/server';
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { supaBaseClient } from '@vensyan/shared/utils';

interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
    session: Session | null;
}

export async function createContextInner(opts?: CreateInnerContextOptions) {

    return {
        session: opts?.session,
    }
};

export async function createContext(opts: CreateNextContextOptions) {

    const { req, res, } = opts;

    const client = supaBaseClient({ req, res });

    const {
        data: { session },
        error
    } = await client.auth.getSession()

    if (error) {
        throw new Error(`Session error: ${error.message}`)
    }


    const contextInner = await createContextInner({ session });

    return {
        ...contextInner,
        req: opts.req,
        res: opts.res,
        client
    }
};


export type Context = inferAsyncReturnType<typeof createContext>;