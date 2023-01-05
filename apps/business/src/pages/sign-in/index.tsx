import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Alert, Box, Button, FormControl, Grid, TextField } from '@mui/material';
import { AppRouter } from '@vensyan/business/data-access';
import { redirectIfAuthed } from '@vensyan/shared/data-access';
import { AuthLayout, AuthOptionsText, Link, NextPageWithLayout } from '@vensyan/shared/ui';
import { isTrpcClientError, supabaseServerClientProps } from '@vensyan/shared/utils';
import { TsignIn } from '@vensyan/types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import { ReactElement, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ZodIssue } from 'zod';
import { trpc } from '../../utils/trpc';

const SignIn: NextPageWithLayout = (): ReactElement => {
    const router = useRouter();
    const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);
    const [dberrorMessages, setDberrorMessages] = useState<string>('');

    const { register, handleSubmit, control, formState: { errors }, setError } = useForm<TsignIn>(
        {
            defaultValues: {
                email: '',
                password: ''
            },
        }
    );

    const { mutate, isLoading } = trpc.auth.signIn.useMutation({

        onSuccess: () => {
            router.push('/dashboard');
        },

        onError(error) {
            if (isTrpcClientError<AppRouter>(error)) {

                const { data, message, meta, name, shape, stack } = error

                if (data?.zodError) {
                    const zodErr = data.zodError as ZodIssue[]
                    zodErr.forEach((err) => {
                        setError(err.path[0] as keyof TsignIn, {
                            type: 'manual',
                            message: err.message
                        })
                    })

                    return
                }
            }

            setDberrorMessages(() => error.message)

            return setInvalidCredentials(() => true)

        },
    });

    const onSubmit: SubmitHandler<TsignIn> = (data) => {
        setInvalidCredentials(() => false)
        mutate(data)
    }

    return (
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction={'column'} gap={1}>

                {
                    invalidCredentials &&
                    <Grid item xs>
                        <Alert severity="error"
                            sx={{
                                alignItems: 'center',
                            }}
                        >
                            {dberrorMessages}

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

    const client = supabaseServerClientProps(ctx)

    return await redirectIfAuthed({
        client,
        destination: '/dashboard',
    })
}