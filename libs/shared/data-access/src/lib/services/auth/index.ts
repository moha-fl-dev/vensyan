import { AuthError, User } from "@supabase/supabase-js";
import { SupabaseClientCtx, TsignIn } from "@vensyan/types";

export class AuthService {

    private ctx: SupabaseClientCtx

    constructor(readonly ctxInput: SupabaseClientCtx) {
        this.ctx = ctxInput
    }

    public async signIn({ email, password }: TsignIn): Promise<User | null> {

        const { data: { user }, error } = await this.ctx.auth.signInWithPassword({ email, password })

        if (error instanceof AuthError) throw new AuthError(error.message)

        return user
    }


    public async signUp({ email, password }: TsignIn): Promise<User | null> {

        const { data: { user }, error } = await this.ctx.auth.signUp({
            email,
            password,
            options: {
                data: {
                    hasOrganization: false
                }
            }
        })

        if (error instanceof AuthError) throw new AuthError(error.message)

        return user
    }

    public async signOut(): Promise<void> { }
    public getSession(): void { }
    public setSession(): void { }

}