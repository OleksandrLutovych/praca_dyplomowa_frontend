import { CssBaseline } from '@mui/material';
import { RegisterForm } from '../../../features/register/forms/RegisterForm';

const RegisterPage = () => {
  return (
    <>
      <CssBaseline enableColorScheme />
      <RegisterForm />
    </>
  );
};

export default RegisterPage;