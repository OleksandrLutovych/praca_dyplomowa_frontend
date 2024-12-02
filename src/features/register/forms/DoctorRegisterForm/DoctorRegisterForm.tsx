import { Alert, Button, Collapse, FormControl, FormLabel, Link, TextField, Typography } from "@mui/material";
import { Input } from "../../../../shared/form-inputs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { doctorRegisterApi } from "../../api/register-api.ts";
import { defaultValues, DoctorRegisterFormData, schema } from "./config.ts";
import { AuthLayout } from "../../../../shared/layouts";

const DoctorRegisterForm = () => {

    const [nextPageLoading, setNextPageLoading] = useState(false);

    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors }, control } = useForm<DoctorRegisterFormData>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const {
        mutate,
        error,
        isError,
        isSuccess,
        isPending,
    } = useMutation<unknown, AxiosError, DoctorRegisterFormData>({
        mutationKey: ['doctor-register'],
        mutationFn: (data) => doctorRegisterApi(data),
        onSuccess: () => {
            setTimeout(() => {
                setNextPageLoading(false);
                navigate('/login');
            }, 4000);
        },
    });

    const handleFormSubmit = (data: DoctorRegisterFormData) => {
        mutate(data);
    };

    return (
        <AuthLayout isLoading={isPending || nextPageLoading}>
            <>
                <Collapse in={isSuccess || isError}>
                    <Alert
                        severity={isSuccess ? 'success' : 'error'}
                        sx={{ mb: 2 }}
                    >
                        {error && error?.message}
                        {isSuccess && 'Konto zostało utworzone. Sprawdź swoją skrzynkę mailową, aby aktywować konto.'}
                    </Alert>
                </Collapse>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Rejestracja lekarza
                </Typography>
                <form onSubmit={handleSubmit(handleFormSubmit)}
                    style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 10 }}>

                    <Input name={"firstName"} label={"Jan"} type={"text"} defaultValue={defaultValues.firstName}
                        control={control} title={"Imię"} />
                    <Input name={"lastName"} label={"Kowalski"} type={"text"} defaultValue={defaultValues.lastName}
                        control={control} title={"Nazwisko"} />
                    <Input name={"email"} label={"email@gmail.com"} type={"email"} defaultValue={defaultValues.email}
                        control={control} title={"Email"} />

                    <FormControl>
                        <FormLabel htmlFor="password">Hasło</FormLabel>
                        <TextField
                            label="*****"
                            type="password"
                            fullWidth
                            margin="normal"
                            defaultValue={defaultValues.password}
                            {...register('password')}
                            error={!!errors.password}
                        />
                    </FormControl>
                    <Input name={"education"} label={"Wyższa Szkoła Gospodarki"} type={"text"}
                        defaultValue={defaultValues.education}
                        control={control} title={"Wykształcenie"} />
                    <Input name={"proffesion"} label={"Okulista"} type={"text"}
                        defaultValue={defaultValues.proffesion}
                        control={control} title={"Specjalizacja"} />
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Załóż konto
                    </Button>
                </form>

                <Typography sx={{ textAlign: 'center' }}>
                    Posiadasz już konto?{' '}
                    <Link
                        href="/login"
                        variant="body2"
                        sx={{ alignSelf: 'center' }}
                    >
                        Zaloguj się!
                    </Link>
                </Typography>
            </>
        </AuthLayout>
    );
};

export default DoctorRegisterForm;