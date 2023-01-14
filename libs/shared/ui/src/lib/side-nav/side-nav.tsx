import { Box, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { SideNavItem } from "../side-nav-item/side-nav-item";
import { SideNavListProps } from "../ui-types";

export function SideNav({ groupTitle, list }: SideNavListProps) {

  const { pathname } = useRouter()
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          padding: theme.spacing(1.5),
        }}
      >
        <Typography variant={'body1'} component={'span'} color={'text.secondary'}
          sx={{
            fontWeight: '600',
            fontSize: '14px',
          }}
        >{groupTitle}</Typography>
      </Box>
      {
        list.map((item, index) => {

          const { href, ...restProps } = item;

          return (
            <SideNavItem key={index} href={href} active={href === pathname} {...restProps} />
          )
        })
      }
    </Box>
  );
}
