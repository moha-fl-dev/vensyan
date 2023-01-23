import { styled, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { AppRouter } from '@vensyan/business/data-access';
import { businessApi } from '@vensyan/business/utils';
import { LogoIcon, type NextPageWithLayout } from '@vensyan/shared/ui';
import { dispatchServerError } from '@vensyan/shared/utils';
import type { Torganisation } from '@vensyan/types';
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

    const [serverError, setServerError] = useState<string | null>(null);

    const { handleSubmit, formState: { errors }, control, setError } = useForm<Torganisation>({
        defaultValues: {
            organisation_name: '',
            city: '',
            country: '',
            house_number: '',
            street_name: '',
            zip_code: '',
        }
    });

    const { mutate } = businessApi.Organisation.new.useMutation({
        onSuccess: (data) => {
            router.push('/dashboard');
        },

        onError: (error) => {
            return dispatchServerError<AppRouter, Torganisation>({
                setStateAction: setServerError,
                error,
                zodSchemaError: {
                    setError
                }
            })
        }
    });

    const onSubmit = (data: Torganisation) => {

        return mutate(data);
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
                                name='organisation_name'
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
                                        // required
                                        value={field.value}
                                        onChange={field.onChange}
                                        fullWidth
                                        id="organisation_name"
                                        label="organisation name"
                                        name="organisation_name"
                                        autoFocus
                                        type={'text'}
                                        color='secondary'
                                        error={errors.organisation_name ? true : false}
                                        helperText={errors.organisation_name ? errors.organisation_name.message : null}
                                    />
                                )}

                            />
                        </FormControl>

                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }} direction={{ xs: 'column', md: 'row' }}>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <Controller
                                    name='street_name'
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Please enter street name'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            margin="normal"
                                            fullWidth
                                            required

                                            ref={field.ref}
                                            id={'street_name'}
                                            label="street name"
                                            name={'street name'}
                                            type={'text'}
                                            error={errors.street_name ? true : false}
                                            color='secondary'
                                            helperText={errors.street_name ? errors.street_name.message : null}
                                        />
                                    )}

                                />
                            </FormControl>

                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth>

                                <Controller
                                    name='zip_code'
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Please enter zip code'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="zip_code"
                                            label="Zip code"
                                            name="zip_code"
                                            type={'text'}

                                            color='secondary'
                                            error={errors.zip_code ? true : false}
                                            helperText={errors.zip_code ? errors.zip_code.message : null}
                                        />
                                    )}
                                />

                            </FormControl>

                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <Controller
                                    name='house_number'
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Please enter house number'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="house_number"
                                            label="House number"
                                            name="house_number"
                                            type={'text'}
                                            color='secondary'

                                            error={errors.house_number ? true : false}
                                            helperText={errors.house_number ? errors.house_number.message : null}
                                        />
                                    )}
                                />
                            </FormControl>

                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <Controller
                                    name='city'
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Please enter city'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="city"
                                            label="City"
                                            name="city"
                                            type={'text'}
                                            color='secondary'

                                            error={errors.city ? true : false}
                                            helperText={errors.city ? errors.city.message : null}

                                        />
                                    )}
                                />
                            </FormControl>

                        </Grid>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <Controller

                                name='country'
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Please enter country'
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="country"
                                        label="Country"
                                        name="country"
                                        type={'text'}
                                        color='secondary'
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors.country ? true : false}
                                        helperText={errors.country ? errors.country.message : null}
                                    />
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