import { initTRPC } from '@trpc/server';
import { AuthService, container, Context, OnboardingService } from '@vensyan/shared/data-access';
import 'reflect-metadata';
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

    const authService = container.resolve<AuthService>(AuthService)

    return next({
        ctx: {
            authService
        },
    });
});

const organisationMiddleware = t.middleware(async ({ ctx, next, }) => {

    const service = container.resolve<OnboardingService>(OnboardingService)

    return next({
        ctx: {
            service
        },
    });
})

// Base router and procedure helpers
export const router = t.router
export const procedure = t.procedure

export const authProcedure = t.procedure.use(authMiddleware)
export const organisationProcedure = t.procedure.use(authMiddleware).use(organisationMiddleware);
