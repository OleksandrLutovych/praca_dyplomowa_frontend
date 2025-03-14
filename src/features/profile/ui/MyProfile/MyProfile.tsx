import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DoctorProfileData } from "../../../../entities/doctor/types";
import { DoctorProfileApi, PatientProfileApi } from "../../api";
import { DoctorProfile, PatientProfile } from "../../components";
import { Breadcrumbs, Loader } from "../../../../shared/ui";


const MyProfile = () => {

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
      <Breadcrumbs items={[]} />

      <Typography variant="h4">Mój profil</Typography>
      <Loader isLoading={isLoading && isPatientDataLoading} />
      {patientData && !isPatientDataLoading && <PatientProfile data={patientData} />}
      {data && !isLoading && <DoctorProfile data={data} />}

    </>
  );
};

export default MyProfile;