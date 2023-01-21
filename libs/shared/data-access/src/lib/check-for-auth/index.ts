import { SupabaseClientCtx } from "@vensyan/types";

type Params = {
    client: SupabaseClientCtx;
    destination: string;
}

export async function redirectIfAuthed({ client, destination }: Params) {

    const { data: { session } } = await client.auth.getSession()

    if (session) {

        const { user } = session

        const { error } = await client.auth.getUser(session.access_token)

        if (error) {
            await client.auth.signOut()
            return {
                props: {}
            }
        }

        return {
            redirect: {
                destination: destination,
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}