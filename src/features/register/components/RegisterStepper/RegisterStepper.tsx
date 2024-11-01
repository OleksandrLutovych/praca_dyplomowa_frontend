import React, {useState} from 'react';
import {Box, Step, StepLabel, Stepper, Typography} from '@mui/material';
import {Card} from '../../../../shared/ui/components';
import {StepperRegisterForm} from '../../forms';

const steps = ['Wybierz rolę', 'Wprowadż swoje dane'];

const RegisterStepper = () => {
    const [activeStep, setActiveStep] = useState(0);


    return (
        <Card>
            <Typography
                component="h1"
                variant="h2"
                sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', mb: 5}}
            >
                Kontynuj rejestracje
            </Typography>
            <Box sx={{width: '100%'}}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <StepperRegisterForm step={activeStep} setActiveStep={setActiveStep}/>
            </Box>
        </Card>
    );
};

export default RegisterStepper;