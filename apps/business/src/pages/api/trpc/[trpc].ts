import * as trpcNext from '@trpc/server/adapters/next';
import { AppRouter, appRouter } from '@vensyan/business/data-access';
import { createContext } from '@vensyan/shared/data-access';

// export API handler
export default trpcNext.createNextApiHandler<AppRouter>({
    router: appRouter,
    createContext: ({ req, res }) => createContext({ req, res }, 'seller'),

    onError({ error, type, path, input, ctx, req }) { }
});