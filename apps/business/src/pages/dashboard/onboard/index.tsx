import { NextPageWithLayout } from '@vensyan/shared/ui';
import Head from 'next/head';
import { ReactElement } from 'react';


const Onboard: NextPageWithLayout = (): ReactElement => {


    return (
        <h1>
            Hello world!
        </h1>
    );
};


Onboard.getLayout = function (page: ReactElement): ReactElement {
    return (
        <>
            <Head>
                <title></title>
            </Head>
            {page}
        </>
    );
};


export default Onboard;