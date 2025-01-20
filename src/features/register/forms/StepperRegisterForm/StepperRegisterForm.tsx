import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { defaultValues, FinalRegisterFormData, schema } from './config.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction } from "react";
import { Roles } from "../../../../entities/user/enums.ts";

type Props = {
    step: number
    setActiveStep: Dispatch<SetStateAction<number>>
}

const StepperRegisterForm = ({ step, setActiveStep }: Props) => {

    const { handleSubmit, control, getValues } = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleFormSubmit = (data: FinalRegisterFormData) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            {step === 0 &&
                <FormControl sx={{ my: 5 }}>
                    <FormLabel>Chcę zarejestrować się jako:</FormLabel>
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup row {...field}>
                                <FormControlLabel value={Roles.PATIENT} control={<Radio />} label="Pacjent" />
                                <FormControlLabel value={Roles.DOCTOR} control={<Radio />} label="Lekarz" />
                            </RadioGroup>
                        )}
                    />
                </FormControl>
            }
            {
                step === 1 &&
                <FormControl sx={{ my: 5 }}>
                    <FormLabel>Dane:</FormLabel>

                </FormControl>
            }
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={step === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Powrót
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />

                {step === 0 && <Button
                    type={'button'}
                    onClick={handleNext}
                >
                    'Dalej'
                </Button>}
                {step === 1 && <Button
                    type={'submit'}
                >
                    Zarejestruj
                </Button>}
            </Box>

        </form>
    );
};

export default StepperRegisterForm;