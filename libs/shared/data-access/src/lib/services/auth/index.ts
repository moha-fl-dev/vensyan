import { AuthError, User } from "@supabase/supabase-js";
import { Account_type, BaseCtxParams, SupabaseClientCtx, TsignIn, TsignUp } from "@vensyan/types";

export class AuthService implements BaseCtxParams {

    constructor(readonly client: SupabaseClientCtx, readonly account_type: Account_type) { }

    public async signIn({ email, password }: TsignIn): Promise<User | null> {

        const { data: { user }, error } = await this.client.auth.signInWithPassword({ email, password })

        if (error instanceof AuthError) throw new AuthError(error.message)

        return user
    }


    public async signUp({ email, password, hasOrganization = false }: TsignUp): Promise<User | null> {

        const { data: { user }, error } = await this.client.auth.signUp({
            email,
            password,
            options: {
                data: {
                    hasOrganization,
                    account_type: this.account_type
                }
            }
        })

        if (error instanceof AuthError) throw new AuthError(error.message)

        return user
    }

    public sayHello(): string {
        return 'hello'
    }


    public async signOut(): Promise<void> { }
    public getSession(): void { }
    public setSession(): void { }

}