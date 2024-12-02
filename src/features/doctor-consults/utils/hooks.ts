import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BackendError } from "../../../shared/types/api-types";
import { DoctorConsultsApi } from "../api";
import { DoctorConsultQueryKey } from "./enums";
import { Consult } from "./types";

export const useConsult = ({ id }: { id?: number }) => {
  const query = useQuery<unknown, AxiosError<BackendError>, Consult>({
    queryKey: [DoctorConsultQueryKey.SINGLE, id],
    queryFn: async ({ signal }) => {
      if (!id) {
        throw new Error("Id is required");
      }

      const { data } = await DoctorConsultsApi.get({ signal, id });
      return data;
    },
  });

  return query;
};
