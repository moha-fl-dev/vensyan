import { initTRPC } from '@trpc/server';
import { AuthService, Context, OnboardingService } from '@vensyan/shared/data-access';
import superjson from 'superjson';
import { ZodError } from 'zod';

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.

export interface Meta {
    route: string
}

export const t = initTRPC.context<Context>().meta<Meta>().create({

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

const authMiddleware = t.middleware(async ({ ctx, next, meta }) => {

    const { client, account_type } = ctx;


    const authService = new AuthService(client, account_type);

    return next({
        ctx: {
            authService
        },
    });
});

const organisationMiddleware = t.middleware(async ({ ctx, next, }) => {

    const { client, account_type } = ctx;

    const onboardService = new OnboardingService(client, account_type);

    return next({
        ctx: {
            onboardService
        },
    });
})

// Base router and procedure helpers
export const router = t.router
export const procedure = t.procedure


export const authProcedure = t.procedure.use(authMiddleware)
export const organisationProcedure = t.procedure.use(organisationMiddleware);
