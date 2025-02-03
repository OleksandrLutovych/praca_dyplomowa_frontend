import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BackendError } from "../../../shared/types/api-types";
import { AxiosError } from "axios";
import { PatientPersonalVisitsApi } from "../api";
import { PatientPersonalVisitsQueryName } from "../utils/enums";

export const usePatientCancelVisit = (id: number) => {
  const queryClient = useQueryClient();
  const query = useMutation<unknown, AxiosError<BackendError>, never>({
    mutationKey: ["patient-visit-cancel", id],
    mutationFn: async () => {
      const response = await PatientPersonalVisitsApi.cancel({ id });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PatientPersonalVisitsQueryName.SIGNLE, id],
      });
      queryClient.invalidateQueries({
        queryKey: [PatientPersonalVisitsQueryName.LIST],
      });
    },
  });

  return query;
};
