import { inferAsyncReturnType } from '@trpc/server';
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { Account_type, supabaseServerClientParams } from '@vensyan/types';
import 'reflect-metadata';
import { SupaBaseClient } from '../IoC/base';
import { container } from '../IoC/container';

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
    const contextInner = await createContextInner({ account_type })

    const dependecyValues: supabaseServerClientParams = {
        req,
        res,
        account_type
    }

    const supa = container.register(SupaBaseClient, {
        useValue: new SupaBaseClient(dependecyValues)
    }).resolve<SupaBaseClient>(SupaBaseClient)

    const { client } = supa.client()

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
        }
    }

    return {
        ...contextInner,
        req: opts.req,
        res: opts.res,
        session,
    }
};


export type Context = inferAsyncReturnType<typeof createContext>;