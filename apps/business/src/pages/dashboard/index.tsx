import Typography from '@mui/material/Typography';
import { type NextPageWithLayout } from '@vensyan/shared/ui';
import { type ReactElement } from 'react';

import dynamic from 'next/dynamic';

const DashBoard: NextPageWithLayout = (): ReactElement => {
    return (
        <Typography variant="h1">Dashboard</Typography>
    );
};


DashBoard.getLayout = function (page: ReactElement): ReactElement {

    const LayoutWithOrganisationContext = dynamic(() => import('@vensyan/business/ui').then((mod) => mod.LayoutWithOrganisationContext), { ssr: false });

    return (
        <LayoutWithOrganisationContext title='Dashboard'>
            {page}
        </LayoutWithOrganisationContext>
    );
};


export default DashBoard;