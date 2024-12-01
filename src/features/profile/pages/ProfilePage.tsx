import { DoctorProfileApi, PatientProfileApi } from '../api';
import { useQuery } from '@tanstack/react-query';
import { DoctorProfileData } from '../utils/types';
import { Typography } from '@mui/material';
import { Loader } from '../../../shared/ui';
import { AxiosError } from 'axios';
import { DoctorProfile, PatientProfile } from '../components';

const ProfilePage = () => {
  const { data, isSuccess, isLoading } = useQuery<unknown, AxiosError, DoctorProfileData>({
    queryKey: ['doctor-profile'],
    queryFn: async () => {
      const response = await DoctorProfileApi.getData();
      return response.data;
    }
  })

  const { data: patientData, isSuccess: isPatientDataSuccess, isLoading: isPatientDataLoading } = useQuery<unknown, AxiosError, any>({
    queryKey: ['patient-profile'],
    queryFn: async () => {
      const response = await PatientProfileApi.getData();
      return response.data;
    }
  })


  return (
    <>
      <Typography variant="h4">Mój profil</Typography>
      <Loader isLoading={isLoading && isPatientDataLoading} />
      {patientData && !isPatientDataLoading && <PatientProfile />}
      {data && !isLoading && <DoctorProfile data={data} />}

    </>
  );
};

export default ProfilePage;