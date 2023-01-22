import { Backdrop, CircularProgress } from "@mui/material";
import { businessApi } from "@vensyan/business/utils";
import { Ilayout } from "@vensyan/shared/ui";
import { createContext } from "react";
import { OrganisationContextType } from "../ui-types";

export const OrgnisationContext = createContext<OrganisationContextType | undefined>(undefined);

export function OrganisationContextProvider({ children }: Ilayout) {

    const { data, isLoading } = businessApi.Organisation.get.useQuery(undefined, {
        refetchOnWindowFocus: false
    })

    if (isLoading) {

        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }
                }
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