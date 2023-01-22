import { Box } from '@mui/material';
import type { AppRouter } from '@vensyan/business/data-access';
import { businessApi } from '@vensyan/business/utils';
import type { NextPageWithLayout } from '@vensyan/shared/ui';
import { dispatchServerError, supabaseServerClientProps } from '@vensyan/shared/utils';
import type { TsignIn } from '@vensyan/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import { useState, type ReactElement } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const Head = dynamic(() => import('next/head'), { ssr: false });

const MoreHorizIcon = dynamic(() => import('@mui/icons-material/MoreHoriz'), { ssr: false });

const Alert = dynamic(() => import('@mui/material/Alert'), { ssr: false });

const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });

const FormControl = dynamic(() => import('@mui/material/FormControl'), { ssr: false });

const AuthLayout = dynamic(() => import('@vensyan/shared/ui').then((mod) => mod.AuthLayout), { ssr: false });

const AuthOptionsText = dynamic(() => import('@vensyan/shared/ui').then((mod) => mod.AuthOptionsText), { ssr: false });

const Link = dynamic(() => import('@vensyan/shared/ui').then((mod) => mod.Link), { ssr: false });


const SignIn: NextPageWithLayout = (): ReactElement => {
    const router = useRouter();

    const [serverError, setServerError] = useState<string | null>(null);


    const { register, handleSubmit, control, formState: { errors }, setError } = useForm<TsignIn>(
        {
            defaultValues: {
                email: '',
                password: ''
            },
        }
    );

    const { mutate, isLoading } = businessApi.auth.signIn.useMutation({

        onSuccess: () => {
            router.push('/dashboard');
        },

        onError(error) {

            return dispatchServerError<AppRouter, TsignIn>({
                setStateAction: setServerError,
                error,
                zodSchemaError: {
                    setError
                }
            })

        },
    });

    const onSubmit: SubmitHandler<TsignIn> = (data) => {




        mutate(data)
    }

    return (
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction={'column'} gap={1}>

                {
                    serverError &&
                    <Grid item xs>
                        <Alert severity="error"
                            sx={{
                                alignItems: 'center',
                            }}
                        >
                            {serverError}

                        </Alert>
                    </Grid>
                }

                <Grid item xs>
                    <FormControl fullWidth>
                        <Controller
                            name='email'
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Please enter a valid email address'
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
                                    id="email"
                                    label="email"
                                    name="email"
                                    autoFocus
                                    type={'text'}
                                    color='primary'
                                    error={errors.email ? true : false}
                                    helperText={errors.email ? errors.email.message : null}
                                />
                            )}

                        />
                    </FormControl>
                </Grid>

                <Grid item xs>
                    <FormControl fullWidth>
                        <Controller
                            name='password'
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Please enter a password'
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
                                    id="password"
                                    label="password"
                                    name="password"
                                    type={'password'}
                                    color='primary'
                                    error={errors.password ? true : false}
                                    helperText={errors.password ? errors.password.message : null}
                                />
                            )}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size='large'
                        disabled={isLoading}
                        sx={{
                            lineHeight: 2.03,
                        }}
                    >
                        {
                            isLoading ? <MoreHorizIcon fontSize='large' /> : 'Sign In'
                        }
                    </Button>
                </Grid>

                <Grid container direction={'row'} gap={2} alignContent={'center'} justifyContent={'space-between'}
                    sx={{
                        mt: 2,
                    }}
                >
                    <Grid item >
                        <Link href="/">
                            <AuthOptionsText variant='body2' component="p">
                                Forgot password?
                            </AuthOptionsText>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/sign-up">
                            <AuthOptionsText variant='body2' component="p" >
                                Don't have an account? Sign Up
                            </AuthOptionsText>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
};




SignIn.getLayout = function (page: ReactElement): ReactElement {
    return (
        <AuthLayout title='Sign in'>
            <Head>
                <title>Sign in</title>
            </Head>
            {page}
        </AuthLayout>
    );
};


export default SignIn;


export async function getServerSideProps(ctx: GetServerSidePropsContext) {

    const redirectIfAuthed = await import('@vensyan/shared/data-access').then((mod) => mod.redirectIfAuthed);

    const client = supabaseServerClientProps(ctx)

    return await redirectIfAuthed({
        client,
        destination: '/dashboard',
    })
}