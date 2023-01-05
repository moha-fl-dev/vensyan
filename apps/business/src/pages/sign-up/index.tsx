import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Alert, Box, Button, FormControl, Grid, TextField } from '@mui/material';
import { AppRouter } from '@vensyan/business/data-access';
import { redirectIfAuthed } from '@vensyan/shared/data-access';
import { AuthLayout, AuthOptionsText, Link, NextPageWithLayout } from '@vensyan/shared/ui';
import { isTrpcClientError, supabaseServerClientProps } from '@vensyan/shared/utils';
import { TsignIn, TsignUp } from '@vensyan/types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import { ReactElement, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ZodIssue } from 'zod';
import { trpc } from '../../utils/trpc';


const SignIn: NextPageWithLayout = (): ReactElement => {
    const router = useRouter();

    const [invalidSignupCredentials, setinvalidSignupCredentials] = useState<boolean>(false);
    const [dberrorMessages, setDberrorMessages] = useState<string>('');

    const { register, handleSubmit, control, formState: { errors }, setError } = useForm<TsignUp>(
        {
            defaultValues: {
                email: '',
                password: '',
                ConfirmPassword: ''
            },
        }
    );

    const { mutate, isLoading } = trpc.auth.signUp.useMutation({

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

            return setinvalidSignupCredentials(() => true)

        },
    });

    const onSubmit: SubmitHandler<TsignIn> = (data) => {
        setinvalidSignupCredentials(() => false)
        mutate(data)
    }

    return (
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction={'column'} gap={1}>

                {
                    invalidSignupCredentials &&
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
                    <FormControl fullWidth>
                        <Controller
                            name='ConfirmPassword'
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
                                    id="ConfirmPassword"
                                    label="confirm password"
                                    name="ConfirmPassword"
                                    type={'password'}
                                    color='primary'
                                    error={errors.ConfirmPassword ? true : false}
                                    helperText={errors.ConfirmPassword ? errors.ConfirmPassword.message : null}
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

                <Grid container direction={'row'} gap={2} alignContent={'center'} justifyContent={'flex-end'}
                    sx={{
                        mt: 2,
                    }}
                >
                    <Grid item>
                        <Link href="/sign-in">
                            <AuthOptionsText variant='body2' component="p" >
                                Already an account? Sign in
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
        <AuthLayout title='Sign up'>
            <Head>
                <title>Sign up</title>
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