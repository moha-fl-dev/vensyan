import { inferAsyncReturnType } from '@trpc/server';
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { supaBaseClient } from '@vensyan/shared/utils';
import { Account_type } from '@vensyan/types';


interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
    account_type: Account_type;
}

export async function createContextInner(opts: CreateInnerContextOptions) {

    return {
        account_type: opts.account_type // cannot be null. is defined at api route level

    }
};

export async function createContext(opts: CreateNextContextOptions, account_type: Account_type) {

    const { req, res, } = opts;
    const contextInner = await createContextInner({ account_type });

    const client = supaBaseClient({ req, res });

    const {
        data: { session },
        error
    } = await client.auth.getSession()

    if (error) {
        throw new Error(`Session error: ${error.message}`)
    }

    if (!session) {
        return {
            ...contextInner,
            req: opts.req,
            res: opts.res,
            client
        }
    }


    return {
        ...contextInner,
        req: opts.req,
        res: opts.res,
        client,
        session
    }
};


export type Context = inferAsyncReturnType<typeof createContext>;