import { Torganisation, UpdateUserMetaData } from "@vensyan/types";
import { injectable } from "tsyringe";
import { SupaBaseClient } from "../../IoC/base";

@injectable()
export class OnboardingService {

    constructor(private supabaseClient: SupaBaseClient) { }


    async onboardOrganisation(input: Torganisation) {

        const { account_type, client } = this.supabaseClient.client()

        const { data, error } = await client.from('organisations').insert({
            ...input,
            user_id: '38bebdea-8b6a-45aa-a79d-14de413c838a',
            account_type,
        }).select('user_id').single()



        if (error) {

            throw error
        }

        const { user_id } = data as { user_id: string }

        try {
            await this.updateUserMetaData({ hasOrganization: true, user_id })
        }
        catch (e) {
            throw e
        }
        return data;
    }

    async editOrganisation(input: any) { }

    async getOrganisation(input: Torganisation) { }

    async updateUserMetaData(input: UpdateUserMetaData) {

        const { admin, account_type } = this.supabaseClient.admin()
        const { hasOrganization, user_id: id } = input


        const { data, error } = await admin.updateUserById(id, {
            user_metadata: {
                hasOrganization,
                account_type
            }
        })

        if (error) {

            console.log(error)

            throw error
        }

        return true
    }
}

