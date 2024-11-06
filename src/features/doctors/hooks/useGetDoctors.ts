import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Doctor } from "../../../entities/doctor/types";
import { DoctorsApi } from "../api";
import { DoctorQueryKeys } from "../utils/enums";
import { UniversalListResponse } from "../../../shared/types/api-types";

export const useGetDoctors = () => {
  const query = useQuery<unknown, AxiosError, UniversalListResponse<Doctor>>({
    queryKey: [DoctorQueryKeys.MANY],
    queryFn: async () => {
      const { data } = await DoctorsApi.getMany();

      return data;
    },
  });

  return query;
};
