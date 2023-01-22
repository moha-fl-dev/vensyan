import { Backdrop, Box, Button, CircularProgress, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { businessApi } from '@vensyan/business/utils';
import { Link, NextPageWithLayout } from '@vensyan/shared/ui';
import Head from 'next/head';
import { ReactElement } from 'react';


const Home: NextPageWithLayout = (): ReactElement => {

  const { data, isLoading } = businessApi.hello.useQuery({ text: 'Vensyan' });

  if (isLoading) {
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