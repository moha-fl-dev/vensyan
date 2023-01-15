import { TaddOrganisation } from "@vensyan/types";
import { injectable } from "tsyringe";
import { SupaBaseClient } from "../../IoC/base";

@injectable()
export class OnboardingService {

    constructor(private supabaseClient: SupaBaseClient) { }


    async onboardOrganisation(input: TaddOrganisation) {

        return input;
    }

    async editOrganisation(input: any) { }

    async getOrganisation(input: TaddOrganisation) { }
}

