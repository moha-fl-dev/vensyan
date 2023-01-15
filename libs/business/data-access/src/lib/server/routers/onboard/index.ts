import { OrganisationSchema, TaddOrganisation } from '@vensyan/types';
import { ZodError } from 'zod';
import { organisationProcedure, router } from "../../trpc";


export const Organisation = router({
    new: organisationProcedure.input({
        parse(input) {

            try {
                OrganisationSchema.parse(input);

                return input;
            } catch (e) {
                if (e instanceof ZodError) {
                    throw new ZodError<TaddOrganisation>(e.issues)
                }
            }
        }
    }).mutation(async ({ input, ctx }) => {
        const { service } = ctx

        const data = await service.onboardOrganisation(input)
        console.log(data)
        return
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

