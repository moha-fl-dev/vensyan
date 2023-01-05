import { Typography } from '@mui/material';
import { DashboardLayout, NextPageWithLayout } from '@vensyan/shared/ui';
import { ReactElement } from 'react';


const DashBoard: NextPageWithLayout = (): ReactElement => {
    return (
        <Typography variant="h1">Dashboard</Typography>
    );
};


DashBoard.getLayout = function (page: ReactElement): ReactElement {
    return (
        <DashboardLayout title='Dashboard'>
            {page}
        </DashboardLayout>
    );
};


export default DashBoard;