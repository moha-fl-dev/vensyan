import { styled, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import type { AppRouter } from '@vensyan/business/data-access';
import { businessApi } from '@vensyan/business/utils';
import { LogoIcon, type NextPageWithLayout } from '@vensyan/shared/ui';
import { dispatchServerError } from '@vensyan/shared/utils';
import { Organisation_type, sector, Sector, supplier_type } from '@vensyan/types';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import { ReactElement, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';


const Alert = dynamic(() => import('@mui/material/Alert'), { ssr: false });

const Onboard: NextPageWithLayout = (): ReactElement => {

    const theme = useTheme();

    const router = useRouter();
    const [selectedSector, setSelectedSector] = useState<Sector>('Education');
    const [serverError, setServerError] = useState<string | null>(null);

    const { handleSubmit, formState: { errors }, control, setError } = useForm<Organisation_type>({
        defaultValues: {
            supplier_name: '',
            sector: 'Education',
            supplier_type: "Wholesaler"
        }
    });

    const { mutate } = businessApi.Organisation.new.useMutation({
        onSuccess: (data) => {
            router.push('/dashboard');
        },

        onError: (error) => {
            return dispatchServerError<AppRouter, Organisation_type>({
                setStateAction: setServerError,
                error,
                zodSchemaError: {
                    setError
                }
            })
        }
    });

    const onSubmit = (data: Organisation_type) => {

        console.log(data);

        // return mutate(data);
    }

    function handleSectorChange(event: React.MouseEvent<HTMLElement>, newSector: Sector) {
        setSelectedSector(() => newSector);
    }

    return (
        <Container maxWidth={'md'}
            component={'form'} noValidate onSubmit={handleSubmit(onSubmit)}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',

                [theme.breakpoints.down('md')]: {
                    margingTop: theme.spacing(5),
                }
            }}
        >
            <Head>
                <title>Onboard</title>
            </Head>

            <StyledContainerWithShadowd>
                <Box
                    sx={{

                        [theme.breakpoints.down('md')]: {
                            display: 'flex'
                        },
                        display: 'none',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: theme.spacing(2),
                    }}
                >

                    <LogoIcon height={30} width={30} />
                    <Typography variant={'body2'} component={'span'} gutterBottom >Register your organisation</Typography>
                </Box>

                <Grid container direction={'column'} gap={1}>
                    {
                        serverError && (
                            <Grid item xs>
                                <Alert severity="error"
                                    sx={{
                                        alignItems: 'center',
                                    }}
                                >{serverError}</Alert>
                            </Grid>
                        )
                    }
                    <Grid item xs>
                        <FormControl fullWidth>

                            <Controller
                                name='supplier_name'
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Please enter your organisation name'
                                    }
                                }}
                                render={({ field }) => (

                                    <TextField

                                        {...field}
                                        margin="normal"
                                        required
                                        value={field.value}
                                        onChange={field.onChange}
                                        fullWidth
                                        id="organisation_name"
                                        label="organisation name"
                                        name="organisation_name"
                                        autoFocus
                                        type={'text'}
                                        color='secondary'
                                        error={errors.supplier_name ? true : false}
                                        helperText={errors.supplier_name ? errors.supplier_name.message : null}
                                    />
                                )}

                            />
                        </FormControl>

                    </Grid>

                    <Grid item>
                        <FormControl fullWidth>

                            <Controller

                                name='sector'
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Please enter country'
                                    }
                                }}
                                render={({ field }) => (
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={selectedSector}
                                        exclusive
                                        onChange={handleSectorChange}
                                        aria-label="Platform"
                                    >
                                        {
                                            sector.map((sector) => (
                                                <ToggleButton value={sector} onClick={() => field.onChange(sector)} >{sector}</ToggleButton>
                                            ))

                                        }
                                    </ToggleButtonGroup>
                                )}
                            />

                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl fullWidth>

                            <Controller

                                name='supplier_type'
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Please enter country'
                                    }
                                }}
                                render={({ field }) => (

                                    <ToggleButtonGroup
                                        color="primary"
                                        value={selectedSector}
                                        exclusive
                                        onChange={handleSectorChange}
                                        aria-label="Platform"
                                    >
                                        {
                                            supplier_type.map((type) => (
                                                <ToggleButton value={type} onClick={() => field.onChange(type)} >{type}</ToggleButton>
                                            ))
                                        }
                                    </ToggleButtonGroup>
                                )}
                            />

                        </FormControl>
                    </Grid>

                    <Grid item >
                        <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="outlined"
                            sx={{
                                marginTop: 2,
                            }}
                        >
                            Add Organisation
                        </Button>
                    </Grid>
                </Grid>
            </StyledContainerWithShadowd>

        </Container>
    )

};


const StyledContainerWithShadowd = styled(Box)(({ theme }) => ({
    backgroundColor: "background.paper",
    boxShadow: '0px 7px 46px  rgb(65 65 65 / 10%)',
    width: '100%',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,

}))

Onboard.getLayout = function (page: ReactElement): ReactElement {

    const OnboardingLayout = dynamic(() => import('@vensyan/shared/ui').then((mod) => mod.OnboardingLayout), {
        ssr: false,
    });

    return (
        <OnboardingLayout>
            {page}
        </OnboardingLayout>
    );
};


export default Onboard;


export async function getServerSideProps(ctx: GetServerSidePropsContext) {

    const supabaseServerClientProps = await import('@vensyan/shared/utils').then((mod) => mod.supabaseServerClientProps)

    const client = supabaseServerClientProps(ctx)

    const {
        data: { session },
    } = await client.auth.getSession()

    if (!session) {
        return {
            redirect: {
                destination: '/sign-in',
                permanent: false,
            }
        }
    }

    const { user } = session

    if (!user) {
        return {
            redirect: {
                destination: '/sign-in',
                permanent: false,
            }
        }
    }

    if (user.user_metadata.hasOrganization === true) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            }
        }
    }


    return {
        props: {}
    }
}