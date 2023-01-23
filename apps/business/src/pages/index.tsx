import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { businessApi } from '@vensyan/business/utils';
import type { NextPageWithLayout } from '@vensyan/shared/ui';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

const Head = dynamic(() => import('next/head').then((mod) => mod.default), { ssr: false });
const Link = dynamic(() => import('@vensyan/shared/ui').then((mod) => mod.Link), { ssr: false });

const Home: NextPageWithLayout = (): ReactElement => {

  const { data, isLoading } = businessApi.hello.useQuery({ text: 'Vensyan' });

  if (isLoading) {

    const Backdrop = dynamic(() => import('@mui/material/Backdrop').then((mod) => mod.default), { ssr: false });

    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  return (
    <div >
      <Head>
        <title>Vensyan.</title>
      </Head>

      <Paper
        className='flex flex-col items-center justify-center h-screen gap-5'
      >
        <Typography variant='h3'
          className='text-teal-600'
        >
          {data && data.greeting}
        </Typography>

        <Box
          className='flex gap-5'
        >
          <Link href='/sign-in'>
            <Button variant='contained' color='primary' size='large'>
              Sign in
            </Button>
          </Link>

          <Button variant='outlined' color='primary'>
            Get started
          </Button>

          <Button variant='outlined' color='secondary'>
            Sign up
          </Button>
          <Button variant='contained' color='secondary'>
            Get started
          </Button>
        </Box>
      </Paper>
    </div >
  )
}

export default Home;