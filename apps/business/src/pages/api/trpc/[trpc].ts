import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '@vensyan/business/data-access';
import { createContext } from '@vensyan/shared/data-access';

// export API handler
export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext,

    onError({ error, type, path, input, ctx, req }) { }
});