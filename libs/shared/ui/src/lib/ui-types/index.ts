import { EmotionCache } from "@emotion/cache";
import { Variant } from "@mui/material/styles/createTypography";
import { TaddOrganisation } from '@vensyan/types';
import { AppProps } from "next/app";
import { NextPage } from "next/types";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type NavItemProps = {
    href: string;
    icon: React.ReactElement;
    title: string;
}

export type Ilayout = {
    children: React.ReactNode;
}

export type LayoutPropsWithTitle = Ilayout & {
    title: string;
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode
}


export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
    emotionCache?: EmotionCache
}



export type CustomizedDialogProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
    title: string;
    children: ReactNode;
}

export type DialogTitleProps = {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

export type ILogoProps = {
    variant?: Variant
    fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | "inherit" | "initial" | "unset" | undefined;
}

export type WithComponentPropType = {
    component?: React.ElementType;
    variant?: Variant
};


export type DashboardNavProps = {
    text: string;
    href: string;
    icon: React.ReactNode;
}


export type OrganisationCardProps = Pick<TaddOrganisation, "organisation_name" | "city">


export type SideNavListItemProps = {
    icon: React.ReactNode;
    text: string;
    active?: boolean;
    href: string;
}

export type SideNavListProps = {
    list: SideNavListItemProps[];
    groupTitle: string;
}


export type ItemBoxBooleanProp = {
    active: boolean;
}
