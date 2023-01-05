import { CacheProvider } from '@emotion/react';
import { CssBaseline, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppPropsWithLayout } from '@vensyan/shared/ui';
import Head from 'next/head';
import { ReactElement } from 'react';
import '../styles/styles.css';
import { customTheme } from '../theme';
import createEmotionCache from '../theme/emotion-cache';
import { trpc } from '../utils/trpc';


const clientSideEmotionCache = createEmotionCache();

const CustomApp = (props: AppPropsWithLayout): ReactElement => {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;


  const getLayout = Component.getLayout ?? ((page) => page)


  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <Paper component="main" sx={{ height: '100%' }}>
          {getLayout(<Component {...pageProps} />)}
        </Paper>
      </ThemeProvider>
    </CacheProvider>
  )
};

export default trpc.withTRPC(CustomApp);