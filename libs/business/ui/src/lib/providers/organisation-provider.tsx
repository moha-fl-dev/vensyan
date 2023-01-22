import { Backdrop, CircularProgress } from "@mui/material";
import { businessApi } from "@vensyan/business/utils";
import { DashboardLayout, LayoutPropsWithTitle, OrgnisationContext } from "@vensyan/shared/ui";

export function LayoutWithOrganisationContext({ children, title }: LayoutPropsWithTitle) {

    const { data, isLoading } = businessApi.Organisation.get.useQuery(undefined, {
        refetchOnWindowFocus: false,
    });

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
            <DashboardLayout title={title}>
                {children}
            </DashboardLayout>
        </OrgnisationContext.Provider>
    );
}