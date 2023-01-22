import { Container } from '@mui/material';
import { Box, styled } from '@mui/system';
import { DashboardNav, LayoutPropsWithTitle } from "@vensyan/shared/ui";
import Head from "next/head";
import { WithComponentPropType } from '../ui-types';

export function DashboardLayout({ children, title }: LayoutPropsWithTitle) {
  return (
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
  );
}

export const Wrapper = styled(Box)<WithComponentPropType>({
  height: '100%',
  display: 'flex',
  minHeight: '100%',
})

export const MainContentWrapper = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  [theme.breakpoints.up('xs')]: {
    padding: theme.spacing(2),
  }
}));
