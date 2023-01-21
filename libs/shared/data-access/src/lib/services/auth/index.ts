import { AuthError, User } from "@supabase/supabase-js";
import { TsignIn, TsignUp, UserMetaData } from "@vensyan/types";
import { injectable } from "tsyringe";
import { SupaBaseClient } from "../../IoC/base";



@injectable()
export class AuthService {

    constructor(private supa: SupaBaseClient) { }

    public async signIn({ email, password }: TsignIn): Promise<User | null> {

        const { client } = this.supa.client()

        const { data: { user }, error } = await client.auth.signInWithPassword({ email, password })

        if (error instanceof AuthError) throw new AuthError(error.message)

        return user
    }


    public async signUp({ email, password, hasOrganization = false }: TsignUp): Promise<User | null> {

        const { client, account_type } = this.supa.client()

        const { data: { user }, error } = await client.auth.signUp({
            email,
            password,
            options: {
                data: {
                    hasOrganization,
                    account_type
                }
            }
        })

        if (error instanceof AuthError) throw new AuthError(error.message)

        return user
    }

    public async updateUserMetadata({ account_type, hasOrganization }: UserMetaData) {

    }

    public async signOut(): Promise<void> { }

    public getSession(): void { }

    public async setSession(): Promise<void> {

        const { client } = this.supa.client()

        const { data: { session } } = await client.auth.refreshSession()
    }

}