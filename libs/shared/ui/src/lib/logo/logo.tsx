import { Typography } from '@mui/material';
import Image from 'next/image';
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


type ILogoIconProps = {
  width?: number;
  height?: number;
}

export function LogoIcon({ width = 100, height = 100 }: ILogoIconProps): ReactElement {
  return (
    <Link href={'/'} >
      <Image src='/logo_icon.png' alt='logo' width={width} height={height} blurDataURL={'/logo_icon.png'} />
    </Link >
  );
};