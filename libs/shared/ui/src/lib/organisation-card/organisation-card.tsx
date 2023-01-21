
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import { Box, Grid, styled, Typography } from '@mui/material';
import { useContext } from 'react';
import { OrgnisationContext } from '../context/organisation-context';

export function OrganisationCard() {

  const contextValues = useContext(OrgnisationContext);

  return (
    <StyledOrganizationWrapper>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        alignContent={'center'}
        spacing={2}
      >
        <Grid item>
          <CorporateFareOutlinedIcon fontSize='medium' color='primary' />
        </Grid>
        <Grid item xs>
          <Grid container direction="column" justifyContent="flex-start" >
            <Grid item>
              <Typography variant='body2' color='grey.700' component={'span'}

                sx={{
                  fontWeight: 'bold',
                }}
              >
                {contextValues?.organisation_name}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant='body2' component={'span'}
                sx={{
                  fontWeight: 'normal',
                  fontSize: '0.6rem'
                }}
              >
                {contextValues?.city}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledOrganizationWrapper>
  )
}


const StyledOrganizationWrapper = styled(Box, { label: 'StyledOrganizationWrapper' })(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  borderRadius: '10px',
  width: '100%',
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  WebkitTransition: '250ms, background-color 400ms',
  border: `0.5px solid ${theme.palette.grey[300]}`,

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: theme.palette.grey[300],


    WebkitTransition: '250ms, background-color 400ms',
  }
}))