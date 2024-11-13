import { useQuery } from "@tanstack/react-query";
import { Doctor } from "../../../entities/doctor/types";
import { DoctorQueryKeys } from "../utils/enums";
import { DoctorsApi } from "../api";
import { AxiosError } from "axios";

export const useDoctor = ({ id }: { id: number }) => {
  const query = useQuery<unknown, AxiosError, Doctor>({
    queryKey: [DoctorQueryKeys.SINGLE],
    queryFn: async () => {
      const { data } = await DoctorsApi.getOne({ id });

      return data;
    },
  });

  return query;
};
