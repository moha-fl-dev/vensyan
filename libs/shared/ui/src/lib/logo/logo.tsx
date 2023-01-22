import { Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import { ILogoProps } from '../ui-types';


const Image = dynamic(() => import('next/image'), { ssr: false });

const Link = dynamic(() => import('../next-link-mui-style/next-link-mui-style').then((mod) => mod.Link), { ssr: false });

type ILogoIconProps = {
  width?: number;
  height?: number;
}

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




export function LogoIcon({ width = 100, height = 100 }: ILogoIconProps): ReactElement {
  return (
    <Link href={'/'} >
      <Image src='/logo_icon.png' alt='logo' width={width} height={height} blurDataURL={'/logo_icon.png'} />
    </Link >
  );
};