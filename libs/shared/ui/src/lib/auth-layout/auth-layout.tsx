import { Container, Grid, styled, Typography, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { LayoutPropsWithTitle, WithComponentPropType } from '../ui-types';

const LogoIcon = dynamic(() => import('../logo/logo').then((mod) => mod.LogoIcon), { ssr: false });

const Box = dynamic(() => import('@mui/material').then((mod) => mod.Box), { ssr: false });



export function AuthLayout({ children, title }: LayoutPropsWithTitle): React.ReactElement {

  const theme = useTheme();

  return (
    <Container component="section" maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          pt: theme.spacing(8),
        }}
      >
        <Grid container direction={'column'} justifyContent='center'>

          <Grid container direction={'column'} justifyContent='center' alignItems={'center'} gap={2}>
            <Grid item xs>
              <LogoIcon />
            </Grid>

            <Grid item xs>
              <SubTitle component="span" variant="body2" gutterBottom >
                {title}
              </SubTitle>
            </Grid>
          </Grid>

          <Grid item>
            {children}
          </Grid>

        </Grid>
      </Box>

    </Container>
  );
};

const SubTitle = styled(Typography)<WithComponentPropType>(({ theme }) => ({
  marginTop: theme.spacing(2)
}))
