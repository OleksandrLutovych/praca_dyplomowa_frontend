import { Alert, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { activatePatientApi } from '../../../features/activate-account/api';
import { PatientActivateForm } from '../../../features/register/forms';
import { PatientActivateFormData } from '../../../features/register/forms/PatientActivateForm/config';
import { AuthLayout } from '../../../shared/layouts';
import { ApiError } from '../../../shared/ui';
import { BackendError } from '../../../shared/types/api-types';

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
  } = useMutation<unknown, AxiosError<BackendError>, PatientActivateFormData>({
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
      <ApiError error={error} isError={isError} />
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