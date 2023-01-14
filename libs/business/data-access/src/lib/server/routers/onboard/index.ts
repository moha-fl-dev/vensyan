import { organisationProcedure, router } from "../../trpc";


export const Organisation = router({
    new: organisationProcedure.input({
        parse(input) { }
    }).mutation(async ({ input, ctx }) => { }),

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