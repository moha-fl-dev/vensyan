import { AuthError, User } from "@supabase/supabase-js";
import { TsignIn, TsignUp, UpdateUserMetaData } from "@vensyan/types";
import { injectable } from "tsyringe";
import { SupaBaseClient } from "../../IoC/base";

type UserInfo =
    | { user_id: string }
    | { user: User }

type GetUserType = "user_id" | "user"

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

    static async updateUserMetaData(input: UpdateUserMetaData, supa: SupaBaseClient): Promise<boolean> {

        const { admin, account_type } = supa.admin()

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


    public async signOut(): Promise<void> { }

    public getSession(): void { }

    public async setSession(): Promise<void> {

        const { client } = this.supa.client()

        const { data: { session } } = await client.auth.refreshSession()
    }

    public async getCurrentUser(input: GetUserType): Promise<User | string | null> {
        const { client } = this.supa.client()

        const { data: { user } } = await client.auth.getUser()

        if (input === 'user_id') return user?.id || null

        return user
    }
}