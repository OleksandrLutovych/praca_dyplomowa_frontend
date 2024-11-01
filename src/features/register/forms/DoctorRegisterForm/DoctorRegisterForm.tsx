import {Card} from "../../../../shared/ui/components";
import {
    Alert,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Collapse,
    FormControl,
    FormLabel,
    Link,
    TextField,
    Typography
} from "@mui/material";
import {Input} from "../../../../shared/form-inputs";
import {SignInContainer} from "../../../../shared/ui/layout";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {doctorRegisterApi} from "../../api/register-api.ts";
import {defaultValues, DoctorRegisterFormData, schema} from "./config.ts";

const DoctorRegisterForm = () => {

    const [nextPageLoading, setNextPageLoading] = useState(false);

    const navigate = useNavigate();
    const {handleSubmit, register, formState: {errors}, control} = useForm<DoctorRegisterFormData>({
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
        <SignInContainer direction="column" justifyContent="space-between">
            <Card variant="outlined">
                <Collapse in={isSuccess || isError}>
                    <Alert
                        severity={isSuccess ? 'success' : 'error'}
                        sx={{mb: 2}}
                    >
                        {error && error?.message}
                        {isSuccess && 'Konto zostało utworzone, możesz się zalogować'}
                    </Alert>
                </Collapse>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                >
                    Sign up
                </Typography>
                <form onSubmit={handleSubmit(handleFormSubmit)}
                      style={{display: 'flex', flexDirection: 'column', width: '100%', gap: 10}}>

                    <Input name={"firstName"} label={"Jan"} type={"text"} defaultValue={defaultValues.firstName}
                           control={control} title={"Imię"}/>
                    <Input name={"lastName"} label={"Kowalski"} type={"text"} defaultValue={defaultValues.lastName}
                           control={control} title={"Nazwisko"}/>
                    <Input name={"email"} label={"email@gmail.com"} type={"email"} defaultValue={defaultValues.email}
                           control={control} title={"Email"}/>

                    <FormControl>
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Link
                                component="button"
                                type="button"
                                variant="body2"
                                sx={{alignSelf: 'baseline'}}
                            >
                                Forgot your password?
                            </Link>
                        </Box>
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
                           control={control} title={"Wykształcenie"}/>
                    <Input name={"proffesion"} label={"Okulista"} type={"text"}
                           defaultValue={defaultValues.proffesion}
                           control={control} title={"Specjalizacja"}/>
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Sign up
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


            </Card>
            <Backdrop
                sx={(theme) => ({color: '#fff', zIndex: theme.zIndex.drawer + 1})}
                open={isPending || nextPageLoading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

        </SignInContainer>
    );
};

export default DoctorRegisterForm;