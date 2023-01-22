import { DashboardNav, LayoutPropsWithTitle, MainContentWrapper, Wrapper } from "@vensyan/shared/ui";
import Head from "next/head";
import { OrganisationContextProvider } from "../providers/ogranisation-provider";

export function DashboardLayout({ children, title }: LayoutPropsWithTitle) {
    return (
        <OrganisationContextProvider>
            <Wrapper component={'main'}>
                <Head>
                    <title>{title}</title>
                </Head>
                <DashboardNav />
                <MainContentWrapper maxWidth={'lg'}>
                    {
                        children
                    }
                </MainContentWrapper>
            </Wrapper>
        </OrganisationContextProvider>
    );
}