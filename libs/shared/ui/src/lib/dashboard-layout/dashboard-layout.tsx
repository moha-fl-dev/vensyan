import { Container } from '@mui/material';
import { Box, styled } from '@mui/system';
import Head from 'next/head';
import DashboardNav from '../dashboard-nav/dashboard-nav';
import { LayoutPropsWithTitle, WithComponentPropType } from '../ui-types';


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



const Wrapper = styled(Box)<WithComponentPropType>({
  height: '100%',
  display: 'flex',
  minHeight: '100%',
})



const MainContentWrapper = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  [theme.breakpoints.up('xs')]: {
    padding: theme.spacing(2),
  }
}));
