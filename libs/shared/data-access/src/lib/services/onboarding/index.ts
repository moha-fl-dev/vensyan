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

        const organisation_name = capitalize(input.organisation_name)
        const city = capitalize(input.city)

        const { data, error } = await client.from('organisations').insert({
            ...input,
            organisation_name,
            city,
            user_id: input.user_id,
            account_type,
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

        const { data, error } = await client.from('organisations').select('*').eq('user_id', input.user_id).single()

        if (error) {

            throw error
        }

        return data
    }

}

