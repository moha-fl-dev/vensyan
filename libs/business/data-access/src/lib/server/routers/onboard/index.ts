import { TRPCError } from '@trpc/server';
import { OrganisationSchema, Torganisation } from '@vensyan/types';
import { ZodError } from 'zod';
import { organisationProcedure, router } from "../../trpc";


export const Organisation = router({
    new: organisationProcedure.input({
        parse(input) {

            try {
                OrganisationSchema.parse(input);

                return input;
            } catch (e: unknown) {

                if (e instanceof ZodError) {
                    throw new ZodError<Torganisation>(e.issues)
                }

                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                })
            }
        }
    }).mutation(async ({ input, ctx }) => {
        const { service } = ctx

        try {

            const data = await service.onboardOrganisation(input)

            return data

        } catch (e: unknown) {

            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: "This organisation already exists"
            })
        }
    }),

    edit: organisationProcedure.input({
        parse(input) { }
    }).mutation(async ({ input, ctx }) => { }),

    get: organisationProcedure.input({
        parse(input) { }
    }).query(async ({ input, ctx }) => { }),
    getAll: organisationProcedure.input({
        parse(input) { }
    }).query(async ({ ctx }) => { }),
});

