import { Account_type, BaseCtxParams, SupabaseClientCtx, TaddOrganisation } from "@vensyan/types";

export class OnboardingService implements BaseCtxParams {

    constructor(readonly client: SupabaseClientCtx, readonly account_type: Account_type) { }


    async onboardOrganisation(input: TaddOrganisation) {
    }

    async editOrganisation(input: any) { }
}

