import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { Box, Grid, styled, Typography, useTheme } from '@mui/material';
import { LogoIcon } from '../logo/logo';
import { Ilayout, WithComponentPropType } from '../ui-types';



export function OnboardingLayout({ children }: Ilayout) {

  const theme = useTheme();

  return (
    <ColumnContainer>
      <LeftColumn>
        <Box
          sx={{
            position: 'absolute',
            top: theme.spacing(5),
            left: theme.spacing(5),
          }}
        >
          <LogoIcon height={50} width={50} />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Grid container direction={'row'} alignItems={'center'} gap={2}>
              <Grid item>
                <CorporateFareIcon fontSize="large"
                  sx={{
                    color: 'rgba(253, 169, 45, 0.5)'
                  }}
                />
              </Grid>
              <Grid item>
                <Grid container direction={'column'} gap={.5}>
                  <Grid item>
                    <StepTitle variant="subtitle1" component="span" gutterBottom
                    >
                      Organisation details
                    </StepTitle>
                  </Grid>
                  <Grid item>
                    <StepSubtitle variant="body2" component="span" gutterBottom
                    >
                      Please fill in the details of your organisation
                    </StepSubtitle>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container direction={'row'} alignItems={'center'} gap={2} >
              <Grid item>
                <PinDropIcon fontSize="large"
                  sx={{
                    color: 'rgba(253, 169, 45, 0.5)'
                  }}
                />
              </Grid>
              <Grid item>
                <Grid container direction={'column'} gap={.5}>
                  <Grid item>
                    <StepTitle variant="subtitle1" component="span" gutterBottom>
                      Organisation address
                    </StepTitle>

                  </Grid>
                  <Grid item>
                    <StepSubtitle variant="body2" component="span" gutterBottom>
                      Please fill in the address of your organisation
                    </StepSubtitle>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box >
      </LeftColumn >
      <RightColumn>
        {children}
      </RightColumn>
    </ColumnContainer >
  );
}


const StepTitle = styled(Typography)<WithComponentPropType>(({ theme }) => ({
  fontSize: '0.88rem',
  color: theme.palette.grey[500]
}))

const StepSubtitle = styled(StepTitle)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.grey[400]
}))


const ColumnContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  overflow: 'auto'
}))

const LeftColumn = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  backgroundColor: theme.palette.grey[100],
  width: '33.33%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  height: '100%',
}))

const RightColumn = styled(Box)(({ theme }) => ({

  [theme.breakpoints.down('md')]: {
    flex: 1,
  },
  width: '66%'
}))