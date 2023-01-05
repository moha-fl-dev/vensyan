import { initTRPC } from '@trpc/server';
import { AuthService, Context } from '@vensyan/shared/data-access';
import superjson from 'superjson';
import { ZodError } from 'zod';

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
export const t = initTRPC.context<Context>().create({

    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.code === 'BAD_REQUEST' &&
                        error.cause instanceof ZodError
                        ? error.cause.issues
                        : null,
            },
        };
    }
})

const authMiddleware = t.middleware(async ({ ctx, next }) => {

    const { req, res, client } = ctx;

    const authService = new AuthService(client);

    return next({
        ctx: {
            authService
        },
    });
});

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;

export const authProcedure = t.procedure.use(authMiddleware);