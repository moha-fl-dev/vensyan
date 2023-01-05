import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';

import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '@vensyan/business/data-access';
import superjson from 'superjson';

function getBaseUrl() {
    if (typeof window !== 'undefined')
        // browser should use relative path
        return '';

    if (process.env.VERCEL_URL)
        // reference for vercel.com
        return `https://${process.env.VERCEL_URL}`;

    if (process.env.RENDER_INTERNAL_HOSTNAME)
        // reference for render.com
        return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

    // assume localhost
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
}

export const trpc = createTRPCNext<AppRouter>({
    config({ ctx }) {
        return {
            transformer: superjson,
            links: [
                httpBatchLink({
                    /**
                     * If you want to use SSR, you need to use the server's full URL
                     * @link https://trpc.io/docs/ssr
                     **/
                    url: `${getBaseUrl()}/api/trpc`,
                }),
            ],
            /**
             * @link https://tanstack.com/query/v4/docs/reference/QueryClient
             **/
            queryClientConfig: {
                defaultOptions: {
                    mutations: {
                        onError: (err) => {
                            console.error('Mutation error', err);
                        }
                    }
                }
            },
        };
    },
    /**
     * @link https://trpc.io/docs/ssr
     **/
    ssr: false,
});


/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;
/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
