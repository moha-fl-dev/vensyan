import { Backdrop, CircularProgress } from "@mui/material";
import { Ilayout, OrgnisationContext } from "@vensyan/shared/ui";
import { trpc } from "../utils/trpc";

export function OrganisationContextProvider({ children }: Ilayout) {

    const { data, isLoading } = trpc.Organisation.get.useQuery();

    if (isLoading) {

        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    const { city, organisation_name } = data!;

    return (
        <OrgnisationContext.Provider value={{ city, organisation_name }}>
            {children}
        </OrgnisationContext.Provider>
    );
}