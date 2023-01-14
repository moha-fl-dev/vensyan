import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { Box, Grid, styled, Typography, useTheme } from '@mui/material';
import { TaddOrganisation } from '@vensyan/types';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { LogoIcon } from '../logo/logo';
import { Ilayout, WithComponentPropType } from '../ui-types';

export function OnboardingContextProvider({ children }: Ilayout) {
  const router = useRouter();
  const theme = useTheme();

  const [step, setStep] = useState<Steps>("orgAndLogo");


  const [org, setOrg] = useState<TaddOrganisation>({
    organisation_name: '',
    house_number: '',
    street_name: '',
    zip_code: '',
    city: '',
    country: '',
  })

  const handleNext = () => {
    setStep(step => "address");
  }

  const handlePrev = () => {
    setStep(step => "orgAndLogo");
  }

  return (
    <OnboardingContext.Provider value={{ currentStep: step, handleNext, handlePrev, org }}>
      {children}
    </OnboardingContext.Provider>
  )
}


export function OnboardingLayout({ children }: Ilayout) {

  const theme = useTheme();
  const { currentStep: step } = useContext(OnboardingContext);

  useEffect(() => {
    console.log('step: ', step);
  })

  return (
    <Container>
      <LeftColumn>

        <Box
          sx={{
          }}
        >
          <LogoIcon height={50} width={50} />

          <Box
            sx={{
              height: '70vh',
            }}
          >
            <Container maxWidth={'sm'}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Box>
                <Grid container direction={'row'} alignItems={'center'} gap={2}>
                  <Grid item>
                    <CorporateFareIcon fontSize="large"
                      sx={{
                        color: step === 'orgAndLogo' ? 'rgb(32, 101, 209)' : theme.palette.grey[300]
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container direction={'column'} gap={.5}>
                      <Grid item>
                        <StepTitle variant="subtitle1" component="span" gutterBottom
                          sx={{
                            color: step === 'orgAndLogo' ? 'rgb(32, 101, 209)' : theme.palette.grey[400]
                          }}
                        >
                          Organisation details
                        </StepTitle>
                      </Grid>
                      <Grid item>
                        <StepSubtitle variant="body2" component="span" gutterBottom
                          sx={{
                            color: step === 'orgAndLogo' ? 'rgb(32, 101, 209)' : theme.palette.grey[400]
                          }}
                        >
                          Please fill in the details of your organisation
                        </StepSubtitle>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <Grid container direction={'row'} alignItems={'center'} gap={2} >
                  <Grid item>
                    <PinDropIcon fontSize="large"
                      sx={{
                        color: step === 'address' ? 'rgb(32, 101, 209)' : theme.palette.grey[400]
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container direction={'column'} gap={.5}>
                      <Grid item>
                        <StepTitle variant="subtitle1" component="span" gutterBottom sx={{
                          color: step === 'address' ? 'rgb(32, 101, 209)' : theme.palette.grey[400]
                        }}>
                          Organisation address
                        </StepTitle>

                      </Grid>
                      <Grid item>
                        <StepSubtitle variant="body2" component="span" gutterBottom sx={{
                          color: step === 'address' ? 'rgb(32, 101, 209)' : theme.palette.grey[400]
                        }}>
                          Please fill in the address of your organisation
                        </StepSubtitle>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Container>

          </Box>
        </Box>
      </LeftColumn>
      <RightColumn>
        {children}
      </RightColumn>
    </Container>
  );
}


const StepTitle = styled(Typography)<WithComponentPropType>(({ theme }) => ({
  fontSize: '0.88rem',
}))

const StepSubtitle = styled(StepTitle)(({ theme }) => ({
  fontSize: '0.75rem',
}))


const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',

}))

const LeftColumn = styled(Box)(({ theme }) => ({

  [theme.breakpoints.down('md')]: {
    display: 'none',
  },

  flex: 1,
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(5, 5),
  height: '100%',
}))

const RightColumn = styled(Box)(({ theme }) => ({

  [theme.breakpoints.down('md')]: {
    flex: 1,
  },

  flex: 2,
  padding: theme.spacing(5, 5),
  height: '100%',
}))


export type Steps = "orgAndLogo" | "address"

type TonboardinContext = {
  org: TaddOrganisation
  currentStep: Steps
  handleNext: () => void
  handlePrev: () => void
}

export const OnboardingContext = createContext<TonboardinContext>({
  currentStep: "orgAndLogo",
  org: {
    organisation_name: '',
    house_number: '',
    street_name: '',
    zip_code: '',
    city: '',
    country: '',
  },
  handleNext: () => { },
  handlePrev: () => { }
})
