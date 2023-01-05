import { z } from 'zod';
import { procedure, router } from '../trpc';
import { auth } from './auth';


const input = z.object({
    text: z.string(),
})

export const appRouter = router({
    hello: procedure
        .input(
            input
        )
        .query(({ input, ctx }) => {
            const randomNumber = Math.floor(Math.random() * 1000)

            return {
                greeting: `hello ${input.text} ${randomNumber}`,
            };
        }),

    auth
});


// export type definition of API
export type AppRouter = typeof appRouter;