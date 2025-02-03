import { Alert, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ActivateDoctorApi } from "../../../features/activate-account/api";
import { DoctorActivateForm, DoctorActivateFormData } from "../../../features/register/forms";
import { AuthLayout } from "../../../shared/layouts";
import { BackendError } from "../../../shared/types/api-types";
import { ApiError } from "../../../shared/ui";
import { useDoctorUser } from "../hooks";

const ActivateDoctorAccount = () => {
  const params = useParams()
  const userId = Number(params.id)
  const navigate = useNavigate()
  const { isLoading, error: doctorUserError, isError: isDoctorUserError } = useDoctorUser(userId)

  const {
    mutate,
    error,
    isError,
    isSuccess,
    isPending,
  } = useMutation<unknown, AxiosError<BackendError>, DoctorActivateFormData>({
    mutationKey: ['doctor-activate'],
    mutationFn: (data) => ActivateDoctorApi.activate({ id: userId, data }),
    onSuccess: () => {
      setTimeout(() => {
        navigate('/login');
      }, 4000);
    },
  });

  const handleFormSubmit = (data: DoctorActivateFormData) => {
    mutate(data)
  }

  if (isDoctorUserError) {
    return <>Link wygasł :D</>
  }

  return (
    <AuthLayout isLoading={isPending || isLoading}>
      <ApiError error={error || doctorUserError} isError={isError || isDoctorUserError} />
      <>
        {(!isSuccess && !isLoading) && < DoctorActivateForm handleFormSubmit={handleFormSubmit} />}
        {isSuccess &&
          (<Alert variant="filled" severity="success" action={
            <Button onClick={() => navigate('/login')} color="inherit" variant={'outlined'}>Zaloguj
              się</Button>
          }>
            Konto zostało aktywowane! Możesz się zalogować.
          </Alert>)
        }
      </>
    </AuthLayout>
  );
};

export default ActivateDoctorAccount;