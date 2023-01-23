import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import type { AppRouter } from '@vensyan/business/data-access';
import { businessApi } from '@vensyan/business/utils';
import type { NextPageWithLayout } from '@vensyan/shared/ui';
import { dispatchServerError } from '@vensyan/shared/utils';
import type { SignUpWithConfirmPassword } from '@vensyan/types';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import { ReactElement, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';


const MoreHorizIcon = dynamic(() => import('@mui/icons-material/MoreHoriz'), { ssr: false });

const Alert = dynamic(() => import('@mui/material/Alert'), { ssr: false });

const Link = dynamic(() => import('@vensyan/shared/ui').then((mod) => mod.Link), { ssr: false });

const AuthOptionsText = dynamic(() => import('@vensyan/shared/ui').then((mod) => mod.AuthOptionsText), { ssr: false });

const SignIn: NextPageWithLayout = (): ReactElement => {

    const router = useRouter();

    const [serverError, setServerError] = useState<string | null>(null);

    const { register, handleSubmit, control, formState: { errors }, setError } = useForm<SignUpWithConfirmPassword>(
        {
            defaultValues: {
                email: '',
                password: '',
                ConfirmPassword: ''
            },
        }
    );

    const { mutate, isLoading } = businessApi.auth.signUp.useMutation({

        onSuccess: () => {
            router.push('/onboarding');
        },

        onError(error) {



            return dispatchServerError<AppRouter, SignUpWithConfirmPassword>({
                setStateAction: setServerError,
                error,
                zodSchemaError: {
                    setError
                }
            })

        },
    });

    const onSubmit: SubmitHandler<SignUpWithConfirmPassword> = (data) => {
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

    const AuthLayout = dynamic(() => import('@vensyan/shared/ui').then((mod) => mod.AuthLayout), { ssr: false });

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

    const redirectIfAuthed = await import('@vensyan/shared/data-access').then((mod) => mod.redirectIfAuthed);

    const supabaseServerClientProps = await import('@vensyan/shared/utils').then((mod) => mod.supabaseServerClientProps);

    const client = supabaseServerClientProps(ctx)

    return await redirectIfAuthed({
        client,
        destination: '/dashboard',
    })
}