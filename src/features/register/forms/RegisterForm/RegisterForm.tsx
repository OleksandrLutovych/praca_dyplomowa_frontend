import {Alert, Button, Collapse, Link, Typography,} from '@mui/material';
import {useForm} from 'react-hook-form';
import {defaultValues, InitialRegisterFormData, schema} from './config.ts';
import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation} from '@tanstack/react-query';
import {registerApi} from '../../api/register-api.ts';
import {AxiosError} from 'axios';
import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import {Input} from "../../../../shared/form-inputs";
import {AuthLayout} from "../../../../shared/layouts";

const RegisterForm = () => {

    const [nextPageLoading, setNextPageLoading] = useState(false);

    const navigate = useNavigate();
    const {handleSubmit, control} = useForm<InitialRegisterFormData>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const {
        mutate,
        error,
        isError,
        isSuccess,
        isPending,
    } = useMutation<unknown, AxiosError, InitialRegisterFormData>({
        mutationKey: ['register'],
        mutationFn: (data) => registerApi(data),
        onSuccess: () => {
            setTimeout(() => {
                setNextPageLoading(false);
                navigate('/login');
            }, 4000);
        },
    });

    const handleFormSubmit = (data: InitialRegisterFormData) => {
        mutate(data);
    };


    return (
        <AuthLayout isLoading={isPending || nextPageLoading}>
            <>
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
                    sx={{fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                >
                    Rejestracja
                </Typography>
                <form onSubmit={handleSubmit(handleFormSubmit)}
                      style={{display: 'flex', flexDirection: 'column', width: '100%', gap: 10}}>
                    <Input name={"firstName"} label={"Jan"} type={"text"} defaultValue={defaultValues.firstName}
                           control={control} title={"Imię"}/>
                    <Input name={"lastName"} label={"Kowalski"} type={"text"} defaultValue={defaultValues.lastName}
                           control={control} title={"Nazwisko"}/>
                    <Input name={"email"} label={"email@gmail.com"} type={"email"} defaultValue={defaultValues.email}
                           control={control} title={"Email"}/>
                    <Input name={"password"} label={"*****"} title={"Hasło"} type={"password"}
                           defaultValue={defaultValues.password} control={control}/>
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Załóż konto
                    </Button>
                </form>

                <Typography sx={{textAlign: 'center'}}>
                    Posiadasz już konto?{' '}
                    <Link
                        href="/login"
                        variant="body2"
                        sx={{alignSelf: 'center'}}
                    >
                        Zaloguj się!
                    </Link>
                </Typography>
                <Typography sx={{textAlign: 'center'}}>
                    Jesteś lekarzem?{' '}
                    <Link
                        href="/doctor-register"
                        variant="body2"
                        sx={{alignSelf: 'center'}}
                    >
                        Załóż profil lekarza!
                    </Link>
                </Typography>
            </>
        </AuthLayout>
    );
};

export default RegisterForm;