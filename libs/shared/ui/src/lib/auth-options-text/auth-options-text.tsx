import { styled, Typography } from "@mui/material";
import { WithComponentPropType } from "../ui-types";


export const AuthOptionsText = styled(Typography)<WithComponentPropType>(({ theme, component, variant }) => ({

  color: theme.palette.grey[500],

  fontSize: '0.875rem',

  '&:hover': {
    color: theme.palette.grey[900],
    transition: 'color 0.5s ease-in-out'
  }
}))
