import CampaignIcon from '@mui/icons-material/Campaign';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import LinkIcon from '@mui/icons-material/Link';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MoneyIcon from '@mui/icons-material/Money';
import SortIcon from '@mui/icons-material/Sort';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Grid, Icon, styled } from '@mui/material';
import { LogoIcon } from '../logo/logo';
import { OrganisationCard } from '../organisation-card/organisation-card';
import { SideNav } from '../side-nav/side-nav';
import { SideNavListItemProps } from '../ui-types';


export function DashboardNav() {

  return (
    <SideNaVWrapper
      className='no-scroll'
    >
      <Grid container direction={'column'}>
        <Grid item xs>
          <LogoIcon width={50} height={50} />
        </Grid>
        <Grid item marginTop={2}>
          <OrganisationCard />
        </Grid>
        <Grid item xs marginTop={2}>
          <SideNav groupTitle='General' list={sideNavListItemsGeneral} />
        </Grid>
        <Grid item xs marginTop={2}>
          <SideNav groupTitle='Management' list={sideNavListItemsmanagement} />
        </Grid>
        <Grid item xs marginTop={2}>
          <SideNav groupTitle='CRM' list={sideNavListItemsCrm} />
        </Grid>
      </Grid>
    </SideNaVWrapper>
  );
}

export default DashboardNav;

const GreyStyledIcon = styled(Icon)(({ theme }) => ({
  color: theme.palette.text.secondary
}))

const sideNavListItemsGeneral: SideNavListItemProps[] = [
  {
    icon: <GreyStyledIcon><DashboardIcon /></GreyStyledIcon>,
    text: 'Home',
    href: '/dashboard',
  },
  {
    icon: <GreyStyledIcon><LoyaltyIcon /></GreyStyledIcon>,
    text: 'Sales',
    href: '/onboarding',
  },
  {
    icon: <GreyStyledIcon><CampaignIcon /></GreyStyledIcon>,
    text: 'Campaigns',
    href: '/dashboard/campaigns',
  },
  {
    icon: <GreyStyledIcon><MoneyIcon /></GreyStyledIcon>,
    text: 'Finance',
    href: '/dashboard/finance',

  }
]

const sideNavListItemsmanagement: SideNavListItemProps[] = [
  {
    icon: <LinkIcon />,
    text: 'Connections',
    href: '/dashboard/connections',
  },

  {
    icon: <GreyStyledIcon><InventoryIcon /></GreyStyledIcon>,
    text: 'Inventory',
    href: '/dashboard/inventory',
  },

  {
    icon: <GreyStyledIcon><ViewListIcon /></GreyStyledIcon>,
    text: 'Orders',
    href: '/dashboard/orders',
  },
  {
    icon: <GreyStyledIcon><SortIcon /></GreyStyledIcon>,
    text: 'Invoice',
    href: '/dashboard/invoces',
  }
]

const sideNavListItemsCrm: SideNavListItemProps[] = [
  {
    icon: <GreyStyledIcon><ManageAccountsIcon /></GreyStyledIcon>,
    text: 'Clients',
    href: '/dashboard/clients',
  }
]

const SideNaVWrapper = styled('div')(({ theme }) => ({
  width: '280px',
  flexShrink: 0,
  borderRight: '1px dashed #e0e0e0',
  padding: theme.spacing(2),
  overflowY: 'auto',
}));

