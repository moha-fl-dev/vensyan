import { Typography } from '@mui/material';
import { ReactElement } from 'react';
import { Link } from '../next-link-mui-style/next-link-mui-style';
import { ILogoProps } from '../ui-types';

export function Logo({ variant, fontWeight }: ILogoProps): ReactElement {

  return (
    <Link href={'/'} >
      <Typography variant={variant ?? 'h3'} component='span' gutterBottom
        textTransform={'uppercase'}
        sx={{
          fontWeight: fontWeight ?? 800,
        }}
      >
        Vensyan
      </Typography>
    </Link >
  );
};