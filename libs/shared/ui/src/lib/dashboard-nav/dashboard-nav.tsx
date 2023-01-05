import DraftsIcon from '@mui/icons-material/Drafts';
import HomeIcon from '@mui/icons-material/Home';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, SxProps } from '@mui/material';


//{ href, icon, text }: DashboardNavProps
export function DashboardNav() {


  return (
    <SideNaVWrapper>
      <StyledOrganizationWrapper>
        Company
      </StyledOrganizationWrapper>
      <List component="nav" aria-label="dashboard sidebar navigation">
        <ListItemLink />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
        </ListItem>
      </List>
    </SideNaVWrapper>
  );
}

export default DashboardNav;



function ListItemLink() {
  return (
    <ListItemWithRippleColor disablePadding>
      <ListItemButton
        sx={activeStyle}
      >
        <ListItemIcon
          sx={activeStyle}
        >
          <HomeIcon
            fontSize='medium'
          />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
      </ListItemButton>
    </ListItemWithRippleColor>
  )
}

const ListItemWithRippleColor = styled(ListItem)(({ theme }) => ({
  '.MuiTouchRipple-child': {
    backgroundColor: theme.palette.primary.main,
  }
}));


const activeStyle: SxProps = {
  fontWeight: 'bold',
  color: 'primary.main'
}

const inactiveStyle: SxProps = {
  fontWeight: 'normal',
}


const SideNaVWrapper = styled('div')(({ theme }) => ({
  width: '280px',
  flexShrink: 0,
  borderRight: '2px dashed #e0e0e0',
  padding: theme.spacing(2),
  overflowY: 'auto',
}));

const StyledOrganizationWrapper = styled(Box, { label: 'StyledOrganizationWrapper' })(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  borderRadius: '5px',
  width: '100%',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  WebkitTransition: '250ms, background-color 400ms',
  height: '100px',
  border: `0.5px solid ${theme.palette.grey[300]}`,

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: theme.palette.grey[300],
    WebkitTransition: '250ms, background-color 400ms',
  }
}))