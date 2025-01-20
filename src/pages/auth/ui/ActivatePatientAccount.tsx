import { Alert, Button, Typography } from '@mui/material';
import { PatientActivateForm } from '../../../features/register/forms';
import { PatientActivateFormData } from '../../../features/register/forms/PatientActivateForm/config';
import { DoctorRegisterFormData } from '../../../features/register/forms/DoctorRegisterForm/config';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { activatePatientApi } from '../../../features/activate-account/api';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthLayout } from '../../../shared/layouts';

const ActivatePatientAccount = () => {

  const params = useParams()
  const userId = Number(params.id)
  const navigate = useNavigate()

  const {
    mutate,
    error,
    isError,
    isSuccess,
    isPending,
  } = useMutation<unknown, AxiosError, PatientActivateFormData>({
    mutationKey: ['patient-activate'],
    mutationFn: (data) => activatePatientApi({ id: userId, data }),
    onSuccess: () => {
      setTimeout(() => {
        navigate('/login');
      }, 4000);
    },
  });

  const handleFormSubmit = (data: PatientActivateFormData) => {
    mutate(data)
  }
  return (
    <AuthLayout isLoading={isPending}>
      {!isSuccess &&
        <>
          <Typography variant='h5' sx={{ textAlign: "center" }}>Wypeij formularz dla zakończenia rejestracji</Typography>
          <PatientActivateForm handleFormSubmit={handleFormSubmit} />
        </>
      }

      {isSuccess &&
        (<Alert variant="filled" severity="success">
          Konto zostało aktywowane! Możesz się zalogować.
        </Alert>)
      }

    </AuthLayout>
  );
};

export default ActivatePatientAccount;