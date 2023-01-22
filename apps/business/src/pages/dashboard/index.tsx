import { Typography } from '@mui/material';
import { LayoutWithOrganisationContext } from '@vensyan/business/ui';
import { NextPageWithLayout } from '@vensyan/shared/ui';
import { ReactElement } from 'react';

const DashBoard: NextPageWithLayout = (): ReactElement => {
    return (
        <Typography variant="h1">Dashboard</Typography>
    );
};


DashBoard.getLayout = function (page: ReactElement): ReactElement {

    return (
        <LayoutWithOrganisationContext title='Dashboard'>
            {page}
        </LayoutWithOrganisationContext>
    );
};


export default DashBoard;