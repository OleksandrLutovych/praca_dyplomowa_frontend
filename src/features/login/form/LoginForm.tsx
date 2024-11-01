import {SignInContainer} from '../../../shared/ui/layout';
import {Card} from '../../../shared/ui/components';
import {
    Alert,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Collapse,
    Divider,
    FormControl,
    FormLabel,
    Link,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {AxiosError, AxiosResponse} from "axios";
import {defaultValues, LoginFormData, LoginResponse, schema} from "./config.ts";
import {loginApi} from "../api";
import {useState} from "react";

const LoginForm = () => {

    const navigate = useNavigate();
    const [isLoadingPage, setLoadingPage] = useState<boolean>(false)
    const {handleSubmit, register, formState: {errors}} = useForm<LoginFormData>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const {
        mutate,
        error,
        isError,
        isSuccess,
    } = useMutation<AxiosResponse<LoginResponse>, AxiosError, LoginFormData>({
        mutationKey: ['register'],
        mutationFn: (data) => loginApi(data),
        onSuccess: ({data}) => {
            const {access_token} = data;
            localStorage.setItem("accessToken", access_token)
            setTimeout(() => {
                setLoadingPage(true)
            }, 1000)

            setTimeout(() => {
                navigate('/dashboard')
                setLoadingPage(false)
            }, 3000)
        }
    });

    const handleFormSubmit = (data: LoginFormData) => {
        console.log(data)
        mutate(data);
    };

    return (
        <SignInContainer direction="column" justifyContent="space-between">

            <Card variant="outlined">
                <Collapse in={isSuccess || isError}>
                    <Alert
                        severity={isSuccess ? 'success' : 'error'}
                        sx={{mb: 2}}
                    >
                        {error && error?.message}
                        {isSuccess && 'Konto zostało utworzone. Sprawdź swoją skrzynkę mailową, aby aktywować konto.'}
                    </Alert>
                </Collapse>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                >
                    Logowanie
                </Typography>
                <form onSubmit={handleSubmit(handleFormSubmit)}
                      style={{display: 'flex', flexDirection: 'column', width: '100%', gap: 10}}>
                    <FormControl>
                        <FormLabel htmlFor="email" sx={{textAlign: 'start'}}>Email</FormLabel>
                        <TextField
                            label="email@gmail.com"
                            type="text"
                            fullWidth
                            margin="normal"
                            defaultValue={defaultValues.email}
                            {...register('email')}
                            error={!!errors.email}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="email" sx={{textAlign: 'start'}}>Hasło</FormLabel>
                        <TextField
                            label="********"
                            type="password"
                            fullWidth
                            margin="normal"
                            defaultValue={defaultValues.password}
                            {...register('password')}
                            error={!!errors.password}
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Zaloguj się
                    </Button>
                    <Typography sx={{textAlign: 'center'}}>
                        Nie posiadasz konta?{' '}
                        <span>
                <Link
                    href="/register"
                    variant="body2"
                    sx={{alignSelf: 'center'}}
                >
                  Zarejestruj się!
                </Link>
              </span>
                    </Typography>
                </form>
                <Divider>Lub</Divider>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => alert('Sign in with Google')}
                    >
                        Zaloguj się z Google
                    </Button>
                </Box>
            </Card>
            <Snackbar
                open={isSuccess}
                autoHideDuration={3000}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
            >
                <Alert severity={'success'} variant="filled">
                    {isSuccess && (
                        <Typography>
                            Zalogowano się pomyślnie
                        </Typography>
                    )
                    }
                    {
                        isError && (<Typography>
                            {error?.message}
                        </Typography>)
                    }
                </Alert>
            </Snackbar>
            <Backdrop
                sx={(theme) => ({color: '#fff', zIndex: theme.zIndex.drawer + 1})}
                open={isLoadingPage}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </SignInContainer>
    );
};

export default LoginForm;