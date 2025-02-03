import { Alert } from '@mui/material';
import { AxiosError } from 'axios';
import { FC } from 'react';
import { BackendError } from '../../types/api-types';

type Props = {
  error: AxiosError<BackendError> | null;
  isError: boolean;
}

const ApiError: FC<Props> = ({ error, isError }) => {
  if (!isError) {
    return null;
  }

  return (
    <Alert severity="error" sx={{ my: 1 }}>
      {error?.response?.data.message}
    </Alert>
  );
};

export default ApiError;