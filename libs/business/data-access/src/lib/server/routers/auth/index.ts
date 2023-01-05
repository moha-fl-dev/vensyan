import { AuthError } from '@supabase/supabase-js';
import { TRPCError } from '@trpc/server';
import { SignInSchema, SignUpSchema, TsignUp } from '@vensyan/types';
import { ZodError } from 'zod';
import { authProcedure, router } from '../../trpc';

export const auth = router({

    signIn: authProcedure.input({

        parse(input) {

            try {
                SignInSchema.parse(input);

                return input;
            } catch (e) {
                if (e instanceof ZodError) {
                    throw new ZodError<TsignUp>(e.issues)
                }
            }
        },

    }).mutation(async ({ input, ctx }) => {

        const { authService } = ctx;

        const { email, password } = input;

        try {

            await authService.signIn({ email, password });

            return true

        } catch (error) {

            if (error instanceof AuthError) {
                const { message, name, stack } = error;

                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: message
                })
            }

            throw Error('Something went wrong')
        }
    }),

    signUp: authProcedure.input({
        parse(input) {
            try {
                SignUpSchema.parse(input);

                return input;
            } catch (e) {
                if (e instanceof ZodError) {
                    throw new ZodError<TsignUp>(e.issues)
                }
            }
        },
    }).mutation(async ({ input, ctx }) => {
        const { authService } = ctx;

        const { email, password } = input;

        try {

            await authService.signUp({ email, password });

            return true

        } catch (error) {

            if (error instanceof AuthError) {
                const { message } = error;

                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: message
                })
            }

            throw Error('Something went wrong')
        }
    })
})
