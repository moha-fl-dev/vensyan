import { capitalize } from "@vensyan/shared/utils";
import { OrganisationWithId } from "@vensyan/types";
import { injectable } from "tsyringe";
import { SupaBaseClient } from "../../IoC/base";
import { AuthService } from "../auth";

@injectable()
export class OnboardingService {

    constructor(private supabaseClient: SupaBaseClient) { }

    async onboardOrganisation(input: OrganisationWithId): Promise<{ user_id: string }> {

        const { account_type, client } = this.supabaseClient.client()

        const supplier_name = capitalize(input.supplier_name)

        const { data, error } = await client.from('suppliers').insert({
            ...input,
            user_id: input.user_id,
            supplier_name,
        }).select('user_id').single()

        if (error) {

            throw error
        }

        const { user_id } = data as { user_id: string }

        try {
            await AuthService.updateUserMetaData({ hasOrganization: true, user_id }, this.supabaseClient)
        }
        catch (e) {
            throw e
        }


        return data;
    }

    async editOrganisation(input: any) { }

    async getOrganisationById(input: Pick<OrganisationWithId, "user_id">): Promise<OrganisationWithId> {

        const { client } = this.supabaseClient.client()

        const { data, error } = await client.from('suppliers').select('*').eq('user_id', input.user_id).single()

        if (error) {

            throw error
        }

        return data
    }

}

