import { Box, styled, Typography } from "@mui/material";
import { Link } from "../next-link-mui-style/next-link-mui-style";
import { ItemBoxBooleanProp, type SideNavListItemProps } from "../ui-types";

export function SideNavItem({ href, icon, text, active = false }: SideNavListItemProps) {
  return (
    <Link href={href}>
      <ItemBox active={active}>
        {icon}
        <Typography variant='body1' component={'p'}>
          {text}
        </Typography>
      </ItemBox>
    </Link>
  );
}



const ItemBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<ItemBoxBooleanProp>(({ theme, active }) => ({

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  alignContent: 'center',
  width: '100%',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: '10px',
  backgroundColor: active ? 'rgba(32, 101, 209, 0.08)' : 'transparent',
  marginBottom: theme.spacing(1),
  WebkitTransition: '250ms, background-color 400ms',
  WebkitTapHighlightColor: 'transparent',

  '& p': {
    color: active ? 'rgb(32, 101, 209)' : theme.palette.text.secondary,
    lineHeight: 2.024,
    fontSize: '14px',
    fontWeight: active ? '600' : '500',
  },

  '& svg': {
    color: active ? 'rgb(32, 101, 209)' : theme.palette.text.secondary,
  },

  '&:hover': {
    backgroundColor: active ? 'rgba(32, 101, 209, 0.08)' : theme.palette.grey[200],

    '& p': {
      color: active ? 'rgb(32, 101, 209)' : theme.palette.text.primary,
    },
  },

}));