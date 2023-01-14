import { Box, Container, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NextPageWithLayout, OnboardingContext, OnboardingContextProvider, OnboardingLayout } from '@vensyan/shared/ui';
import { TaddOrganisation } from '@vensyan/types';
import Head from 'next/head';
import { ReactElement, useContext } from 'react';
import { useForm } from 'react-hook-form';


const Onboard: NextPageWithLayout = (): ReactElement => {

    const theme = useTheme();

    // use the onbaordingContext
    const { org, currentStep, handleNext, handlePrev } = useContext(OnboardingContext);

    const { handleSubmit, formState: { errors }, control } = useForm<TaddOrganisation>({
        defaultValues: {
            ...org
        }
    });

    const onSubmit = (data: TaddOrganisation) => {
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
            }}
        >
            <Head>
                <title>Onboard</title>
            </Head>

            <StyledContainerWithShadowd>
                <h1>Hello</h1>
            </StyledContainerWithShadowd>

        </Container>
    )

};


const StyledContainerWithShadowd = styled(Box)(({ theme }) => ({
    backgroundColor: "background.paper",
    boxShadow: '0px 7px 46px  rgb(65 65 65 / 10%)',
    height: '50%',
    width: '100%',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,

}))

Onboard.getLayout = function (page: ReactElement): ReactElement {
    return (
        <OnboardingContextProvider>
            <OnboardingLayout>
                <Head>
                    <title></title>
                </Head>
                {page}
            </OnboardingLayout>
        </OnboardingContextProvider>
    );
};


export default Onboard;



{/* <Box component={'form'} noValidate
onSubmit={handleSubmit(onSubmit)}
>
<Head>
    <title>Onboard</title>
</Head>

<Grid container direction={'column'} gap={1}>
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
            variant="contained"
            sx={{
                lineHeight: 2.03,
                marginTop: 2,
            }}
        >
            Add Organisation
        </Button>
    </Grid>
</Grid>
</Box> */}