import { useQuery } from "@tanstack/react-query";
import { ActivateDoctorApi } from "../../../features/activate-account/api";
import { AxiosError } from "axios";
import { BackendError } from "../../../shared/types/api-types";

const useDoctorUser = (id: number) => {
  const query = useQuery<any, AxiosError<BackendError>, any>({
    queryKey: ["doctor-user"],
    queryFn: async ({ signal }) => {
      const data = await ActivateDoctorApi.getDoctorUser({ id, signal });

      return data;
    },
  });

  return query;
};

export default useDoctorUser;
