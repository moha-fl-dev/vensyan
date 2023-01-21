import { Container } from '@mui/material';
import { Box, styled } from '@mui/system';
import { WithComponentPropType } from '../ui-types';


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
