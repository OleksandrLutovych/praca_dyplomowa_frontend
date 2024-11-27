import {
    Alert,
    Box,
    Button,
    Collapse,
    Divider,
    FormControl,
    FormLabel,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { defaultValues, LoginFormData, LoginResponse, schema } from "./config.ts";
import { loginApi } from "../api";
import { useState } from "react";
import { Input } from "../../../shared/form-inputs";
import { AuthLayout } from "../../../shared/layouts";

const LoginForm = () => {

    const navigate = useNavigate();
    const [isLoadingPage, setLoadingPage] = useState<boolean>(false)
    const { handleSubmit, register, control, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const {
        mutate,
        error,
        isError,
        isSuccess,
        isPending
    } = useMutation<AxiosResponse<LoginResponse>, AxiosError, LoginFormData>({
        mutationKey: ['register'],
        mutationFn: (data) => loginApi(data),
        onSuccess: ({ data }) => {
            const { accessToken, refreshToken } = data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);


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
        <AuthLayout isLoading={isPending || isLoadingPage}>
            <>
                <Collapse in={isSuccess || isError}>
                    <Alert
                        severity={isSuccess ? 'success' : 'error'}
                        sx={{ mb: 2 }}
                    >
                        {error && error?.message}
                        {isSuccess && 'Zalogowano!.'}
                    </Alert>
                </Collapse>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Logowanie
                </Typography>
                <form onSubmit={handleSubmit(handleFormSubmit)}
                    style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 10 }}>
                    <Input name={"email"} label={"email@gmail.com"} type={"email"} defaultValue={defaultValues.email}
                        control={control} title={"Email"} />

                    <FormControl>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FormLabel htmlFor="password">Hasło</FormLabel>
                            <Link
                                variant="body2"
                                sx={{ alignSelf: 'baseline' }}
                                href={'/reset-password'}
                            >
                                Zapomniałeś hasło?
                            </Link>
                        </Box>
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
                    <Typography sx={{ textAlign: 'center' }}>
                        Nie posiadasz konta?{' '}
                        <Link
                            href="/register"
                            variant="body2"
                            sx={{ alignSelf: 'center' }}
                        >
                            Zarejestruj się!
                        </Link>
                    </Typography>
                </form>
                <Divider>Lub</Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => alert('Sign in with Google')}
                    >
                        Zaloguj się z Google
                    </Button>
                </Box>
            </>
        </AuthLayout>
    );
};

export default LoginForm;