import { TRPCError } from '@trpc/server';
import { OrganisationSchema, OrganisationWithId, Organisation_type } from '@vensyan/types';
import { ZodError } from 'zod';
import { organisationProcedure, router } from "../../trpc";


export const Organisation = router({
    new: organisationProcedure.input({
        parse(input: Organisation_type) {

            try {
                OrganisationSchema.parse(input);

                return input;
            } catch (e: unknown) {

                if (e instanceof ZodError) {
                    throw new ZodError<Organisation_type>(e.issues)
                }

                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                })
            }
        }
    }).mutation(async ({ input, ctx }) => {

        const { service, authService, user_id } = ctx

        const params: OrganisationWithId = {
            ...input,
            user_id
        }

        try {

            const data = await service.onboardOrganisation(params)

            // refresh session. account for new values. such as hasOrganization = true
            await authService.setSession()

            return data

        } catch (e: unknown) {

            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: "This organisation already exists"
            })
        }
    }),

    edit: organisationProcedure.mutation(async ({ input, ctx }) => {

    }),

    get: organisationProcedure.query(async ({ input, ctx }) => {
        const { user_id, service } = ctx

        try {
            const data = await service.getOrganisationById({ user_id })

            const { organisation_name, city } = data

            return {
                organisation_name,
                city
            }

        } catch (e: unknown) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: "Organisation not found"
            })
        }
    }),
    getAll: organisationProcedure.input({
        parse(input) { }
    }).query(async ({ ctx }) => { }),
});

